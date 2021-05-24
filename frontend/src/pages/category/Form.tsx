import {Box, Button, ButtonProps, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useForm} from "react-hook-form";
import categoryHttp from "../../util/http/category-http";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from '../../util/vendor/yup';
import {Category} from "../../models/Category";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {ParamId} from "../../util/http/param-id";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
})

const validationSchema = yup.object().shape({
    name: yup.string().label('Nome').required().max(255)
});

export const Form = () => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        errors,
        reset,
        watch
    } = useForm<Category>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            is_active: true
        }
    })

    const classes = useStyles()
    const snackbar = useSnackbar()
    const history = useHistory()
    const {id} = useParams<ParamId>()
    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const buttonProps: ButtonProps = {
        className: classes.submit,
        color: "secondary",
        variant: "contained",
        disabled: loading
    }

    useEffect(() => {
        register({name: "is_active"})
    }, [register])

    useEffect(() => {
        if (!id) {
            return
        }

        const getCategory = async () => {
            setLoading(true)
            try {
                const {data} = await categoryHttp.get(id)
                setCategory(data.data)
                reset(data.data)
            } catch (e) {
                snackbar.enqueueSnackbar('Não foi possível carregar as informações', {variant: "error"})
            } finally {
                setLoading(false)
            }
        }

        getCategory()
    }, [])

    async function onSubmit(formData, event) {
        setLoading(true)

        const http = !category
            ? categoryHttp.create(formData)
            : categoryHttp.update(category.id, formData)

        try {
            const {data} = await http
            snackbar.enqueueSnackbar('Categoria salva com sucesso', {variant: "success"})
            setTimeout(() => {
                event
                    ? (
                        id
                            ? history.replace(`/categories/${data.data.id}/edit`)
                            : history.push(`/categories/${data.data.id}/edit`)
                    )
                    : history.push('/categories')
            })
        } catch (e) {
            snackbar.enqueueSnackbar('Não foi possível salvar a categoria', {variant: "error"})
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                name="name"
                label="Nome"
                fullWidth
                variant="outlined"
                inputRef={register}
                error={errors.name !== undefined}
                helperText={errors.name && errors.name.message}
                InputLabelProps={{shrink: true}}
                disabled={loading}
            />

            <TextField
                name="description"
                label="Descrição"
                multiline
                rows="4"
                fullWidth
                variant="outlined"
                margin="normal"
                inputRef={register}
                InputLabelProps={{shrink: true}}
                disabled={loading}
            />

            <FormControlLabel
                disabled={loading}
                control={
                    <Checkbox
                        name="is_active"
                        color={"primary"}
                        onChange={() => setValue('is_active', !getValues()['is_active'])}
                        checked={watch('is_active')}
                    />
                }
                label={'Ativo?'}
                labelPlacement={'end'}
            />

            <Box dir="rtl">
                <Button {...buttonProps} onClick={() => onSubmit(getValues(), null)}>Salvar</Button>
                <Button {...buttonProps} type="submit">Salvar e continuar editando</Button>
            </Box>
        </form>
    )
}
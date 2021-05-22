import {Box, Button, ButtonProps, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useForm} from "react-hook-form";
import categoryHttp from "../../util/http/category-http";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from '../../util/vendor/yup';
import {Category} from "../../models/Category";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {ParamId} from "../../util/http/param-id";

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

    const classes = useStyles();

    const buttonProps: ButtonProps = {
        className: classes.submit,
        color: "secondary",
        variant: "contained"
    }

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

    const {id} = useParams<ParamId>();
    const [category, setCategory] = useState<{id: string} | null>(null)

    useEffect(() => {
        register({name: "is_active"})
    }, [register])

    useEffect(() => {
        if (!id) {
            return
        }

        categoryHttp
            .get(id)
            .then(({data}) => {
                setCategory(data.data)
                reset(data.data)
            })
    }, [])

    function onSubmit(formData, event) {
        const http = !category
            ? categoryHttp.create(formData)
            : categoryHttp.update(category.id, formData)

        http.then((response) => console.log(response))
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
            />

            <FormControlLabel
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
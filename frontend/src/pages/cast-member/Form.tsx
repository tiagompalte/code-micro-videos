import {
    Box,
    Button,
    ButtonProps,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {useForm} from "react-hook-form";
import castMemberHttp from "../../util/http/cast-member-http";
import {useEffect, useState} from "react";
import * as yup from '../../util/vendor/yup'
import {useSnackbar} from "notistack";
import {useHistory, useParams} from "react-router";
import {ParamId} from "../../util/http/param-id";
import {yupResolver} from "@hookform/resolvers/yup";
import {CastMember} from "../../models/CastMember";

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
})

const validationSchema = yup.object().shape({
    name: yup.string().label('Nome').required().max(255),
    type: yup.number().label('Tipo').required()
})

export const Form = () => {

    const {register, handleSubmit, getValues, setValue, reset, errors, watch} = useForm<CastMember>({
        resolver: yupResolver(validationSchema)
    })

    const classes = useStyles()
    const snackbar = useSnackbar()
    const history = useHistory()
    const {id} = useParams<ParamId>()
    const [castMember, setCastMember] = useState<CastMember | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const buttonProps: ButtonProps = {
        className: classes.submit,
        color: "secondary",
        variant: "contained",
        disabled: loading
    }

    useEffect(() => {
        if (!id) {
            return
        }

        const getCastMember = async () => {
            setLoading(false)
            try {
                const {data} = await castMemberHttp.get(id)
                setCastMember(data.data)
                reset(data.data)
            } catch (e) {
                snackbar.enqueueSnackbar('Não foi possível carregar as informações', {variant: "error"})
            } finally {
                setLoading(false)
            }
        }

        getCastMember()
    })

    useEffect(() => {
        register({name: "type"})
    }, [register])

    async function onSubmit(formData, event) {
        setLoading(true)

        const http = !castMember
            ? castMemberHttp.create(formData)
            : castMemberHttp.update(castMember.id, formData)

        try {
            const {data} = await http
            snackbar.enqueueSnackbar('Membro de elenco salvo com sucesso', {variant: "success"})
            setTimeout(() => {
                event
                    ? (
                        id
                            ? history.replace(`/cast-member/${data.data.id}/edit`)
                            : history.push(`/cast-member/${data.data.id}/edit`)
                    )
                    : history.push('/cast-member')
            })
        } catch (e) {
            snackbar.enqueueSnackbar('Não foi possível salvar o membro de elenco', {variant: "error"})
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
                disabled={loading}
                error={errors.name !== undefined}
                helperText={errors.name && errors.name.message}
                InputLabelProps={{shrink: true}}
            />

            <FormControl
                margin={"normal"}
                error={errors.type !== undefined}
                disabled={loading}
            >
                <FormLabel component="legend">Tipo</FormLabel>
                <RadioGroup
                    name="type"
                    onChange={(e) => {
                        setValue('type', parseInt(e.target.value))
                    }}
                    value={watch('type') + ""}
                >
                    <FormControlLabel value="1" control={<Radio color={"primary"} />} label="Diretor" />
                    <FormControlLabel value="2" control={<Radio color={"primary"} />} label="Ator" />
                </RadioGroup>
                {
                    errors.type && <FormHelperText id="type-helper-text">{errors.type.message}</FormHelperText>
                }
            </FormControl>

            <Box dir="rtl">
                <Button {...buttonProps} onClick={() => onSubmit(getValues(), null)}>Salvar</Button>
                <Button {...buttonProps} type="submit">Salvar e continuar editando</Button>
            </Box>
        </form>
    )
}
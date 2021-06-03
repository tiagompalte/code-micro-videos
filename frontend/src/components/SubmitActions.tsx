import * as React from 'react';
import {Box, Button, ButtonProps} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
})

interface SubmitActionsProps {
    disabledButtons?: boolean
    handleSave: () => void
}

const SubmitActions = (props: SubmitActionsProps) => {
    const classes = useStyles()
    const buttonProps: ButtonProps = {
        className: classes.submit,
        color: "secondary",
        variant: "contained",
        disabled: props.disabledButtons != null ? props.disabledButtons : false
    }

    return (
        <Box dir="rtl">
            <Button {...buttonProps} onClick={props.handleSave}>Salvar</Button>
            <Button {...buttonProps} type="submit">Salvar e continuar editando</Button>
        </Box>
    );
};

export default SubmitActions
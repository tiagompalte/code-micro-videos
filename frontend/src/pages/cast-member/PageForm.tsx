import {Page} from "../../components/Page";
import {Form} from "./Form";
import {useParams} from "react-router";
import {ParamId} from "../../util/http/param-id";

const PageForm = () => {
    const {id} = useParams<ParamId>();
    return (
        <Page title={!id ? 'Criar membro de elenco' : 'Editar membro de elenco'} >
            <Form />
        </Page>
    )
}

export default PageForm
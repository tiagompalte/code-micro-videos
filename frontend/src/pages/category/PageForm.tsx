import {Page} from "../../components/Page";
import {Form} from "./Form";
import {useParams} from 'react-router';
import {ParamId} from "../../util/http/param-id";

const PageForm = () => {
    const {id} = useParams<ParamId>();
    return (
        <Page title={!id ? 'Criar categoria' : 'Editar categoria'} >
            <Form />
        </Page>
    )
}

export default PageForm
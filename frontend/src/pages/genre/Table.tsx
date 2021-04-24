import * as React from 'react';
import {useEffect, useState} from 'react';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import format from 'date-fns/format';
import genreHttp from "../../util/http/genre-http";

const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: "name",
        label: "Nome"
    },
    {
        name: "categories",
        label: "Categorias",
        options: {
            customBodyRender(value) {
                return value.map((v: any) => v.name).join(', ')
            }
        }
    },
    {
        name: "created_at",
        label: "Criado em",
        options: {
            customBodyRender(value) {
                return <span>{format(new Date(value), 'dd/MM/yyyy')}</span>
            }
        }
    }
]

type Props = {

};
const Table = (props: Props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        genreHttp.list().then(({data}) => setData(data.data))
    }, [])
    return (
        <MUIDataTable
            title="Listagem de gêneros"
            columns={columnsDefinition}
            data={data}
        />
    );
};

export default Table
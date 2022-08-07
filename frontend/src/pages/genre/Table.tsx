import * as React from 'react';
import {useEffect, useState} from 'react';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import format from 'date-fns/format';
import genreHttp from "../../util/http/genre-http";
import {Genre} from "../../models/Genre";
import {ListResponse} from "../../util/ListResponse";
import DefaultTable from "../../components/Table";

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

const Table = () => {
    const [data, setData] = useState<Genre[]>([])

    useEffect(() => {
        let isSubscribed = true;

        (async () => {
            const {data} = await genreHttp.list<ListResponse<Genre>>()
            if (isSubscribed) {
                setData(data.data)
            }
        })()

        return () => {
            isSubscribed = false
        }
    }, [])
    return (
        <DefaultTable
            title="Listagem de gêneros"
            columns={columnsDefinition}
            data={data}
        />
    );
};

export default Table
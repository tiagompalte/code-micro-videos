import * as React from 'react';
import {useEffect, useState} from 'react';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import format from 'date-fns/format';
import categoryHttp from "../../util/http/category-http";
import {Category} from "../../models/Category";
import {BadgeNo, BadgeYes} from "../../components/Badge";
import {ListResponse} from "../../util/ListResponse";

const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: "name",
        label: "Nome"
    },
    {
        name: "is_active",
        label: "Ativo",
        options: {
            customBodyRender(value) {
                return value ? <BadgeYes /> : <BadgeNo />
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
    const [data, setData] = useState<Category[]>([])

    useEffect(() => {
        let isSubscribed = true;

        (async () => {
            const {data} = await categoryHttp.list<ListResponse<Category>>()
            if (isSubscribed) {
                setData(data.data)
            }
        })()

        return () => {
            isSubscribed = false
        }
    }, [])
    return (
        <MUIDataTable
            title="Listagem de categorias"
            columns={columnsDefinition}
            data={data}
        />
    );
};

export default Table
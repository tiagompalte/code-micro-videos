import * as React from 'react';
import {useEffect, useState} from 'react';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import format from 'date-fns/format';
import castMemberHttp from "../../util/http/cast-member-http";

const CastMemberTypeMap = {
    1: 'Diretor',
    2: 'Ator'
}

const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: "name",
        label: "Nome"
    },
    {
        name: "type",
        label: "tipo",
        options: {
            customBodyRender(value) {
                return CastMemberTypeMap[value]
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
        castMemberHttp.list().then(({data})=> setData(data.data))
    }, [])
    return (
        <MUIDataTable
            title="Listagem de membros de elenco"
            columns={columnsDefinition}
            data={data}
        />
    );
};

export default Table
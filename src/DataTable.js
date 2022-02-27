import { Table } from "reactstrap"
import {DataTableRow} from './DataTableRow'
export function DataTable(props){
    const {data,id} = props
    
    return(
        <Table bordered striped>
            <thead>
                <tr>
                    <th>
                        Field Name
                    </th>
                    <th>
                        Type
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map(element => {
                    return(
                            <DataTableRow data={element} 
                           tableId={id} />
                    )
                })}
            </tbody>
        </Table>
    )
}
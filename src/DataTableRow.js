import { useDrag } from "react-dnd";

export function DataTableRow(props){
    const {data, tableId} = props
    const [{ isDragging }, drag] = useDrag(() => ({
        type: `${tableId}`,
        item: { data: data, tableId: tableId },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
    return(
        <tr style ={{fontWeight: isDragging? "bold":""}}>
            <td ref={drag}>
                {data.name}
            </td>
            <td>
            {data.type}
            </td>
        </tr>
    )
}
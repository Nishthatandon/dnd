import React from "react"
import { Button, Col, Container, Row, Table } from "reactstrap";
import {DataTable} from './DataTable'
import {MultiplicityDropDown} from './MultiplicityDropDown'
import { useDrop } from "react-dnd";
export function TableDragDrop(){
    const data1 =[
        {
            id: 1,
            name: "test field 1",
            type: "string"
        },
        {
            id: 2,
            name: "test field 2",
            type: "int"
        },
        {
            id: 3,
            name: "test field 3",
            type: "boolean"
        },
        
    ]

    const data2 =[
        {
            id: 1,
            name: "test field 4",
            type: "int"
        },
        {
            id: 2,
            name: "test field 5",
            type: "boolean"
        },
        {
            id: 3,
            name: "test field 6",
            type: "boolean"
        },
        ,
        {
            name: "test field 7",
            type: "string"
        },
        
    ]
    
    const [table1Data] = React.useState(data1);
    const [table2Data] = React.useState(data2)
    const [counter,setCounter] = React.useState(0)
    const [ refresh, setRefresh] = React.useState(true)
    const [associationMap, setAssociationMap] = React.useState([])
    const [newList, setNewList] = React.useState([])
   /*  React.useEffect(() => {
        setAssociationMap([...newList])
        console.log('assocition map ', associationMap)
    }, [newList]); */
    const [{ isTable1Over }, dropTable1] = useDrop(() => ({
        accept: "table1",
        drop: (data) => addToAssociationTable(data.data, "table1"),
        collect: (monitor) => ({
          isTable1Over: !!monitor.isOver(),
        }),
      }));
      const [{ isTable2Over }, dropTable2] = useDrop(() => ({
        accept: "table2",
        drop: (data) => addToAssociationTable(data.data, "table2"),
        collect: (monitor) => ({
          isTable2Over: !!monitor.isOver(),
        }),
      }));
      
     function addToAssociationTable(data,tableId ){
         let links = null
         let counter=0
         let newLink = associationMap
         if(newLink.length > 0){
            for(let association of newLink) {
                if(association.table1 && !association.table2){
                    if(tableId === 'table2'){
                        association.table2 = {
                                id: data.id,
                                fieldName: data.name,
                                multiplicity: 'select'
                        }
                        break
                    }
                }else if(!association.table1 && association.table2){
                    if(tableId === 'table1'){
                        association.table1 = {
                                id: data.id,
                                fieldName: data.name,
                                multiplicity: 'select'
                        }
                        break
                    }
                }
                counter++
             }
         }if(newLink.length === 0 || counter === newLink.length){
            links = {
                [tableId]:{
                   id: data.id,
                   fieldName: data.name,
                   multiplicity: 'select'
           }
            }
         }
       
          if(links != null){
            setAssociationMap((newLink) => [...newLink, links])
          }else
            setNewList((newLink) => [...newLink])
          
     }
    function setSelectedMultiplicity(data, tableName, multiplicity){

    }
    function increase(){
        if(counter == 1){
            setCounter(7)
        }else{
            setCounter(counter+1)
        }
    }
   
    return(
        <Container>
            {counter}
            <Button onClick={()=>increase()} >Increase</Button>
            <Row>
                <Col>
                    <h4 className="text-center">Table One</h4>
                    <DataTable data={table1Data} id="table1"/>
                </Col>    
                <Col>
                    <h4 className="text-center">Table Two</h4>
                    <DataTable data={table2Data} id="table2"/>
                </Col>
            </Row>
            
            <Row>
            <h4 className="text-center">Associations</h4>
            <Table>
                <thead bordered striped>
                    <tr>
                        <th ref={dropTable1}>
                        Table one field
                        </th>
                        <th >
                        Multiplicity
                        </th>
                        <th ref={dropTable2}>
                        Table two field
                        </th>
                        <th >
                        Multiplicity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { associationMap && associationMap.length>0 && associationMap.map((data, index) => {
                       return (
                           <tr>
                               {data.table1 ? 
                               <>
                               <td>
                                {data.table1.fieldName}
                               </td>
                               <td>
                               <MultiplicityDropDown 
                               selected = {data.table1.multiplicity} 
                               setSelected = {(multiplicity) => setSelectedMultiplicity(index,'table1',multiplicity)}/>
                                </td>
                               </>: 
                               <>
                               <td></td>
                               <td></td>
                               </>
                               }
                               {data.table2 ? 
                               <>
                               <td>
                               {data.table2.fieldName}
                               </td>
                               <td>
                               <MultiplicityDropDown 
                               selected = {data.table2.multiplicity} 
                               setSelected = {(multiplicity) => setSelectedMultiplicity(data.table2.id,'table1',multiplicity)}/>
                                </td>
                               </>: 
                               <>
                               <td></td>
                               <td></td>
                               </>
                               }
                           </tr>
                       ) 
                    })}
                </tbody>
            </Table>
            </Row>
        </Container>
        
        
    )
}
/* function renderRowCol(){
    <Col ref={dropTable1} style={{border:'solid', display:"block", height:"50px"}}>
                {associationMap && associationMap.map((data,index) => {
                     return ( 
                    <Row>
                        <Col>
                            {data.table1 && data.table1.fieldName}
                        </Col>
                    </Row>
                     )
                })}
            </Col>
            <Col ref={dropTable2} style={{border:'solid'}}>
            {associationMap && associationMap.map((data,index) => {
                   return ( 
                   <Row>
                        <Col>
                            {data.table2 && data.table2.fieldName}
                        </Col>
                    </Row>
                    )
                })}
            </Col>
} */
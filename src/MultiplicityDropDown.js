import { Dropdown, DropdownToggle } from "reactstrap"

export function MultiplicityDropDown(props){
    const {selected, setSelected} = props
    return(
        <select onChange={e => {setSelected(e.target.value)}} value={selected}>
            <option key='select' value=''>--</option>
            <option key='atmostOne' value='atmostOne'>0..1</option>
            <option key='atleastOne' value='atleastOne'>1</option>
            <option key='many' value='many'>*</option>
        </select>
    )
}
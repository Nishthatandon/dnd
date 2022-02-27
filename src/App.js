import './App.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {TableDragDrop} from './TableDragDrop'
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <TableDragDrop />
    </DndProvider>
  );
}

export default App;

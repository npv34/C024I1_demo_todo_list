import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Master from "./layouts/Master";
import TodoList from "./components/Todos/TodoList/TodoList";
import TodoAdd from "./components/Todos/TodoAdd/TodoAdd";

function App() {
  return (
       <Routes>
         <Route path="/" element={<Master/>} >
           <Route index path={"/todos"} element={<TodoList/>} />
           <Route index path={"/todos/create"} element={<TodoAdd/>} />
         </Route>
       </Routes>
  );
}

export default App;

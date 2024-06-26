import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import TaskService from "../../../services/task.service";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';

function TodoList() {
    const [tasks, setTasks] = useState([])
    const [rerender, setRerender] = useState(false)
    const [totalTaskCompleted, setTotalTaskCompleted] = useState(0)

    useEffect(() => {
        TaskService.getAllTasks().then(res => {
            const tasks = res.data
            setTasks(tasks)
        })
        TaskService.totalTaskCompleted().then((res) => {
            setTotalTaskCompleted(res)
        })
    }, [rerender])

    const handleChangeStatus = (id, evt) => {
        const statusTask = evt.target.value
        TaskService.updateStatusTask(id, statusTask).then(res => {
            setRerender(!rerender)
        })
    }

    return (
        <>
            <Link to={'/todos/create'}>
                <Button variant="success">Create</Button>
            </Link>

            <Button>Task completed ({ totalTaskCompleted })</Button>

            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Desc</th>
                    <th>Create At</th>
                    <th>Completion time</th>
                    <th>Status</th>
                    <th>Author</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                { tasks.map(((task, index) => (
                    <tr key={task.id}>
                        <td>{ index + 1}</td>
                        <td>{ task.title }</td>
                        <td>{ task.desc}</td>
                        <td>{ task.createAt }</td>
                        <td>{task.completionTime}</td>
                        <td>

                                <Form.Select style={{backgroundColor: task.completed == 1? 'green' : 'gray', color: 'white'}} aria-label="Default select example" onChange={(e) => handleChangeStatus(task.id, e)}>
                                    <option value="1" selected={task.completed == 1}>Completed</option>
                                    <option value="2" selected={task.completed == 2}>Pending</option>
                                </Form.Select>

                        </td>
                        <td>{task.author.name }</td>
                        <td>
                            <Button variant="primary">Edit</Button>
                            <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                )))}
                </tbody>
            </Table>
        </>

    );
}

export default TodoList;
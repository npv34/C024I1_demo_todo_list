import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import TaskService from "../../../services/task.service";
import {useFormik} from "formik";
import moment from "moment";
import {useNavigate} from "react-router-dom";

function TodoAdd() {
    const [authors, setAuthors] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        TaskService.getAllAuthor().then(res => {
            const authors = res.data
            console.log(authors)
            setAuthors(authors)
        })
    }, [])

    const formAdd = useFormik({
        initialValues: {
            title: '',
            desc: '',
            completionTime: '',
            createAt: "",
            completed: "2",
            author: '',
        },
        onSubmit: (values) => {
            const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            values.createAt = date;
            console.log(values)
            TaskService.createTask(values).then(res => {
                console.log(res)
                navigate("/todos")
            })
        }
    })

    return (
        <Form onSubmit={formAdd.handleSubmit}>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" onChange={formAdd.handleChange} name={"title"} placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={formAdd.handleChange} type="text" name={"desc"} placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Completion time</Form.Label>
                <Form.Control type="datetime-local" onChange={formAdd.handleChange} name={"completionTime"} placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Author</Form.Label>
                <Form.Select aria-label="Default select example" name={"authorId"} onChange={formAdd.handleChange}>
                    <option>Open this select author</option>
                    { authors.map(author => (
                        <option value={author.id}>{author.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default TodoAdd;
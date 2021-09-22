import { Paper, TextField, Checkbox, Button, Container } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { updateTask, deleteTask } from './api/api'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getTask } from './api/api'
import { format } from 'date-fns';
import styled,{css} from 'styled-components/macro'


const TaskContainer= styled.div`

align-content: right;
padding: 0 1rem;
color:blue
`

const OutBorder=styled.div`
    box-shadow: 5px 10px #888888;
`



export const Todo = () => {

    const [items, setItems] = useState([])
    const [task, setTask] = useState("");
    const [test, setTest] = useState("")
    const [oldList, setOldList] = useState(true)
    const [newList, setNewList] = useState([])
    const [sortType, setSortType] = useState('asc')
    const [cdate, setCdate] = useState(format(new Date(), 'yyyy/MM/dd'))
    const history = useHistory()


    const handleSub = (e) => {
        e.preventDefault();
        setTest('dd')
        const itemObj = {
            task: task,
            completed: false,
            date: cdate
        }
        axios.post("http://localhost:4011/", itemObj).then(
            (res) => {
                console.log(res.data);
            }
        )
            .catch((err) => console.log(err))
        setTest(Math.random())

    }

    const handleUpdate = async (currentTask, e) => {
        //e.preventDefault();
        const originalTasks = items;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            //this.setState({ tasks });
            setItems(tasks)
            await updateTask(currentTask, {
                completed: tasks[index].completed,
            });
        } catch (error) {
            //this.setState({ tasks: originalTasks });
            setItems(originalTasks)
            console.log(error);
        }
        setTest(Math.random());
    };

    const handleDelete = async (currentTask, e) => {
        //e.preventDefault();
        const originalTasks = items;
        try {
            const tasks = originalTasks.filter(
                (t) => t._id !== currentTask
            );
            //this.setState({ tasks });
            setItems(tasks)
            await deleteTask(currentTask);

        } catch (error) {
            //this.setState({ tasks: originalTasks });
            setItems(originalTasks)
            console.log(error);
        }
        setTest(Math.random())
    };

    const fetchItems = async () => {
        const i = await getTask();
        setItems(i)
        //console.log(i);    
    }

   //newList=items;

    const sortByDateAsc = () => {
        let sorted = items
        if (oldList) {
            sorted = items.sort((a, b) => new Date(...a.date.split('/')
            .reverse()) - new Date(...b.date.split('/').reverse()));
        }else{
            sorted = items.sort((a, b) => new Date(...a.date.split('/')
            .reverse()) - new Date(...b.date.split('/')));
        }
        setOldList(!oldList)
        setItems(sorted)
        //setSortType(sorted)
        //setTest(Math.random())
        console.log(sorted);
    }



    useEffect(() => {

        fetchItems();
      // sortByDateAsc();
        
    }, [test, oldList]);
    
    useEffect(() => {

        fetchItems();
      // sortByDateAsc();
        
    }, [oldList]);

    return (
        <div>
            <OutBorder>
            <Paper elevation={3} className="container">
                <div className="heading">TODO</div>
                <form method="POST" onSubmit={handleSub} >
                    <TextField variant="outlined"

                        onChange={(e) => setTask(e.target.value)}
                        size="small"
                        style={{ width: "60%" }}
                        value={task}
                        required={true}
                        placeholder="Add todo"
                    />


                    <Button style={{ height: "40px" }}
                        color="primary"
                        variant="outlined"
                        type="submit"
                    >
                        Add
                    </Button>
                    <Button style={{ height: "40px" }}
                        color="default"
                        variant="outlined"
                        onClick={() => { sortByDateAsc() }}
                    >
                        sort
                    </Button>
                </form>
                {
                    items.length > 0 ? (

                        items.map(todo => {

                            return (
                                <Paper key={todo._id} className="flex task_container">
                                    <Checkbox
                                        checked={todo.completed}
                                        color="primary"
                                        onClick={() => { handleUpdate(todo._id) }}
                                    />

                                    <TaskContainer style={{color:todo.completed ? 'green':'blue' }}>
                                    <div className={todo.completed ? "task line_through" : " task"}>
                                        {todo.task}

                                        <p>{todo.date}</p>
                                    </div>
                                    </TaskContainer>
                                   

                                    <Button color="secondary" onClick={() => handleDelete(todo._id)}>Delete</Button>

                                </Paper>


                            )
                        })
                    ) : (
                        <p className="center">You have no Todo's</p>
                    )

                }
            </Paper>
            </OutBorder>
        </div>
    )
}

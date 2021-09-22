
import axios from 'axios'
export const getTask =()=>fetch("http://localhost:4011/").then(res => res.json())

export const addTask =(todo)=>fetch(
    "http://localhost:4011/",
    {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(todo)
    }
    
    ).then(res=>res.json())


    export function updateTask(id,task){
        return axios.put("http://localhost:4011/"+id,task)
    }
    export function deleteTask(id){
        return axios.delete("http://localhost:4011/"+id)
    }




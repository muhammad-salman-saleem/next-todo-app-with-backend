import React, { useState } from "react";
import TodoInput from "./TodoInput";
import { Todos } from "../model";
import TodoList from "./TodoList";
import axios from "axios";


const Todo: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);

  const handleAdd = async (e: React.FormEvent<EventTarget>): Promise<void> => {
    e.preventDefault();
   
    
    if (todo) {
      const newTodo = { todo: todo, isDone: false };
      try {
        const response:any = await axios.post("http://localhost:3000/api/todo", newTodo);
        // console.log(response.data);
        setTodos([...todos, response.data]);
        setTodo("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center p-24">
      <h1 className="text-4xl">Todo App</h1>
      <TodoInput todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
      
    </div>
  );
};

export default Todo;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Todos } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todos[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
  const [todoList, setTodoList] = useState<Todos[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response:any = await axios.get<Todos[]>(
          "http://localhost:3000/api/todo"
        );
        setTodoList(response.data);
      } catch (error:any) {
        console.log(error);
      }
    };

    fetchData();
  }, [todos]);

  return (
    <div className="flex flex-wrap pt-4">
      <div className="justify-evenly w-[90%]">
        {todoList.map((todo, index:number) => (
          <SingleTodo
            key={index }
            index={index + 1}
            todo={todo}
            todos={todoList}
            setTodos={setTodoList}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

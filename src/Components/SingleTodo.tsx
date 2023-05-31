import React, { useEffect, useRef, useState } from "react";
import { Todos } from "../model";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  key: number;
  index: number;
  todo: Todos;
  todos: Todos[];

  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
};

const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  index,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [isopen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const haldleDelete = async (_id: string) => {
    try {
      // debugger
      await axios.delete(`http://localhost:3000/api/todo/?id=${_id}`);
      setTodos(todos.filter((todo) => todo._id !== _id));
      toast.warn("Task Deleted", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  const haldleUpdate = async (e: React.FormEvent, _id: string) => {
    e.preventDefault();
    // debugger
    try {
      const response: any = await axios.patch(
        `http://localhost:3000/api/todo/?id=${_id}`,
        { todo: editTodo },
      );
      
      if (response.status === 200) {
        setTodos(
          todos.map((todo) =>
            todo._id === _id ? { ...todo, todo: editTodo } : todo
          )
        );
        setEdit(false);
        setIsOpen(false);
      } else {
        console.error("Error updating todo");
      }
      toast.success("Task Successfully Update", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleEditClick = () => {
    if (!edit && !todo.isDone) {
      setEdit(true);
      setIsOpen(true);
    }
  };

  const handleDoneClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    haldleUpdate(e, todo._id);
    setEdit(false);
    setIsOpen(false);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <div>
      <form
        action=""
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          haldleUpdate(e, todo._id)
        }
        className="flex  rounded-lg border mt-3 bg-black text-white w-96"
      >
        <div className="flex-1 p-5 border-none text-[20px]">
          {edit ? (
            <input
              ref={inputRef}
              className="text-black rounded-md w-[90%] p-2"
              value={editTodo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditTodo(e.target.value)
              }
            />
          ) : (
            <span className="flex-1 p-5 border-none text-[20px]">
              <span className="items-center px-2 font-bold">{index}.</span>{" "}
              {todo.todo}
            </span>
          )}
        </div>

        <div className="flex flex-wrap-reverse gap-3 items-center px-4">
          <span className="text-2xl">
            {!isopen ? (
              <AiTwotoneEdit
                className="cursor-pointer"
                onClick={handleEditClick}
              />
            ) : (
              <MdOutlineDownloadDone
                className="cursor-pointer"
                onClick={handleDoneClick}
              />
            )}
          </span>

          <span className="text-2xl">
            <AiFillDelete
              className="cursor-pointer"
              onClick={() => haldleDelete(todo._id)}
            />
          </span>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </form>
    </div>
  );
};

export default SingleTodo;

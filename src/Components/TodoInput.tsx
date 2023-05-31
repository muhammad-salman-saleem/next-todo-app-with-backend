import React, { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const TodoInput: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  return (
    <div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleAdd(e);
          inputRef.current?.blur();
          toast.success("Task Added Successfully ", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }}
        className="pt-6 flex flex-wrap items-center justify-center"
      >
        <input
          ref={inputRef}
          type="text"
          value={todo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodo(e.target.value)
          }
          placeholder="Enter Your Task"
          className="bg-transparent border border-gray-400 rounded-full p-3  mx-0 sm:mx-4"
          required
        />
        <button
          type="submit"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border rounded-full border-blue-500 hover:border-transparent mt-3 sm:mt-0"
        >
          Add Task
        </button>
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

export default TodoInput;

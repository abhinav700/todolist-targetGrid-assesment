"use client";
import { useAppDispatch } from "@/redux/hooks";
import { addTodo } from "@/redux/todosSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type TodoType = {
  title: string;
  body: string;
  labels: string[];
};
const AddTodoModal = () => {
  const [todo, setTodo] = useState<TodoType>({
    title: "",
    body: "",
    labels: [],
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [label, setLabel] = useState<string>("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    dispatch(addTodo({...todo,labels}));
    setShow(false);
    setTodo({ title: "", body: "", labels:[] });
    setLabels(prevLabels => [])
  };

  const onChange = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault;
          setShow((show) => true);
        }}
        className="bg-blue-400 text-black-500 mt-4 mx-4 px-2 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 focus:outline-none focus:shadow-outline"
      >
        Create Todo
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add a todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Adding Title */}
          <div className="container my-3 flex justify-center items-center flex-col">
            <form className="w-11/12">
              <div className="mb-3 my-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="title"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  name="title"
                  value={todo.title}
                />
              </div>

              {/* Adding body */}
              <div className="mb-3">
                <label
                  htmlFor="body"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Body
                </label>
                <textarea
                  className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="body"
                  rows={3}
                  cols={50}
                  onChange={onChange}
                  name="body"
                  value={todo.body}
                />
              </div>

              {/* Adding Labels */}
              <div className="mb-3 my-3">
                <label
                  htmlFor="te"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Add Label
                </label>
                <input
                  type="text"
                  className="w-1/2 text-black px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  id="label"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setLabel((prevLabel) => e.target.value);
                  }}
                  name="label"
                  value={label}
                />
                <Button
                  variant="primary"
                  className="mx-2"
                  disabled={label.length === 0}
                  onClick={(e) => {
                    for (let i = 0; i < labels.length; i++) {
                      if (labels[i] == label) {
                        alert("Error: You can't add same label twice");
                        return;
                      }
                    }
                    setLabels((prevLabels) => [...labels, label]);
                    setLabel((prevLabel)=>"")
                  }}
                >
                  Add
                </Button>
                <div className="flex flex-row w-full mx-2">
                  {labels.map((item, index) => {
                    return (
                      <div className="flex bg-black text-white mr-3 px-1 py-1 my-3 rounded-lg" key = {item}>
                        <div className="mx-1">
                        {item}

                        </div>
                        <div className="mx-1 flex justify-center items-center bg-red-600 w-[25px] rounded-full hover:bg-red-500 hover:cursor-pointer">
                          <i className="bi bi-x-lg" onClick = {(e)=> {setLabels(prevLabels => labels.filter(l => l!= item))}}></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={todo.title.length < 5 || todo.body.length < 5}
            variant="primary"
            onClick={handleClick}
          >
            Create Todo
          </Button>
        </Modal.Footer>
      </Modal>
     
    </>
  );
};
AddTodoModal.displayName = "AddTodoModal";
export default AddTodoModal;

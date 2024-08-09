"use client";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useTodoItemHandlers } from "./useTodoitemHandlers";

const Todoitem = (props: any) => {
  const [todo, setTodo] = useState(props.todo);
  const [labels, setLabels] = useState<string[]>(todo.labels);
  const [label, setLabel] = useState<string>("");

  const {
    handleEditClose,
    handleDeleteClose,
    handleViewTodoClose,
    handleTaskCompletedClose,
    handleTaskInCompleteClose,
    handleDeleteShow,
    handleEditShow,
    handleViewTodoShow,
    handleTaskCompletedShow,
    handleTaskInCompleteShow,
    handleEditConfirm,
    handleDeleteConfirm,
    handleTaskCompletedConfirm,
    handleTaskInCompleteConfirm,
    showEditModal,
    setShowEditModal,
    showViewModal,
    setshowViewTodoModal,
    showDeleteModal,
    setshowDeleteModal,
    showTaskCompletedModal,
    setshowTaskCompletedModal,
    showTaskInCompleteModal,
    setshowTaskInCompleteModal
  }= useTodoItemHandlers({ todo, setTodo, labels });

  const onChange = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Main todoItem card component */}
      <div style={{ height: "20rem", width: "18rem" }}>
        <Card
          onClick={handleViewTodoShow}
          style={{ width: "100%", height: "80%" }}
          className="mx-4 mt-3 hover:border-black cursor-pointer"
        >
          <Card.Body>
              {
                <Card.Title>
                  {todo.title?.length <= 54
                    ? todo.title
                    : todo.title?.substr(0, 58) + "..."}
                </Card.Title>
              }
            {
              <Card.Text style={{ height: "35%" }}>
                {todo.body?.length <= 300
                  ? todo.body
                  : todo.body?.substr(0, 200) + "..."}
              </Card.Text>
            }
            {
              <Card.Text>
                <div className="flex flex-row w-full mx-2">
                  {todo.labels
                    ? todo.labels.slice(0, 3).map((item: any, index: any) => {
                        return (
                          <div
                            className="flex bg-black text-white mr-3 px-1 py-1 my-3 rounded-lg"
                            key={item}
                          >
                            <div className="mx-1">{item}</div>
                          </div>
                        );
                      })
                    : null}
                </div>

                {todo.labels.length > 3 ? (
                  <div>... +{todo.labels.length - 3} more</div>
                ) : null}
              </Card.Text>
            }
          </Card.Body>
          <div className="mx-1 flex items-center flex-row mx-2">
            {!todo.isCompleted ? (

              <i className="mx-1 bi bi-check2 text-[25px]" onClick = {handleTaskCompletedShow}></i>  
            ) : (
              <i className="mx-1 bi bi-x text-[25px]" onClick = {handleTaskInCompleteShow}></i> // mark as incompleted
            )}
            <i
              className="mx-2 bi bi-pencil-square hover:cursor-pointer"
              onClick={handleEditShow}
            ></i>
            <i
              className="bi mx-2 bi-trash3 hover:cursor-pointer"
              onClick={handleDeleteShow}
            ></i>
          </div>
        </Card>
      </div>

      {/* Modal for viewing Todos when clicking a todoItem*/}
      <Modal show={showViewModal} onHide={handleViewTodoClose}>
        <Modal.Header closeButton>
          <Modal.Title>{todo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container my-3">
            <div>{todo.body}</div>
          </div>
          <div>
            {" "}
            {
              <div className="flex flex-row w-full mx-2">
                {todo.labels
                  ? todo.labels.map((item: any, index: any) => {
                      return (
                        <div
                          className="flex bg-black text-white mr-3 px-1 py-1 my-3 rounded-lg"
                          key={item}
                        >
                          <div className="mx-1">{item}</div>
                        </div>
                      );
                    })
                  : null}
              </div>
            }
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for editing todos */}
      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title> Edit the todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container my-3 flex justify-center items-center flex-col">
            <form className="w-11/12">
              {/* Todo Title */}
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
                <div id="titletext" className="form-text"></div>
              </div>
              {/* Editing Todo Body */}
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
                  rows={4}
                  cols={50}
                  onChange={onChange}
                  name="body"
                  value={todo.body}
                />
              </div>
              {/* Editing todo labels */}
              <div className="mb-3 my-3">
                <label
                  htmlFor="te"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Labels
                </label>
                {/* Adding label */}
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
                    setLabel((prevLabel) => "");
                  }}
                >
                  Add
                </Button>
                <div className="flex flex-row flex-wrap w-[100%] h-fit mx-2">
                  {labels
                  // Displaying labels
                    ? labels.map((item, index) => {
                        return (
                          <div
                            className="flex bg-black text-white mr-3 px-1 py-1 my-3 rounded-lg"
                            key={item}
                          >
                            <div className="mx-1">{item}</div>
                            <div className="mx-1 flex justify-center items-center bg-red-600 w-[25px] rounded-full hover:bg-red-500 hover:cursor-pointer">
                              <i
                                className="bi bi-x-lg"
                                onClick={(e) => {
                                  setLabels((prevLabels) =>
                                    labels.filter((l) => l != item)
                                  );
                                }}
                              ></i>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button
            disabled={
              (todo.title && todo.title.length < 5) ||
              (todo.body && todo.body.length < 5)
            }
            variant="primary"
            onClick={handleEditConfirm}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Model */}
      <Modal show={showDeleteModal} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you want to delete this todo?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation for marking as completion */}
      <Modal show={showTaskCompletedModal} onHide={handleTaskCompletedClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you want to mark this task as completed?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTaskCompletedClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleTaskCompletedConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Marking completed task as incomplete */}
      <Modal show={showTaskInCompleteModal} onHide={handleTaskInCompleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you want to mark this task as incomplete?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTaskCompletedClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleTaskInCompleteConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
Todoitem.displayName = "Todoitem";
export default Todoitem;

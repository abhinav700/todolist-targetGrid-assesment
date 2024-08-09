"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import AddTodoModal from "./AddTodoModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTodos } from "@/redux/todosSlice";
import Todoitem from "./TodoItem/TodoItem";
import { TailSpin } from "react-loader-spinner";
import Button from "react-bootstrap/esm/Button";

function Todos() {
  const user = useAppSelector((state: any) => state.user);
  const todos = useAppSelector((state: any) => state.todos.todosData);
  const [showIncompleteTodos, setShowIncompleteTodos] = useState<boolean>(true);
  const [searchTermInput, setSearchTermInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string | null>(null)

  const completedTasks = todos
    ?( !searchTerm)
      ? todos //display all completed tasks if no label filter is applied
          .filter((item: any) => item.isCompleted)  
          .map((item: any) => {
            return <Todoitem key={item._id} todo={item} />;
          })
      : todos // filter on basis of searchTerm (label)
          .filter(
            (item: any) => item.isCompleted && item.labels.includes(searchTerm)
          )
          .map((item: any) => {
            return <Todoitem key={item._id} todo={item} />;
          })
    : [];

  const inCompleteTasks = todos
    ? !searchTerm
      ? todos // display all incomplete tasks if no label filter is applied
          .filter((item: any) => !item.isCompleted)
          .map((item: any) => {
            return <Todoitem key={item._id} todo={item} />;
          })
      : todos // filter on basis of searchTerm (label)
          .filter(
            (item: any) => !item.isCompleted && item.labels.includes(searchTerm)
          )
          .map((item: any) => {
            return <Todoitem key={item._id} todo={item} />;
          })
    : [];

  const todosNotFetched = useAppSelector(
    (state: any) => state.todos.todosNotFetched
  );
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  if (todosNotFetched) {
    dispatch(fetchTodos());
  }

  return (
    <>
      {todosNotFetched ? (
        <div className="flex flex-col justify-center items-center w-full h-[80vh]">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Fetching your todos</p>
        </div>
      ) : (
        <div>
          <AddTodoModal />
          <div className="flex flex-row mx-4 my-3">
            <Button
              className="mr-1 my-2 px-1 py-1"
              variant="danger"
              onClick={(e) => setShowIncompleteTodos((prevStatus) => true)}
            >
              Incomplete Tasks
            </Button>
            <Button
              className="mx-1 my-2 px-1 py-1"
              variant="success"
              onClick={(e) => setShowIncompleteTodos((prevStatus) => false)}
            >
              Completed Tasks
            </Button>
          </div>
          <div className="flex flex-row mx-3 my-3">
            <input
              className="mx-2 bg-gray-200 px-1 py-1 rounded-lg"
              type="text"
              placeholder="Search using Label"
              onChange={(e) => {
                setSearchTermInput(e.target.value);
              }}
              value={searchTermInput}
            />
            <Button
              variant="primary"
              className="mx-1"
              onClick={(e) => {
                e.preventDefault();
                setSearchTerm(prevSearchTerm => searchTermInput)
              }}
            >
              Search
            </Button>
            <Button
              variant="primary"
              className="mx-1"
              onClick={(e) => {
                e.preventDefault();
                setSearchTerm(prevSearchTerm => null)
                setSearchTermInput(prevSearchTerm => "")
              }}
            >
              Clear Label filters
            </Button>
          </div>
          {
            <div className="flex flex-wrap space-x-3">
              {todos ? (
                // Showing completed tasks
                showIncompleteTodos ? (
                  inCompleteTasks.length > 0 ? (
                    inCompleteTasks
                  ) : (
                    <div className="w-full h-[400px] flex justify-center items-center text-black">
                      <h1>No Tasks To show!</h1>
                    </div>
                  )
                ) : // showing incomplete tasks
                completedTasks.length > 0 ? (
                  completedTasks
                ) : (
                  <div className="w-full h-[400px] flex justify-center items-center">
                    <h1>No Data to display.</h1>
                  </div>
                )
              ) : null}
            </div>
          }
        </div>
      )}
    </>
  );
}

export default Todos;

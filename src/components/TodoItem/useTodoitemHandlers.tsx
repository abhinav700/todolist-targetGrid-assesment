import { deleteTodo, editTodo } from "@/redux/todosSlice";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";

export const useTodoItemHandlers = ({ todo, setTodo, labels }: any) => {
  const dispatch = useAppDispatch();

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setshowDeleteModal] = useState<boolean>(false);
  const [showViewModal, setshowViewTodoModal] = useState<boolean>(false);
  const [showTaskCompletedModal, setshowTaskCompletedModal] = useState<boolean>(false);
  const [showTaskInCompleteModal, setshowTaskInCompleteModal] = useState<boolean>(false);
  

  const handleEditClose = () => setShowEditModal(false);
  const handleDeleteClose = () => setshowDeleteModal(false);
  const handleViewTodoClose = () => setshowViewTodoModal(false);
  const handleTaskCompletedClose = () => setshowTaskCompletedModal(false);
  const handleTaskInCompleteClose = () => setshowTaskInCompleteModal(false);

  const handleEditShow = (e: any) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleDeleteShow = (e: any) => {
    e.stopPropagation();
    setshowDeleteModal(true);
  };

  const handleViewTodoShow = () => setshowViewTodoModal(true);

  const handleTaskCompletedShow = (e:any) => {
    e.stopPropagation();
    setshowTaskCompletedModal(true);
  };
  const handleTaskInCompleteShow = (e:any) => {
    e.stopPropagation();
    setshowTaskInCompleteModal(true);
  };
  const handleEditConfirm = async (e: any) => {
    e.preventDefault();
    dispatch(editTodo({ ...todo, labels }));
    setShowEditModal(false);
  };

  const handleDeleteConfirm = async (e: any) => {
    e.preventDefault();
    dispatch(deleteTodo(todo._id));
    setshowDeleteModal(false);
  };

  const handleTaskCompletedConfirm = async (e: any) => {
    e.preventDefault();
    dispatch(editTodo({ ...todo, isCompleted: true }));
    setshowTaskCompletedModal(false);
  };
  const handleTaskInCompleteConfirm = async (e: any) => {
    e.preventDefault();
    dispatch(editTodo({ ...todo, isCompleted: false }));
    setshowTaskInCompleteModal(false);
  };
  return {
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
  };
};

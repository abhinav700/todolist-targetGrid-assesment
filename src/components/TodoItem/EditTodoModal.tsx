import React, {useState} from "react";
import { useAppDispatch } from "@/redux/hooks";


const EditTodoModal = ({ todo, setTodo, labels }: any) => {
  const dispatch = useAppDispatch();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = (e: any) => {
    e.stopPropagation();
    setShowEditModal(true);
  
};
};

export default EditTodoModal;

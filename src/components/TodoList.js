import React, { useEffect, useState } from "react";
// import { fetchAllTask } from "../services/taskService";
import CardItem from "./CardItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../store/TaskSlice";
import CircularIndeterminate from "./Loading";
import { Toaster } from "react-hot-toast";
import DeleteTaskModal from "./DeleteTaskModal";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";

export default function TodoList() {
  // const [listTasks, setListTasks] = useState([]);

  // useEffect(() => {
  //   //Call APIs
  //   getTasks();
  // }, []);

  // const getTasks = async () => {
  //   let res = await fetchAllTask();
  //   if (res && res.data) {
  //     setListTasks(res.data);
  //   }
  // };

  //redux state
  const { loading, data, error } = useSelector((state) => state.tasks);
  // console.log(loading, data, error);
  console.log(data);
  //dispatch
  const dispatch = useDispatch();

  //fetch user
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  //delete user states
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const handleDeleteModal = (id) => {
    setDeleteTaskModal(true);
    setDeleteTaskId(id);
  };

  //add user states
  const [addTaskModal, setAddTaskModal] = useState(false);

  //edit user states
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [editTaskObj, setEditTaskObj] = useState(null);

  const handleEditModal = (obj) => {
    setEditTaskModal(true);
    setEditTaskObj(obj);
  };

  //filter
  const filterTodo =
    data &&
    data.length > 0 &&
    data.filter((task) => {
      return task.status === "to-do";
    });
  const filterInprogress =
    data &&
    data.length > 0 &&
    data.filter((task) => {
      return task.status === "in-progress";
    });
  const filterCompleted =
    data &&
    data.length > 0 &&
    data.filter((task) => {
      return task.status === "completed";
    });

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <CircularIndeterminate size={30} ></CircularIndeterminate>
        </div>
      ) : (
        <>
          {error ? (
            <div className="error-msg">{error}</div>
          ) : (
            <>
              <div className="todo-status">
                <div className="task todo">
                  <Toaster />
                  <h3>TO DO</h3>

                  <Fab
                    size="medium"
                    color="white"
                    aria-label="add"
                    onClick={() => setAddTaskModal(true)}
                    sx={{display:'flex', margin: " 0 auto"}}
                  >
                    <AddIcon />
                  </Fab>

                  {filterTodo &&
                    filterTodo.length > 0 &&
                    filterTodo.map((item, index) => {
                      return (
                        <CardItem
                          task={item}
                          key={`tasks-${index}`}
                          handleDeleteModal={handleDeleteModal}
                          handleEditModal={handleEditModal}
                        />
                      );
                    })}
                </div>
                <div className="task in-progress">
                  <Toaster />
                  <h3>IN PROGRESS</h3>

                  <Fab
                    size="medium"
                    color="white"
                    aria-label="add"
                    onClick={() => setAddTaskModal(true)}
                    sx={{display:'flex', margin: " 0 auto"}}
                  >
                    <AddIcon />
                  </Fab>

                  {filterInprogress &&
                    filterInprogress.length > 0 &&
                    filterInprogress.map((item, index) => {
                      return (
                        <CardItem
                          task={item}
                          key={`tasks-${index}`}
                          handleDeleteModal={handleDeleteModal}
                          handleEditModal={handleEditModal}
                        />
                      );
                    })}
                </div>
                <div className="task completed">
                  <Toaster />
                  <h3>COMPLETED</h3>

                  <Fab
                    size="medium"
                    color="white"
                    aria-label="add"
                    onClick={() => setAddTaskModal(true)}
                    sx={{display:'flex', margin: " 0 auto"}}
                  >
                    <AddIcon />
                  </Fab>

                  {filterCompleted &&
                    filterCompleted.length > 0 &&
                    filterCompleted.map((item, index) => {
                      return (
                        <CardItem
                          task={item}
                          key={`tasks-${index}`}
                          handleDeleteModal={handleDeleteModal}
                          handleEditModal={handleEditModal}
                        />
                      );
                    })}
                </div>
              </div>
            </>
          )}
        </>
      )}
      {/* delete modal */}
      {deleteTaskModal && (
        <DeleteTaskModal
          setDeleteTaskModal={setDeleteTaskModal}
          deleteTaskId={deleteTaskId}
        />
      )}
      {/* add modal */}
      {addTaskModal && <AddTaskModal setAddTaskModal={setAddTaskModal} />}

       {/* edit modal */}
       {editTaskModal && (
        <EditTaskModal
          setEditTaskModal={setEditTaskModal}
          editTaskObj={editTaskObj}
        />
      )}
    </>
  );
}

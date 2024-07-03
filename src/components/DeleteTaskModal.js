import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../store/TaskSlice";
import toast from "react-hot-toast";

//backshadow variants
const backVariants = {
  hiden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
// modal variant
const modalVariants = {
  hiden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function DeleteTaskModal({ setDeleteTaskModal, deleteTaskId }) {
  //close modal
  const handleCloseModal = () => {
    if (!deleteTaskLoading) {
      setDeleteTaskModal(false);
    }
  };

  //* redux state
  const { deleteTaskLoading, deleteTaskData } = useSelector(
    (state) => state.tasks
  );

  //* dispatch
  const dispatch = useDispatch();
  //* delete task
  const handleDeleteTask = () => {
    dispatch(deleteTask({ id: deleteTaskId })).then((res) => {
      if (!res.payload.error) {
        setDeleteTaskModal(false);
        toast.success(`${res.payload.successMsg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          PauseOnHover: true,
          draggble: true,
        });
      }
    });
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="backdrop"
          variants={backVariants}
          initial="hiden"
          animate="visible"
        >
          <motion.div
            className="custom-modal"
            variants={modalVariants}
            initial="hiden"
            animate="visible"
          >
            <div className="modal-header">
              <div>Delete Task - {deleteTaskId}</div>
              <div className="cancel-icon" onClick={handleCloseModal}>
                <CancelIcon />
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-warning">
                <p style={{ color: "#dc3545", padding: 12 }}>
                  Are you sure to delete this task?
                </p>
                <p style={{ color: "#6a6c6f", paddingBottom: 12 }}>
                  You cannot undo this action
                </p>
              </div>
              <div className="submit-and-cancel">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCloseModal}
                >
                  CANCEL
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  disabled={deleteTaskLoading}
                  onClick={handleDeleteTask}
                  sx={{minWidth: 24}}
                >
                  {deleteTaskLoading ? (
                    <CircularProgress size={25}  loading={deleteTaskLoading} />
                  ) : (
                    "DELETE"
                  )}
                </Button>
              </div>{" "}
              {deleteTaskData &&
                deleteTaskData.error &&
                deleteTaskData.id === deleteTaskId && (
                  <div className="error-msg">{deleteTaskData.error}</div>
                )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

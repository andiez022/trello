import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../store/TaskSlice";
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
const EditTaskModal = ({ setEditTaskModal, editTaskObj }) => {
  //* redux state
  const { updateTaskLoading, updateTaskData } = useSelector(
    (state) => state.tasks
  );
  //close modal
  const handleCloseModal = () => {
    if (!updateTaskLoading) {
      setEditTaskModal(false);
    }
  };


  //*form state
  const [creator, setCreator] = useState(editTaskObj.creator);
  const [assigned_to, setAssignedTo] = useState(editTaskObj.assigned_to);
  const [title, setTitle] = useState(editTaskObj.title);
  const [decription, setDecription] = useState(editTaskObj.decription);
  const [due_date, setDue_date] = useState(editTaskObj.due_date);
  const [status, setStatus] = useState(editTaskObj.status);

  //dispatch
  const dispatch = useDispatch();
  //* update event
  const handleUpdateTask = (e) => {
    e.preventDefault();
    dispatch(
        updateTask({
          id: editTaskObj.id,
          creator,
          assigned_to,
          title,
          decription,
          due_date,
          status
        })
      ).then((res) => {
        if (!res.payload.error) {
          setEditTaskModal(false);
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
              <div>Edit Task - {editTaskObj.title}</div>
              <div className="cancel-icon" onClick={handleCloseModal}>
                <CancelIcon />
              </div>
            </div>
            <div className="modal-body">
              <form className="custom-modal" onSubmit={handleUpdateTask}>
                <TextField
                  sx={{ width: 400, margin: "8px auto", marginTop: "16px" }}
                  id="filled-basic"
                  label="Creator"
                  variant="filled"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                />

                <TextField
                  sx={{ width: 400, margin: "8px auto" }}
                  id="filled-basic"
                  label="Assigned to"
                  variant="filled"
                  value={assigned_to}
                  onChange={(e) => setAssignedTo(e.target.value)}
                />

                <TextField
                  id="outlined-multiline-flexible"
                  label="Title"
                  multiline
                  maxRows={4}
                  sx={{ width: 400, margin: "8px auto" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                  id="outlined-multiline-static"
                  label="Decription"
                  rows={2}
                  sx={{ width: 400, margin: "8px auto" }}
                  value={decription}
                  onChange={(e) => setDecription(e.target.value)}
                />

                <div style={{ margin: "0px auto", width: 400 }}>
                  <LocalizationProvider
                    dateAdapter={AdapterMoment}
                    adapterLocale="de"
                  >
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Due date"
                        selected={due_date}
                        onChange={(due_date) => setDue_date(due_date)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <FormControl sx={{ width: 350, margin: "8px auto" }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Status
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="to-do"
                    name="radio-buttons-group"
                    row
                  >
                    <FormControlLabel
                      value="to-do"
                      control={<Radio />}
                      label="To do"
                      checked={status === "to-do"}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <FormControlLabel
                      value="in-progress"
                      control={<Radio />}
                      label="In progress"
                      checked={status === "in-progress"}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <FormControlLabel
                      value="completed"
                      control={<Radio />}
                      label="Completed"
                      checked={status === "completed"}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </RadioGroup>
                </FormControl>

                {updateTaskData?.error &&
                  updateTaskData.id === editTaskObj.id && (
                    <div className="error-msg">{updateTaskData.error}</div>
                  )}

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
                    color="primary"
                    disabled={updateTaskLoading}
                    type="submit"
                    sx={{ minWidth: 24 }}
                  >
                    {updateTaskLoading ? (
                      <CircularProgress size={25} />
                    ) : (
                      "UPDATE"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EditTaskModal;

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
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
import { addTask } from "../store/TaskSlice";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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

const AddTaskModal = ({ setAddTaskModal }) => {
  //close modal
  const handleCloseModal = () => {
    if (!addTaskLoading) {
      setAddTaskModal(false);
    }
  };

  //* redux state
  const { addTaskLoading, addTaskData } = useSelector((state) => state.tasks);

  //* form state
  const [creator, setCreator] = useState("");
  const [assigned_to, setAssignedTo] = useState("");
  const [title, setTitle] = useState("");
  const [decription, setDecription] = useState("");
  const [due_date, setDue_date] = useState("");
  const [status, setStatus] = useState("");

  //dispatch
  const dispatch = useDispatch();
  //* form submit
  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(
      addTask({
        id: uuidv4(),
        creator,
        assigned_to,
        title,
        decription,
        due_date,
        status,
      })
    ).then((res) => {
      if (!res.payload.error) {
        setAddTaskModal(false);
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
              <div>Add Task</div>
              <div className="cancel-icon" onClick={handleCloseModal}>
                <CancelIcon />
              </div>
            </div>
            <div className="modal-body">
              <form className="custom-modal" onSubmit={handleAddTask}>
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

                {addTaskData?.error && (
                  <div className="error-msg">{addTaskData.error}</div>
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
                    disabled={addTaskLoading}
                    type="submit"
                    sx={{ minWidth: 24 }}
                  >
                    {addTaskLoading ? (
                      <CircularProgress size={25} loading={addTaskLoading} />
                    ) : (
                      "ADD"
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

export default AddTaskModal;

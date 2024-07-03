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
import {
  
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  // const [creator, setCreator] = useState("");
  // const [assigned_to, setAssignedTo] = useState("");
  // const [title, setTitle] = useState("");
  // const [decription, setDecription] = useState("");
  // const [due_date, setDue_date] = useState("");
  // const [status, setStatus] = useState("");

  //?formik
  const formik = useFormik({
    initialValues: {
      creator: "",
      assigned_to: "",
      title: "",
      decription: "",
      due_date: "",
      status: "",
    },
    validationSchema: Yup.object({
      creator: Yup.string().email("Invalid email format").required("Required"),
      assigned_to: Yup.string()
        .email("Invalid email format")
        .required("Required"),
      title: Yup.string().max(50, "Maximum 50 characters").required("Required"),
      decription: Yup.string()
        .max(500, "Maximum 500 characters")
        .required("Required"),
      // due_date: Yup.string().nullable().required("Required"),
      status: Yup.string()
        .required("Required")
        .typeError("please enter a valid date"),
    }),
    onSubmit: (values) => {
      dispatch(
        addTask({
          id: uuidv4(),
          creator: values.creator,
          assigned_to: values.assigned_to,
          title: values.title,
          decription: values.decription,
          due_date: values.due_date,
          status: values.status,
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
    },
  });

  //dispatch
  const dispatch = useDispatch();
  //* form submit

  // const handleAddTask = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     addTask({
  //       id: uuidv4(),
  //       creator: formik.values.creator,
  //       assigned_to: formik.values.assigned_to,
  //       title: formik.values.title,
  //       decription: formik.values.decription,
  //       due_date: formik.values.due_date,
  //       status: formik.values.status,
  //     })
  //   ).then((res) => {
  //     if (!res.payload.error) {
  //       setAddTaskModal(false);
  //       toast.success(`${res.payload.successMsg}`, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         PauseOnHover: true,
  //         draggble: true,
  //       });
  //     }
  //   });
  // };
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
              <form
                className="custom-modal"
                onSubmit={formik.handleSubmit}
                // onSubmit={handleAddTask}
              >
                <TextField
                  sx={{ width: 400, margin: "8px auto", marginTop: "16px" }}
                  id="filled-basic"
                  label="Creator"
                  variant="filled"
                  name="creator"
                  // value={creator}
                  // onChange={(e) => setCreator(e.target.value)}
                  value={formik.values.creator}
                  onChange={formik.handleChange}
                />
                {formik.errors.creator && formik.touched.creator && (
                  <p className="warning">{formik.errors.creator}</p>
                )}
                <TextField
                  sx={{ width: 400, margin: "8px auto" }}
                  id="filled-basic"
                  label="Assigned to"
                  variant="filled"
                  name="assigned_to"
                  // value={assigned_to}
                  // onChange={(e) => setAssignedTo(e.target.value)}
                  value={formik.values.assigned_to}
                  onChange={formik.handleChange}
                />
                {formik.errors.assigned_to && formik.touched.assigned_to && (
                  <p className="warning">{formik.errors.assigned_to}</p>
                )}
                <TextField
                  id="outlined-multiline-flexible"
                  label="Title"
                  multiline
                  maxRows={4}
                  sx={{ width: 400, margin: "8px auto" }}
                  name="title"
                  // value={title}
                  // onChange={(e) => setTitle(e.target.value)}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title && (
                  <p className="warning">{formik.errors.title}</p>
                )}
                <TextField
                  id="outlined-multiline-static"
                  label="Decription"
                  rows={2}
                  sx={{ width: 400, margin: "8px auto" }}
                  name="decription"
                  // value={decription}
                  // onChange={(e) => setDecription(e.target.value)}
                  value={formik.values.decription}
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.decription && formik.touched.decription && (
                  <p className="warning">{formik.errors.decription}</p>
                )}

                <div style={{ margin: "0px auto", width: 400 }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    
                  >
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Due date"
                        name="due_date"
                        // selected={due_date}
                        // onChange={(due_date) => setDue_date(due_date)}
                        selected={formik.values.due_date}
                        onChange={formik.handleChange}
                      
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                  </div>
                {formik.errors.due_date && formik.touched.due_date && (
                  <p className="warning">{formik.errors.due_date}</p>
                )}
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
                      // checked={status === "to-do"}
                      // onChange={(e) => setStatus(e.target.value)}
                      name="status"
                      onChange={formik.handleChange}
                      checked={formik.values.status === "to-do"}
                    />
                    <FormControlLabel
                      value="in-progress"
                      control={<Radio />}
                      label="In progress"
                      // checked={status === "in-progress"}
                      // onChange={(e) => setStatus(e.target.value)}
                      name="status"
                      onChange={formik.handleChange}
                      checked={formik.values.status === "in-progress"}
                    />
                    <FormControlLabel
                      value="completed"
                      control={<Radio />}
                      label="Completed"
                      // checked={status === "completed"}
                      // onChange={(e) => setStatus(e.target.value)}
                      name="status"
                      onChange={formik.handleChange}
                      checked={formik.values.status === "completed"}
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
                    {addTaskLoading ? <CircularProgress size={25} /> : "ADD"}
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

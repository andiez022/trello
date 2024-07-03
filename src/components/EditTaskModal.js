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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../store/TaskSlice";
import toast from "react-hot-toast";
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
  // const [creator, setCreator] = useState(editTaskObj.creator);
  // const [assigned_to, setAssignedTo] = useState(editTaskObj.creator);
  // const [title, setTitle] = useState(editTaskObj.creator);
  // const [decription, setDecription] = useState(editTaskObj.decription);
  // const [due_date, setDue_date] = useState(editTaskObj.due_date);
  // const [status, setStatus] = useState(editTaskObj.status);

  //?formik
  const formik = useFormik({
    initialValues: {
      creator: editTaskObj.creator,
      assigned_to: editTaskObj.assigned_to,
      title: editTaskObj.title,
      decription: editTaskObj.decription,
      due_date: editTaskObj.due_date,
      status: editTaskObj.status,
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
      due_date: Yup.string()
        .nullable()
        .required("Required")
        .typeError("please enter a valid date"),
      status: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(
        updateTask({
          id: editTaskObj.id,
          creator: values.creator,
          assigned_to: values.assigned_to,
          title: values.title,
          decription: values.decription,
          due_date: values.due_date,
          status: values.status,
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
    },
  });
  //dispatch
  const dispatch = useDispatch();
  //* update event
  // const handleUpdateTask = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //       updateTask({
  //         id: editTaskObj.id,
  //         creator,
  //         assigned_to,
  //         title,
  //         decription,
  //         due_date,
  //         status
  //       })
  //     ).then((res) => {
  //       if (!res.payload.error) {
  //         setEditTaskModal(false);
  //         toast.success(`${res.payload.successMsg}`, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           PauseOnHover: true,
  //           draggble: true,
  //         });
  //       }
  //     });
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
              <div>Edit Task - {editTaskObj.title}</div>
              <div className="cancel-icon" onClick={handleCloseModal}>
                <CancelIcon />
              </div>
            </div>
            <div className="modal-body">
              <form className="custom-modal" onSubmit={formik.handleSubmit}>
                <TextField
                  sx={{ width: 400, margin: "8px auto", marginTop: "16px" }}
                  id="filled-basic"
                  label="Creator"
                  variant="filled"
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
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.title && formik.touched.title && (
                  <p className="warning">{formik.errors.title}</p>
                )}
                <TextField
                  id="outlined-multiline-static"
                  label="Decription"
                  rows={2}
                  sx={{ width: 400, margin: "8px auto" }}
                  value={formik.values.decription}
                  onChange={formik.handleChange}
                />{" "}
                {formik.errors.decription && formik.touched.decription && (
                  <p className="warning">{formik.errors.decription}</p>
                )}
                <div style={{ margin: "0px auto", width: 400 }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="de"
                  >
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Due date"
                        selected={formik.values.due_date}
                        onChange={(value) =>
                          formik.setFieldValue("due_date", value)
                        }
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
                      name="status"
                      onChange={formik.handleChange}
                      checked={formik.values.status === "to-do"}
                    />
                    <FormControlLabel
                      value="in-progress"
                      control={<Radio />}
                      label="In progress"
                      name="status"
                      onChange={formik.handleChange}
                      checked={formik.values.status === "in-progress"}
                    />
                    <FormControlLabel
                      value="completed"
                      control={<Radio />}
                      label="Completed"
                      name="status"
                      onChange={formik.handleChange}
                      checked={formik.values.status === "completed"}
                    />
                  </RadioGroup>
                </FormControl>
                {formik.errors.status && formik.touched.status && (
                  <p className="warning">{formik.errors.status}</p>
                )}
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

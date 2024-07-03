import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import {
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BasicDateTimePicker from "./Date";
import { useDispatch } from "react-redux";
import { addUser } from "../store/TaskSlice";
import { uuid } from 'uuidv4';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1.5px solid #000",
  boxShadow: 10,
  p: 4,
  borderRadius: 2,
};

export default function BasicModal({setAddTaskModal}) {
 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [title, setTitle] = useState("");
  // const [decription, setDecription] = useState("");
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addTitle(title);
  //   addDecription(decription);

  //   setTitle("");

  //   console.log(title);
  // };

  //* redux state
  const { addTaskLoading, addTaskData } = useSelector(
    (state) => state.tasks
  );

  //* form state
  const [creator, setCreator] = useState("")

  //* dispatch 
  const dispatch = useDispatch()

  //* form submit
  const handleAddTask = (e) => {
    e.preventDefault();
    handleClose();
    dispatch(addUser({
      id: uuid(),
      creator,
      assigned_to,
      title,
      decription,
      due_date,
      // status,
    })).then((res => {
      if (!res.payload.error) {
        handleClose();
        toast.success(`${res.payload.successMsg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          PauseOnHover: true,
          draggble: true,
        });
      }
    }))
  }

  

  //? Formik
  const formik = useFormik({
    initialValues: {
      creator: creator,
      assigned_to: "",
      title: "",
      decription: "",
      due_date: "",
      status: "",
    },

    //? Yup
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
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "8px",
          }}
          onClick={handleOpen}
        >
          
          <Fab size="medium" color="white" aria-label="add" onClick={() => setAddTaskModal(true)}>
            <AddIcon />
          </Fab>
        </Box>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <h4
              style={{ textAlign: "center", paddingTop: 0, paddingBottom: 24 }}
            >
              ADD TASK
            </h4>
            <TextField
              sx={{ width: 400, marginBottom: "16px" }}
              id="filled-basic"
              label="Creator"
              variant="filled"
              name="creator"
              value={formik.values.creator}
              onChange={formik.handleChange}
            />
            {formik.errors.creator && formik.touched.creator && (
              <p className="warning">{formik.errors.creator}</p>
            )}
            <TextField
              sx={{ width: 400 }}
              id="filled-basic"
              label="Assigned to"
              variant="filled"
              name="assigned_to"
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
              sx={{ width: 400, marginTop: 2 }}
              name="title"
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
              sx={{ width: 400, marginTop: 2, marginBottom: 1 }}
              name="decription"
              value={formik.values.decription}
              onChange={formik.handleChange}
            />
            {formik.errors.decription && formik.touched.decription && (
              <p className="warning">{formik.errors.decription}</p>
            )}

            
      
              <BasicDateTimePicker
                name="due_date"
                value={formik.values.due_date}
                onChange={formik.handleChange}
              ></BasicDateTimePicker>
              {formik.errors.due_date && formik.touched.due_date && (
                <p className="warning">{formik.errors.due_date}</p>
              )}
              {/* <TextField
                label="Status"
                sx={{ width: 180 }}
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              />
              {formik.errors.status && formik.touched.status && (
                <p className="warning">{formik.errors.status}</p>
              )} */}
              <FormControl sx={{margin: "28px"}}>
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
                  />
                  <FormControlLabel
                    value="in-progress"
                    control={<Radio />}
                    label="In progress"
                  />
                  <FormControlLabel
                    value="completed"
                    control={<Radio />}
                    label="Completed"
                  />
                </RadioGroup>
              </FormControl>
                
            {addTaskData?.error && (
              <div className="error-msg">{addTaskData.error}</div>
            )}
            <div className="submit-btn">
              <Button
                variant="contained"
                type="submit"
                // onSubmit={handleClose}
                onSubmit={handleAddTask}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                disabled={addTaskLoading}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

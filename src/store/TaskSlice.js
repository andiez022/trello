import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//fetch tasks
export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const request = await axios.get(
    "https://667178dbe083e62ee43bbf93.mockapi.io/api/v1/todo"
  );
  const response = await request.data;
  return response;
});

//!delete task
export const deleteTask = createAsyncThunk("deleteTask", async (obj) => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };
    const request = await axios.delete(
      `https://667178dbe083e62ee43bbf93.mockapi.io/api/v1/todo/${obj.id}`,
      axiosConfig
    );
    const response = await request.data;
    console.log(response);
    return {
      successMsg: "Task SuccessFully Deleted!",
      error: null,
      id: obj.id,
    };
  } catch (err) {
    console.log(err);
    return {
      successMsg: null,
      error: "Cannot delete this task",
      id: obj.id,
    };
  }
});

//add task
export const addTask = createAsyncThunk("addTask", async (obj) => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${obj.token}`
      },
    };
    const data = {
      id: obj.id,
      creator: obj.creator,
      assigned_to: obj.assigned_to,
      title: obj.title,
      decription: obj.decription,
      due_date: obj.due_date,
      status: obj.status,
    };
    const request = await axios.post(
      `https://667178dbe083e62ee43bbf93.mockapi.io/api/v1/todo`,
      data,
      axiosConfig
    );
    const response = await request.data;
    // response.id = obj.id;
    console.log(response);
    //action/payload
    return {
      data: response,
      successMsg: "Task is successfully added",
      error: null,
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      successMsg: null,
      error: "Cannot add new task",
    };
  }
});
//update task
export const updateTask = createAsyncThunk("updateTask", async (obj) => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${obj.token}`
      },
    };
    const data = {
      id: obj.id,
      creator: obj.creator,
      assigned_to: obj.assigned_to,
      title: obj.title,
      decription: obj.decription,
      due_date: obj.due_date,
      status: obj.status,
    };
    const request = await axios.patch(
      `https://667178dbe083e62ee43bbf93.mockapi.io/api/v1/todo/${obj.id}`,
      data,
      axiosConfig
    );
    const response = await request.data;
    // response.id = obj.id;
    console.log(response);
    //action/payload
    return {
      data: response,
      successMsg: "Task updated successfully",
      error: null,
      id: obj.id,
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      successMsg: null,
      error: "Cannot update task",
      id: obj.id,
    };
  }
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    //fetch
    loading: false,
    data: null,
    error: null,
    //delete
    deleteTaskLoading: false,
    deleteTaskData: null,
    //add
    addTaskLoading: false,
    addTaskData: null,
    //updatee
    updateTaskLoading: false,
    updateTaskData: null,
  },
  extraReducers: (builder) => {
    builder
      //fetch task
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = true;
        state.data = null;
        state.error = action.error.message;
      })
      //delete task
      .addCase(deleteTask.pending, (state) => {
        state.deleteTaskLoading = true;
        state.deleteTaskData = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteTaskLoading = false;
        state.deleteTaskData = action.payload;
        const { error, id } = action.payload;
        if (!error) {
          state.data = state.data.filter((data) => data.id !== id);
        }
      })
      // add task

      .addCase(addTask.pending, (state) => {
        state.addTaskLoading = true;
        state.addTaskData = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.addTaskLoading = false;
        state.addTaskData = action.payload;
        const { data } = action.payload;
        if (data) {
          state.data.unshift(data);
        }
      })
      // update task

      .addCase(updateTask.pending, (state) => {
        state.updateTaskLoading = true;
        state.updateTaskData = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updateTaskLoading = false;
        state.updateTaskData = action.payload;
        const { data, id } = action.payload;
        if (data) {
          const taskIndex = state.data.findIndex((task) => task.id === id);
          //if task index is found then update that found object with the new one
          if (taskIndex !== -1) {
            state.data[taskIndex] = data;
          }
        }
      });
  },
});

export default taskSlice.reducer;

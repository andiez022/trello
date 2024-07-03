import * as React from "react";
import Card from "@mui/material/Card";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Fab } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CardItem({ task, handleDeleteModal, handleEditModal }) {

  return (
    <Card
      className="list-item"
      sx={{ minWidth: 275, margin: "8px", cursor: "pointer" }} 
      
    >
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Creator:</span> {task.creator}
          </Typography>
          <Typography sx={{ fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}> Assigned to:</span>{" "}
            {task.assigned_to}
          </Typography>
          <Typography
            sx={{ paddingBottom: 2, paddingTop: 2, fontWeight: "bold" }}
          >
            {task.title}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "black" }}>
            {task.decription}
          </Typography>

          <div className="todo-date">
            <CalendarTodayIcon sx={{ fontSize: 12 }}></CalendarTodayIcon>
            <Typography sx={{ fontSize: 12 }}>{task.due_date}</Typography>
          </div>
        </CardContent>
    <div className="card-btn">
    <Fab sx={{margin: 1}} size="small" color="info" aria-label="edit" onClick={()=> handleEditModal(task)}>
        <EditIcon />
      </Fab>
    <Fab sx={{margin: 1}} size="small" color="error" aria-label="edit" onClick={() => handleDeleteModal(task.id)}>
        <DeleteIcon />
      </Fab>
     
    </div>
      </React.Fragment>

    </Card>
  );
}

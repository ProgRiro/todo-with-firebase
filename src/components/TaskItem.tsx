import React from "react";
import firebase from "firebase/app";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

interface Props {
  id: string;
  title: string;
}

const TaskItem: React.FC<Props> = ({ id, title }) => {
  return (
    <div>
      <ListItem>
        <h2>{title}</h2>
      </ListItem>
    </div>
  );
};

export default TaskItem;

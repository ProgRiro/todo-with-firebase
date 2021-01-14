import { FormControl, TextField, List } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import TaskItem from "./components/TaskItem";
import { db } from "./firebase";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");
  useEffect(() => {
    // db.collection.onSnapshot で firebase 側の変更を監視する
    // 監視しているため、画面を更新しなくても自動で表示が書き換わる
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    // 監視をするための関数が戻り値で返ってきている
    return () => unSub();
  }, []);
  const newTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    db.collection("tasks").add({ title: input });
    setInput("");
  };
  return (
    <div className={styles.app__root}>
      <h1>React Todo App with Firebase</h1>
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="New task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;

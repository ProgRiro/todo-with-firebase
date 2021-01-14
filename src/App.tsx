import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
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
  return (
    <div className="App">
      {tasks.map((task) => (
        <h3 key={task.id}>{task.title}</h3>
      ))}
    </div>
  );
};

export default App;

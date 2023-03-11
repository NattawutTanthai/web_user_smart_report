import React, { useEffect, useState } from "react";
import axios from "axios";
import MapComp from "./components/MapComp";
import Appbar from "./components/Appbar";

function App() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    axios.get('http://localhost:3000/task')
      .then(res => {
        console.log(res.data)
        setTasks(res.data)
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Appbar />
      <MapComp tasks={tasks} />
    </>
  );
}

export default App;

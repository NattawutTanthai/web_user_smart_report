import React, { useEffect, useState } from "react";
import axios from "axios";
import MapComp from "./components/MapComp";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const getTasks = async () => {
    handleOpen();
    axios.get('https://api-smart-report.vercel.app/task')
      .then(res => {
        console.log(res.data)
        setTasks(res.data)
        handleClose();
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <MapComp tasks={tasks} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default App;

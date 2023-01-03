import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MainPage from "./MainPage";
import EachTask from "./EachTask";
import MyTasks from "./MyTasks";
import ChatRoom from "./ChatRoom";
import MyRequest from "./MyRequest";
// import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/mytasks" element={<MyTasks />} />
        <Route path="/eachtask/:id" element={<EachTask />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/myrequest" element={<MyRequest />} />
      </Routes>
    </Router>
  );
}

export default App;

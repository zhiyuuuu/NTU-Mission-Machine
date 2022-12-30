import Login from "./Login";
import Register from "./Register";
import MainPage from "./MainPage";
import EachTask from "./EachTask";
import MyTasks from "./MyTasks";
import ChatRoom from "./ChatRoom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/mytasks" element={<MyTasks />} />
        <Route path="/eachtask" element={<EachTask />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;

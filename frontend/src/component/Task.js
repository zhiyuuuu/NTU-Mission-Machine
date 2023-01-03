import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const Task = ({ id, topic, description, salary, due, curUserName }) => {
  const navigate = useNavigate();

  const navigateToTask = (id) => {
    navigate(`/eachtask/:${id}`, {
      state: {
        id: id,
        description: description,
        topic: topic,
        salary: salary,
        due: due,
        curUserName: curUserName,
      },
    });
  };
  return (
    <div onClick={() => navigateToTask(id)}>
      <Card
        title={topic}
        bordered={false}
        style={{
          width: "auto",
        }}
      >
        <h3>報酬 : </h3>
        <p>{salary}</p>
        <h3>在甚麼時候前完成?</h3>
        <p>{due}</p>
      </Card>
    </div>
  );
};
export default Task;

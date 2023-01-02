import { Card } from "antd";

const Task = ({ id, topic, salary, due }) => {
  console.log(due);
  return (
    <div>
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

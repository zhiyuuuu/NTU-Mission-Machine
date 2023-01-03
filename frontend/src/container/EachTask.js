import { Card, message } from "antd";
import { useLocation } from "react-router-dom";
// import { handleEachTask } from "../api";
import { Button } from "antd";
import { handleApply } from "../api";

const EachTask = () => {
  const displayStatus = (s) => {
    if (s.message === "success") {
      const type = s.message;
      console.log(type);
      const content = { content: s.message, duration: 1 };
      switch (type) {
        case "success":
          message.success("成功應徵!!");
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };
  const handleClick = async () => {
    let response = await handleApply({ id, username });
    // console.log(response);
    displayStatus(response);
  };

  const { state } = useLocation();
  //console.log(state);
  const id = state.id;
  const topic = state.topic;
  const description = state.description;
  const salary = state.salary;
  const due = state.due;
  const username = state.curUserName;
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "green",
        }}
      >
        NTU Mission Machine
      </h1>
      <Card
        title={topic}
        bordered={false}
        style={{
          width: "auto",
        }}
      >
        <h3>詳細任務內容 : </h3>
        <p>{description}</p>
        <h3>報酬 : </h3>
        <p>{salary}</p>
        <h3>在甚麼時候前完成?</h3>
        <p>{due}</p>
        <Button type="primary" size={"large"} onClick={handleClick}>
          應徵!!
        </Button>
      </Card>
    </div>
  );
};
export default EachTask;

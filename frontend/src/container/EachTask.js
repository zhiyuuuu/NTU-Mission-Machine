import { Card, message } from "antd";
import { useLocation } from "react-router-dom";
// import { handleEachTask } from "../api";
import { Button } from "antd";
import { handleApply } from "../api";

const EachTask = () => {
  const displayStatus = (s) => {
    const type = s.message;
    console.log("message type:", type);
    const content = { content: s.message, duration: 3 };
    switch (type) {
      case "success":
        message.success("成功應徵!!");
        break;
      case "error":
      default:
        message.error(content);
        break;
    }
  };
  const handleClick = async () => {
    const public_status = false;
    let response = await handleApply({ id, username, public_status });
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
  const public_status = state.public_status;
  const issuer = state.issuer;
  const receiver = state.receiver;
  let isIssuer = false;
  let isReceiver = false;
  if (issuer === username) {
    isIssuer = true;
  }
  if (receiver === username) {
    isReceiver = true;
  }
  //   console.log("eachTask", public_status);
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
        {/* {isIssuer? <></>:} */}
        {public_status ? (
          <Button type="primary" size={"large"} onClick={handleClick}>
            應徵!!
          </Button>
        ) : (
          //   <Button type="dashed" size={"large"} danger onClick={handleClick}>
          <Button type="dashed" size={"large"} danger>
            已徵到善心人士了( ´▽｀)
          </Button>
        )}
        {/* // <Button type="primary" size={"large"} onClick={handleClick}>
        //   應徵!!
        // </Button> */}
      </Card>
    </div>
  );
};
export default EachTask;

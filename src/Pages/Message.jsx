import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useQueryClient } from "react-query";

const Message = () => {
  const queryClient = useQueryClient();
  const [msg, setMsg] = useState({});
  const [initial, setInitia] = useState(true);
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    if (initial) {
      Initial();
    }
    const websocket = new WebSocket("ws://127.0.0.1:8080/websocket");
    if(websocket){
      websocket.onopen = () => {
        console.log("connected");
      };
  
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        queryClient.setQueriesData(data.entity, (oldData) => {
          const update = (entity) =>
            entity.id === data.id ? { ...entity, ...data.payload } : entity;
          return Array.isArray(oldData) ? oldData.map(update) : update(oldData);
        });
      };
  
      websocket.onerror = (event) => {
        message.error(event);
        console.log("websocket err: ", event);
      };
  
      websocket.onclose = (event) => {
        message.warning("websocket is closed");
      };
    }
    else{
      message
    }

    return () => {
      websocket.close();
    };
  }, [queryClient]);

  const Initial = () => {
    setInitia(false);
    getData();
  };

  const onSend = (data) => {};

  const getData = () => {
    fetch("", {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.code && json.code === 0) {
          setMsg(json.data);
          return;
        }
        throw new Error("network offline!");
      })
      .catch((err) => console.log("Request Failed", err));
  };

  return (
    <div>
      <div>
        <text>Hi</text>
      </div>
    </div>
  );
};

export default Message;

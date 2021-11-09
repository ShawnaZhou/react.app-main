import React, { useState, useEffect } from "react";
import { Tag, message } from "antd";
import { useHistory } from "react-router-dom";
import Buttons from "../Components/Buttons";
import "./UploadQueue.css";

const UploadQueue = () => {
  let history = useHistory();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(["a", "b", "c"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [editInputValue, setEditInputValue] = useState("");

  const changeContent = (e) => {
    setContent(e.target.value);
  };
  const user = sessionStorage.getItem("user");

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    if (editInputValue.length > 0) {
      let tempData = tags;
      tempData.push(editInputValue);
      console.log("tempData,", tempData);
      setTags(tempData);
      setEditInputValue("");
    }
    setInputVisible(false);
  };
  const handleClose = (index) => {
    let tempData = tags;
    tempData.splice(index, 1);
    console.log("delete: ", tempData);
    setTags(tempData);
  };
  const uploadData = () => {
    let tag = tags.join("||%&");
    let data = {
      title: title,
      userId: user.id,
      content: content,
      tags: tag,
    };
    fetch("", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.code && json.code === 200) {
          message.success("Upload success! ");
          history.push("/home");
          return;
        } else {
          message.error("Upload failed!");
        }
      })
      .catch((err) =>
        message.error("Login failed! Something wrong with your network!")
      );
  };
  const addNewTag = () => {
    setInputVisible(true);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ alignSelf: "flex-start", marginLeft: "20vw" }}>Title </h2>
      <input
        className={"inputLogin"}
        placeholder="title"
        onChange={(e) => changeTitle(e)}
      />
      <h2
        style={{
          alignSelf: "flex-start",
          marginLeft: "20vw",
          marginTop: "5vh",
        }}
      >
        Tags
      </h2>
      <div style={{ width: "40vw" }}>
        {tags.map((tag, index) => {
          return (
            <Tag
              closable={true}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onClose={() => handleClose(index)}
            >
              <span style={{minWidth:'80%'}}>{tag}</span>
            </Tag>
          );
        })}
        {inputVisible && (
          <input
            autoFocus={true}
            onChange={(e) => handleEditInputChange(e)}
            onBlur={() => handleEditInputConfirm()}
            onPressEnter={() => handleEditInputConfirm()}
            style={{}}
          />
        )}
        <br />
        <button
          onClick={() => addNewTag()}
          disabled={tags.length > 5}
          style={{
            justifySelf: "flex-start",
            marginLeft: "0vw",
            marginTop: "2vh",
            width: "8rem",
            height: "2rem",
            backgroundColor: "red",
            color: "white",
            border: "none",
            outline: "none",
            borderRadius: "4px",
          }}
        >
          add a new tag
        </button>
      </div>
      <h2
        style={{
          alignSelf: "flex-start",
          marginLeft: "20vw",
          marginTop: "5vh",
        }}
      >
        Content
      </h2>
      <textarea
        style={{ width: "40vw", borderRadius: "5px", padding: "1rem" }}
        rows="5"
        cols="33"
        onChange={(e) => changeContent(e)}
      >
        It was a dark and stormy night...
      </textarea>
      <Buttons
        width="10rem"
        id="btn4_1"
        content="upload"
        onCLick={() => uploadData()}
      />
    </div>
  );
};

export default UploadQueue;

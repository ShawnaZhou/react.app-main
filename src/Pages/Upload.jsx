import React, { useState } from "react";
import { Upload, message, Popover, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const UploadPage = () => {
  const [uploading, setUploading] = useState(false);
  const user = sessionStorage.getItem('user');
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState({});
  const content = (
    <div>
      <p>You must choose one image!</p>
    </div>
  );
  const onChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file);
    }
    if (status === "done") {
      message.success(`${info.file.name} file add successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file add failed.`);
    }
  };
  const onDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };
  const uploadData = () => {
    let formdata = new FormData();
    // formdata.append("name", name);
    // formdata.append("msg", msg);
    formdata.append("userId",user.id);
    formdata.append("file", file);
    setUploading(true);
    fetch("http://127.0.0.1:8080/upload", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data;boundary=<calculated when request is sent>",
      },
      body: formdata,
    })
      .then((res) => {
        res.json();
        setUploading(false);
      })
      .then((json) => {
        console.log(json);
        if (json.code && json.code === 0) message.success("Post success!");
        else message.error("Post failed!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onRemove = () => {
    setFile({});
  };
  const beforeUpload = (file) => {
    setFile(file);
    console.log(file);
    return false;
  };
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        Width: "60vw",
        Height: "80vh",
      }}
    >
      <div>
        <h3> True name </h3>
        <input
          className={"inputLogin"}
          style={{ margin: 0 }}
          onChange={(value) => setName(value.target.value)}
          placeholder="TRUE NAME"
        />
      </div>
      <div style={{ margin: "5vh 0" }}>
        <h3>Messages</h3>
        <input
          className={"inputLogin"}
          style={{ margin: 0 }}
          onChange={(value) => {
            setMsg(value.target.value);
          }}
          placeholder="MSGS YOU WANT TO SAY"
        />
      </div>
      <div style={{ width: "40vw" ,height:'20vh'}}>
        <h3> Upload Avatar</h3>
        <Dragger
          onRemove={() => onRemove()}
          onChange={(info) => onChange(info)}
          onDrop={(e) => onDrop(e)}
          multiple={false}
          beforeUpload={(file) => beforeUpload(file)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. 
          </p>
        </Dragger>
      </div>

      <Popover
        placement="bottomLeft"
        style={{ backgroundColor: "#000" }}
        content={content}
        title="Tips"
      >
        <button
          style={{
            marginTop: "8vh",
            width: "10rem",
            height: "3rem",
          }}
          onClick={() => uploadData()}
          disabled={file.length === 0}
        >
          CONFIRM
        </button>
      </Popover>
      <Spin
        size="large"
        spinning={uploading}
        style={{ position: "absolute", left: "20vw", bottom: "18vh" }}
      />
    </div>
  );
};

export default UploadPage;

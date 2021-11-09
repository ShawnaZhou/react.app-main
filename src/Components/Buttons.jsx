// eslint-disable-this-file
import React from "react";
import "./Buttons.css";

const Buttons = (props) => {
  const id = props.id;
  return (
    <div style={{width:props.width,height:props.height}} onClick={()=>props.onClick()}>

      <a id={id} href="javascript:void(0)" className={'btnInUsed'}>
        {props.content}
      </a>
    </div>
  );
};

export default Buttons;

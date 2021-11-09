import React, { useState, useEffect } from "react";
import img1 from "../assets/mainBack.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import "./Background.css";
import { useLocation } from "react-router-dom";

const Background = () => {
  const { pathname } = useLocation();
  const [img, setImg] = useState(img1);
  const imgList = [img1, img2, img3];
  useEffect(() => {
    console.log("routed!");
    updateSetting();
  }, [pathname]);

  const updateSetting = () => {
      console.log('item: ',sessionStorage.getItem("backgroundImgId"));
    if (!sessionStorage.getItem("backgroundImgId")) {
      sessionStorage.setItem("backgroundImgId", 0);
      console.log('initial');
      return;
    }
    else{
        let tempId = Number(sessionStorage.getItem("backgroundImgId"));
        sessionStorage.removeItem('backgroundImgId');
        console.log('tempId1',tempId);
        ++tempId;
        if (tempId > 2) tempId = 0;
        console.log("tempIdEdited:", tempId);
        setImg(imgList[tempId]);
        sessionStorage.setItem("backgroundImgId", tempId);
        console.log('tempId2',sessionStorage.getItem("backgroundImgId"))
        return ;
    }
  };

  return <img  src={img} id="contentBack" />;
};

export default Background;

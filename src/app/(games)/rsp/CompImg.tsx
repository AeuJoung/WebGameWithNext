"use client"

import { KeyboardEvent, useRef, useState } from "react";
import Image from "next/image";
import styles from "./game.module.css"
  
const comImg = [
  '/rsp_rock.png',
  '/rsp_si.png',
  '/rsp_paper.png'
];

export default function Page({imgNum} : {imgNum : number}) {
  return (
    <div><Image src={comImg[imgNum]} alt="" width={300} height={300}/></div>
  );
}
"use client"

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./game.module.css"
import CompImg from "./CompImg";

const imgs = [
   '/rsp_rock.png',
   '/rsp_si.png',
   '/rsp_paper.png'
];

const kindOfRSP = {
  r : 0,
  s : 1,
  p : 2
}

export default function Page() {
  const [count, setCount] = useState<number>(0);
  const [toggle, setToggle] = useState<Boolean>(true);
  const [yourHand, setYourHand] = useState<number>(kindOfRSP.p);
  const [result, setResult] = useState<string>("?");
  const timer = useRef<NodeJS.Timeout>();

  useEffect(()=>{
    timer.current = setInterval(()=>{
      if (count>=2) setCount(0);
      else setCount(count+1);
    }, 80);
    return ()=>{
      clearTimeout(timer.current);
    }
  },[count, toggle]);

  const runEvent = (num : number) => {
      clearTimeout(timer.current);
      let subResult="";
      if (count==num) subResult="무승부!";
      else {
        if (count==kindOfRSP.r) {
          if (num==kindOfRSP.s) subResult="오너의 승리!";
          else subResult="당신의 승리";
        } else if (count==kindOfRSP.s) {
          if (num==kindOfRSP.r) subResult="당신의 승리!"
          else subResult="오너의 승리!"
        } else {
          if (num==kindOfRSP.r) subResult="오너의 승리!"
          else subResult="당신의 승리!"
        }
      }

      setResult(subResult);
      setYourHand(num);
  }

  const onClickEvent = (e: React.MouseEvent<HTMLElement>, num : number) => {
      e.preventDefault();
      runEvent(num);
  }

  const restartEvent = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();

      setCount(0);
      setYourHand(kindOfRSP.p);
      setResult("?");
      setToggle(!toggle);
  }

  return (
      <section className={styles.gameBoard}>
        <section className={styles.rspBoard}>
          <section>
                <label>Me</label>
                <CompImg imgNum={count}/>
            </section>
            <div>VS</div>
            <section>
                <label>You</label>
                <div><Image src={imgs[yourHand]} alt="" width={300} height={300}/></div>
            </section>
        </section>
          <section className={styles.resultBoard}>
            <span>{result}</span>
            {result=="?" || <button onClick={restartEvent}>재시작!</button>}
            {result!="?" ||
              <div>
                <button onClick={(e)=>{onClickEvent(e, kindOfRSP.s)}}>가위</button>
                <button onClick={(e)=>{onClickEvent(e, kindOfRSP.r)}}>바위</button>
                <button onClick={(e)=>{onClickEvent(e, kindOfRSP.p)}}>보</button>
              </div>
            }
          </section>
      </section>
  );
}
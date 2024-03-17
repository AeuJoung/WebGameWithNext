"use client"

import { useEffect, useRef, useState } from "react";
import styles from "./game.module.css"
import Ul from "./Ul";

const makenum = () => {
  let nums = [];
  for (let i=0 ; i<7 ; i++) {
    nums.push(Math.floor(Math.random()*45)+1);
  }
  return nums;
}

export default function Page() {
{
  return (<></>)
  /*
  const [numbers, setNumbers] = useState<number[][]>([]);
  const [toggle, setToggle] = useState<Boolean>(true);
  const [result, setResult] = useState<string>("번호 추첨 중...");
  const [count, setCount] = useState<number>(0);
  const timer = useRef<NodeJS.Timeout>();
  const timerout = useRef<NodeJS.Timeout>();

  useEffect(()=>{
    timer.current= setInterval(()=>{
      console.log(count);
      setCount(count+1);
    }, 1000);

    return ()=>{ 
      clearInterval(timer.current);
    }
  }, [count, toggle])

  useEffect(()=>{
    timerout.current = setTimeout(()=>{
      clearInterval(timer.current);
    }, 7100);

    return ()=>{ 
      clearTimeout(timerout.current);
    }
  }, [toggle])


  const runEvent = () => {
    clearInterval(timer.current);
    clearTimeout(timerout.current);

    let lists = numbers;
    numbers.push(makenum());

    
    setToggle(!toggle);
    setCount(0);
    setNumbers(lists);
  } 

  const onClickEvent = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      runEvent();
  }

  const restartEvent = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
  }

  return (
      <section className={styles.gameBoard}>
        <div className={styles.numberBox}>
           {numbers.map((v, i)=><Ul value={v} key={i} />)}
        </div>
        <div>
          <button onClick={onClickEvent}>다음 세트</button>
          <button onClick={restartEvent}>다시 뽑기</button>
        </div>
      </section>
  );
  */}
}
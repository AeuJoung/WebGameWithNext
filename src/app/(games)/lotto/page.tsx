"use client"

import { useEffect, useState, useRef, MouseEvent } from "react";
import styles from "./game.module.css"
import DisplayArrayUl from "./Ul";
import CurrentArrayUl from "./Li";

export default function Page() {
  const [round, setRound] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [numArray, setNumArray] = useState<number[][]>([[]]);
  const [currendArray, setCurrentArray] = useState<number[]>([]);
  const [currendDisplayArray, setCurrendDisplayArray] = useState<number[]>([]);
  const timeInterval = useRef<NodeJS.Timeout>();
  const timer = useRef<NodeJS.Timeout>();

  useEffect(()=>{
    if (startTimer) {
      timeInterval.current = setInterval(()=>{
          let newNums = [... currendDisplayArray];
          console.log(count);
          if (count<7) {
            newNums.push(currendArray[count]);
            setCurrendDisplayArray(newNums);
            setCount((prev)=>prev+1);
          } else {
            clearInterval(timeInterval.current);
          }
      }, 1000);
    } else {
      clearInterval(timeInterval.current);  
    }
    return ()=>{
      clearInterval(timeInterval.current);
    }
  });

  
  useEffect(()=>{
    if (startTimer) {
      timer.current = setTimeout(()=>{
        let newNums = [... currendDisplayArray];
        newNums.push(currendArray[count]);
        setCurrendDisplayArray(newNums);
        setStartTimer(false);
        setCount(0);
      }, 9000);
    } else {
      clearTimeout(timer.current);
    }
    return ()=>{
      clearTimeout(timer.current);
    }
  }, [startTimer]);
  

  const pickNumber = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let allNums = new Array(45).fill(0).map((v, i)=>i+1);
    let newNums = [];
    for (let i=0 ; i<7 ; i++) {
      let pickIndex = Math.floor(Math.random()*allNums.length);
      newNums.push(allNums.splice(pickIndex, 1)[0]);
    }

    setCurrentArray(newNums);
    setStartTimer(true);
  }

  return (
      <section className={styles.gameBoard}>
        <label>라운드 : {round} / 7</label>
        <section className={styles.disPlayNumber}>
          <DisplayArrayUl ulData={numArray} />
          <ul><CurrentArrayUl listData={currendDisplayArray} /></ul>
        </section>

        <section className={styles.controlArea}>
          <button onClick={pickNumber}>다음 뽑기</button>
          <button>재시작</button>
        </section>

      </section>
  );
}
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
  const [gameStart, setGameStart] = useState<boolean>(true);

  useEffect(()=>{
    if (startTimer) {
      timeInterval.current = setInterval(()=>{
          let newNums = [... currendDisplayArray];
          if (count<6) {
            newNums.push(currendArray[count]);
            setCurrendDisplayArray(newNums);
            setCount((prev)=>prev+1);
          } else {
            timer.current=setTimeout(()=>{
              let isContinue = true;
              if (round==7) isContinue=false;

              newNums.push(currendArray[count]);
              let storedArray = [... numArray];
              storedArray.push(newNums);
              setCount(0);
              setGameStart(isContinue);
              setCurrendDisplayArray([]); //배열과 카운트 비우기
              setStartTimer(false); //타이머 멈추기
              setNumArray(storedArray); // 누적 배열에 저장
            },1500);
            clearInterval(timeInterval.current);
          }
      }, 1000);
    } else {
      clearInterval(timeInterval.current); 
      clearInterval(timer.current);  
    }
    return ()=>{
      clearInterval(timeInterval.current);
      clearInterval(timer.current); 
    }
  });


  const pickNumber = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let allNums = new Array(45).fill(0).map((v, i)=>i+1);
    let newNums = [];
    for (let i=0 ; i<7 ; i++) {
      let pickIndex = Math.floor(Math.random()*allNums.length);
      newNums.push(allNums.splice(pickIndex, 1)[0]);
    }

    setGameStart(true);
    setRound((prev)=>prev+1);
    setCurrentArray(newNums);
    setStartTimer(true);
  }

  const pickSkip = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault();

    let isContinue = true;
    if (round==7) isContinue=false;
    
    let storedArray = [... numArray];
    storedArray.push(currendArray);
    setGameStart(isContinue);
    setCount(0);
    setCurrendDisplayArray([]); //배열과 카운트 비우기
    setStartTimer(false); //타이머 멈추기
    setNumArray(storedArray); // 누적 배열에 저장
  }

  const restartButton = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setGameStart(true);
    setRound(0);
    setCount(0);
    setStartTimer(false);
    setNumArray([[]]);
    setCurrentArray([]);
    setCurrendDisplayArray([]);
  }

  return (
      <section className={styles.gameBoard}>
        <label>라운드 : {round} / 7</label>
        <section className={styles.disPlayNumber}>
          <DisplayArrayUl ulData={numArray} />
          <ul><CurrentArrayUl listData={currendDisplayArray} /></ul>
        </section>

        <section className={styles.controlArea}>
          {startTimer || gameStart && <button onClick={pickNumber}>다음 뽑기</button>}
          {startTimer && <button onClick={pickSkip}>SKIP</button> }
          {gameStart || <p>기회를 모두 소진하셨습니다.</p> }
          <button onClick={restartButton}>재시작</button>
        </section>

      </section>
  );
}
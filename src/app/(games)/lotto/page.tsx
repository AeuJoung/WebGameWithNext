"use client"

import { useRef, useState, MouseEvent, useEffect } from "react";
import styles from "./game.module.css"

const makeNumber = () => {
  let newArray = [];
  for (let i=0 ; i<8 ; i++) {
    newArray.push(Math.floor(Math.random()*45)+1);
  }

  return newArray;
}

export default function Page() {
  const [displayArray, setDisplayArray] = useState<number[][]>([]);
  const [curArray, setCurArray] = useState<number[]>([]);
  const [stage, setStage] = useState<number>(0)
  const [gameState, setGameState] = useState<boolean>(false);
  const numBuffer = useRef<number[]>([]);
  const timeout = useRef<NodeJS.Timeout>();
  const interval = useRef<NodeJS.Timeout>();


  useEffect(()=>{
    if (stage!=0 && curArray.length<7) {
      numBuffer.current = makeNumber();

      let newArray : number[] = [... curArray];
  
      interval.current = setInterval(()=>{
        console.log(numBuffer.current[0])
        newArray.push(numBuffer.current.shift());
        setCurArray([... newArray]);
      }, 1000);
  
      timeout.current = setTimeout(() => {
        clearInterval(interval.current);
  
        console.log(numBuffer.current[0])
        newArray.push(numBuffer.current.shift());
        
        let fullArray = [... displayArray];
        fullArray.push(curArray);
        console.log(fullArray);

        setCurArray([... newArray]);
        setDisplayArray(fullArray)
      }, 6500);
    }

    return ()=>{
      clearTimeout(timeout.current);
      clearInterval(interval.current);
    }
  }, [stage, curArray, displayArray])

  const onNextButtonEvent = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setCurArray([]);
    setStage(stage+1);
  }
  
  return (
    <section className={styles.gameBoard}>
      <label>{stage}/7 Round</label>
      <section className={styles.displayNumber}>
        
        {displayArray.map((v, i)=> {
          return <ul key={i}>{v.map((vv, ii)=> {
            return <li className={styles.list} key={ii}>{vv}</li>
          })}</ul>
        })}

        <ul>{curArray.map((v, i)=> {
            return <li className={styles.list} key={i}>{v}</li>
        })}</ul>

        <ul>
          <li className={styles.list}>12</li>
          <li className={styles.list}>12</li>
          <li className={styles.list}>12</li>
          <li className={styles.list}>12</li>
        </ul>
        <ul>
          <li className={styles.list}>13</li>
          <li className={styles.list}>13</li>
          <li className={styles.list}>13</li>
          <li className={styles.list}>13</li>
        </ul>
      </section>
      <section>
        <button onClick={onNextButtonEvent}>다음 뽑기</button>
        <button>재시작</button>
      </section>    
    </section>
  );
}
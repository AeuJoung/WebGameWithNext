"use client"

import { KeyboardEvent, useRef, useState } from "react";
import styles from "./game.module.css"


const makeNum = () => {
    return Math.floor(Math.random()*9)+1;
  }
  
export default function Page() {
const [sword, setSword] = useState<string | undefined>("리액트");
const [cword, setCword] = useState<string>("");
const [count, setCount] = useState<number>(0);
const [result, setResult] = useState<string>("");
const answerBox = useRef<HTMLInputElement>(null);

const onChangeEvent = (e : React.ChangeEvent<HTMLInputElement>) => {
    setCword(e.target.value);
}

const runEvent = () => {
  let answer = answerBox.current?.value[0];
  if (answer==sword?.at(-1)) {
    setSword(answerBox.current?.value);
    setCount(count+1);
    setResult("정답!");
  } else {
    setCount(0);
    setResult("틀렸어요");
  }
  setCword("");
}

const onSubmitEvent = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    runEvent();
}

const keypress = (e : KeyboardEvent<HTMLInputElement>) => {
  if (e.key=="Enter" && !e.nativeEvent.isComposing) 
  {
    e.preventDefault();
    runEvent();
  }
}

return (
    <section className={styles.gameBoard}>
        <section>
          <div>
            <label className={styles.ansCount}>COMBO : {count}</label>
            <label className={styles.result}>{result}</label>
          </div>
          <div>
            <label>{sword}</label>
            <input type="text" onChange={onChangeEvent} value={cword} ref={answerBox} onKeyDown={keypress}/>
            <input type="submit" onClick={onSubmitEvent} value="입력!" />
          </div>
        </section>
    </section>
);
}
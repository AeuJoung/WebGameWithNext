"use client"

import { useRef, useState } from "react";
import styles from "@/app/(games)/gugudan/game.module.css"


const makeNum = () => {
    return Math.floor(Math.random()*9)+1;
  }
  
export default function GameBoard() {
const [num1, setNum1] = useState<number>(makeNum);
const [num2, setNum2] = useState<number>(makeNum);
const [answer, setAnswer] = useState<number>(num1*num2);
const [result, setResult] = useState<string>("ㅎㅎ");
const [wanswer, setSAnswer] = useState<string>("");
const answerBox = useRef<HTMLInputElement>(null);

const onChangeEvent = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSAnswer(e.target.value);
}

const onSubmitEvent = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    
    if (answerBox.current?.value==answer.toString()) {
        setResult("정답!");
        let a=makeNum(), b=makeNum();
        let c=a*b;
        setNum1(a);
        setNum2(b);
        setAnswer(c);
    } else {
        setResult("오답!");
    }
}

return (
    <section className={styles.gameBoard}>
        <section>
            <label>{num1.toString()}</label>
            <label>X</label>
            <label>{num2.toString()}</label>
            <label>= ?</label>
        </section>
        <section>
            <label>{result}</label>
            <input type="text" ref={answerBox} onChange={onChangeEvent}/>
            <input type="submit" value="답 입력" onClick={onSubmitEvent}/>
        </section>
    </section>
);
}
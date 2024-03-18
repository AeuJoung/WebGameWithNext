"use client"

import { useRef, useState, KeyboardEvent, useEffect } from "react";
import styles from "./game.module.css"
import Tr from "./Tr";


const states = {
  same : 1,
  kindOf : 0,
  def : -1,
}

const makeNum = () => {
    let number = [];
    for (let i=0 ; i<6 ; i++) {
      number.push(Math.floor(Math.random()*9)+1);
    } 
    return number;
  }

  export default function Page() {
  const [answerList, setAnserList] = useState<number[][][]>([]);
  const [count, setCount] = useState<number>(0);
  const [state, setState] = useState<boolean>(true);
  const [userAns, setUserAns] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [comAns, setComAns] = useState<number[]>([])
  const answerBox = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setComAns(makeNum());
    return ()=>{}
  }, []);

  useEffect(()=>{
    if (answerList.length==6) {
      let countt =0;
      for (let i=0 ; i<6 ; i++) {
          if (answerList[5][i][1] == states.same) countt++;
      }
      if (countt==6) setResult("정답!");
      else setResult("실패ㅠㅠ");
    }
    return ()=>{}
  }, [count]);


  const onChangeEvent = (e : React.ChangeEvent<HTMLInputElement>) => {
      setUserAns(e.target.value);
  }

  const runEvent = () => {
    let currentState = answerList;
    let uAns = answerBox.current?.value;
    if (uAns?.length) {
      if (uAns.length != 6) {
        setState(false);
      } else {
        let makeList : number[][] = new Array(6);
        for (let i=0 ; i<6 ; i++) {
          if (Number(uAns[i]) == comAns[i]) makeList[i]=[Number(uAns[i]), states.same];
          else if (comAns.includes(Number(uAns[i]))) makeList[i]=[Number(uAns[i]), states.kindOf];
          else makeList[i]=[Number(uAns[i]), states.def];
        }

        currentState.push(makeList);
        setCount(count+1);
        setState(true);
        setAnserList(currentState);
      }
    } else {
      setState(false); //입력 잘못됐다는 뜻
    }
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

  const reStartEvent = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setAnserList([]);
    setCount(0);
    setState(false);
    setUserAns("");
    setResult(null);
    setComAns(makeNum());
  }

  return (
      <section className={styles.gameBoard}>
          <section>
            <label>{comAns.toString()}</label>
            <table>
              <tbody>
                {answerList.map((v, i)=><Tr line={v} key={i} />)}
              </tbody>
            </table>
            <div>{result}</div>
            {(result==null) && <input className={state ? "" : styles.keyBox} type="text" value={userAns} ref={answerBox} onChange={onChangeEvent} onKeyDown={keypress} /> }
            {(result==null) && <input className="answerButton" type="submit" value="입력" onClick={onSubmitEvent} />}
            {(result!=null) && <input className="restartButton" type="submit" value="재시작" onClick={reStartEvent} />}
          </section>
      </section>
  );
}
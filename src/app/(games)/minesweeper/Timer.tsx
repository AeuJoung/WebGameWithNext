import { useEffect, useState, useRef } from "react";

export default function Timer({state} : {state : string}) {
    const [count, setCount] = useState<number>(0);
    const timer = useRef<NodeJS.Timeout>();
    
    useEffect(()=>{
        console.log(count);
        if (state=="시작") {
            timer.current = setInterval(()=>{
                setCount(count+1);
            }, 1000);   
        } else {
            clearInterval(timer.current);
        }
        return ()=>{
            clearInterval(timer.current);
        };
    }, [count, state])
    
    return <label>소요 시간 : {count}</label>
}
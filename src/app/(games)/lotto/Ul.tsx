import Li from "./Li";
import CurrentArrayUl from "./Li";
import styles from "./game.module.css"



export default function Ul({ulData} : {ulData : number[][]}) {
    return <ul className={styles.numberList}>
        {ulData.map((v, i)=><Li listData={v} key={i}/>)}
    </ul>
}
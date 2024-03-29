import React from "react"
import styles from "./game.module.css"

function Li({listData} : {listData : number[]}) {
    return (<>
    {listData.map((v, i)=><li className={styles.listStyle} key={i}>{v}</li>)}
    </>    
    )  
}

export default React.memo(Li)
import React from "react";
import Li from "./Li";
import styles from "./game.module.css"



function Ul({ulData} : {ulData : number[][]}) {
    return (
        <>
        {ulData.map((v, i)=><ul key={i}><Li listData={v}/></ul>)}
        </>
    );

}

export default React.memo(Ul)
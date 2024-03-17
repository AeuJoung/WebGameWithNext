"use client"

import React from "react";
import styles from "./game.module.css"

interface propsType {
    line : number[][];
}

let classNames = [styles.def, styles.kindOf, styles.same];

const Tr = ({line} : propsType) => {
    console.log(line);
    return (
        <tr>
            {line.map((v, i)=><td className={classNames[v[1]+1]} key={i}>{v[0]}</td>)}
        </tr>
    );
}

export default React.memo(Tr);
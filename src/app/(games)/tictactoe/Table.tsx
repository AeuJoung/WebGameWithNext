import React from "react";
import Tr from "./Tr";

function Table({gameData} : {gameData : number[][]}) {
    return (
        <table>
            <tbody>
                {gameData.map((v, i)=><Tr rowData={v} rowIndex={i} key={i}/>)} 
            </tbody>
        </table>
    );
}

export default React.memo(Table);
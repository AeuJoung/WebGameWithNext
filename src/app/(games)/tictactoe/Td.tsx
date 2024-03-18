import { useContext, useState, useMemo } from "react";
import { GameContext, actionName} from "./page"
import styles from "./game.module.css"
import React from "react";
 
function Td({cellData, cellIndex} : {cellData : number, cellIndex : number[]}) {
    const [checkClcik, setCheckClick] = useState<boolean>(false);
    const dispatch = useContext(GameContext);

    const styless = [styles.cell, styles.clicked];

    const onTdEvent = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!checkClcik) {
            if (dispatch) dispatch({type : actionName.WRITENUMBER, cellpos : cellIndex});
                
            setCheckClick(true);
        }
    }

    return (
        <td className={(checkClcik) ? styless.join(' ') : styles.cell} width={50} height={50} onClick={onTdEvent}>{cellData==-1 ? "" : (cellData==0 ? "O" : "X")}</td>
    );
}

export default React.memo(Td);
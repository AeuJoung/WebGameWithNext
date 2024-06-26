import { useContext, MouseEvent } from "react";
import { numState, actionName, ContextType, TableContext } from "./interface"
import styles from './game.module.css'

const styleList = [styles.openCell, styles.questCell, styles.flagCell, styles.mineCell]

export default function Td({colData, cellIndex} : {colData : number, cellIndex : number[]}) {
    const tableContext : ContextType | undefined = useContext(TableContext);
    const gameboard = tableContext?.gameBoard;
    const [x, y] = cellIndex;

    const leftClick = (e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log("이것은 td 버튼")
        if (colData!=numState.open && colData!=numState.flag) { //이미 클릭한 칸과 플래그 칸은 클릭 금지
        
            if (tableContext) tableContext.dispatch({type :actionName.OPENBOX, pos : {x : x, y : y}});
        }
    }

    const rightClick = (e : MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (colData!=numState.open){
            if (tableContext) tableContext.dispatch({type :actionName.RIGHTCLICK, pos : {x : x, y : y}});
        }
    }

    return (
        <td className={[styles.td, styleList[colData+4]].join(' ')} onClick={leftClick} onContextMenu={rightClick}>{(gameboard) ? gameboard[x][y] : -10}</td>
    );
}
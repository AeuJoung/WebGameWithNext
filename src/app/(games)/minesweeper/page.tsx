"use client"

import { Dispatch, MouseEvent, useReducer, createContext, useEffect, useRef } from "react";
import styles from "./game.module.css"
import { stateInit, numState, stateType, actionType, actionName } from "./static"
import Table from "./Table";
import Timer from "./Timer";

const minesMode = [0, 8, 17, 35];
const sizeMode = [0, 8, 12, 18];

const makeGameBoard = (size : number, nom : number) => {
  //게임판 만들고 숫자 채워넣기

  let gamepan = new Array(size).fill(0).map((v, i)=>new Array(size).fill(0));
  let numsGroup = new Array(size*size).fill(0).map((v, i)=>i);
  //console.log(numsGroup)
  for (let i=0 ; i<nom ; i++) {
    let randNum = numsGroup.splice(Math.floor(Math.random()*numsGroup.length), 1);
    let [x, y] = [0, 0];
    if (randNum[0]!=0) [x, y] = [randNum[0]%size, Math.floor(randNum[0]/size)];
    gamepan[x][y] = numState.mine;

    let rows = [-1, 0, 1];
    let cols = [-1, 0, 1];

    for (let r=0 ; r<rows.length ; r++) {
      for (let c=0 ; c<cols.length ; c++) { 
        if (x+rows[r]>=0 && x+rows[r]<size && y+cols[c]>=0 && y+cols[c]<size) {
          if (!(gamepan[x+rows[r]][y+cols[c]]==numState.mine)) gamepan[x+rows[r]][y+cols[c]]++; 
        }
      }
    }
  }

  return gamepan;
}


const reducer = (state : stateType, action : actionType) : stateType => {
  switch(action.type) {
    case actionName.GAMESTART : {
      if (action.mode==undefined) return state;
      let numofmines = minesMode[action.mode];
      let mapSize = sizeMode[action.mode];
      let gameBoard = makeGameBoard(mapSize, numofmines);
      
      return {
        ...state,
        gameMode : action.mode,
        numOfMine : numofmines,
        gameBoard : gameBoard,
        playBoard : new Array(mapSize).fill(0).map((v,i)=>new Array(mapSize).fill(0)),
        gameState : "시작"
      };
    }
    case actionName.OPENBOX : {
        if (action.pos==undefined) return state;
        let pos = action.pos;
        let newBoard = [... state.playBoard];
        if (state.gameBoard[pos.x][pos.y]==numState.mine) {
          //지뢰 터트려서 게임 종료

          for (let i=0 ; i<newBoard.length ; i++) {
            for (let j=0 ; j<newBoard.length ; j++) {
              if (state.gameBoard[i][j]==numState.mine) newBoard[i][j]=numState.mine; 
            }
          }
          
          return {
            ...state,
            playBoard : newBoard,
            result : "펑!",
            gameState : "종료"
          }
        } else if (state.gameBoard[pos.x][pos.y]>numState.normal) {
          //숫자칸이라면 숫자칸만 열기

          newBoard[pos.x][pos.y]=numState.open;
          console.log("숫자칸 업뎃")
          return {
            ...state,
            playBoard : newBoard
          }
        } else {
          //빈칸이라면 빈칸과 주변 숫자 확 열기

          newBoard[pos.x][pos.y]=numState.open;
          console.log("빈칸 업뎃")
          return {
            ...state,
            playBoard : newBoard
          }
        }
    }
    case actionName.RIGHTCLICK : { 
        if (action.pos==undefined) return state;
        let pos = action.pos;
        let newBoard = [... state.playBoard];
        if (newBoard[pos.x][pos.y]==numState.flag) {
          newBoard[pos.x][pos.y] = numState.question;
        } else if (newBoard[pos.x][pos.y]==numState.question) {
          newBoard[pos.x][pos.y] = numState.normal;
        } 
        else {
          newBoard[pos.x][pos.y] = numState.flag
        }

        return {
          ...state,
          playBoard : newBoard
        }
    }
    case actionName.RESTART : {
        return {
          ...stateInit
        }
    }
    default : return state;
  }
}

export interface ContextType {
  gameBoard : number[][];
  dispatch : Dispatch<actionType>;
}

export const TableContext = createContext<ContextType | null>(null);

export default function Page() {
  const [state, dispatch] = useReducer(reducer, stateInit);

  const selectModeButton = (e : MouseEvent<HTMLElement>, mode : number) => {
    e.preventDefault();

    dispatch({type : actionName.GAMESTART, mode : mode});
  }

  const restartEvent = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault();
    
    dispatch({type : actionName.RESTART})
  }

  const gameCheck = (e : MouseEvent<HTMLElement>) =>{
    e.preventDefault();
    if (state.gameState=="종료") e.stopPropagation();
  }

  const contextValue = {
    gameBoard : state.gameBoard,
    dispatch : dispatch
  }

  return (
    <section className={styles.gameBoard}>
      { state.gameState=="시작전" ?   
        <section className={styles.gameSelect}>
          <div className={styles.modeBox} onClick={(e)=>selectModeButton(e, 1)}>초급</div>
          <div className={styles.modeBox} onClick={(e)=>selectModeButton(e, 2)}>중급</div>
          <div className={styles.modeBox} onClick={(e)=>selectModeButton(e, 3)}>고급</div>
        </section>
          :
        <>
        <section className={styles.gameData}>
          <label>지뢰 수 : {minesMode[state.gameMode]}</label>
          <Timer state={state.gameState}/>
        </section>
      
        <section className={styles.gameTable} onClickCapture={gameCheck}>
          <TableContext.Provider value={contextValue}>
            <Table tableData={state.playBoard} />
          </TableContext.Provider>          
        </section>
        <section>
          <button onClick={restartEvent}>재시작</button>
        </section>
        </>
        }
    </section>
  );
}

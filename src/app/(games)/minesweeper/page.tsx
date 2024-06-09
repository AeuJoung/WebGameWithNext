"use client"

import { MouseEvent, useReducer} from "react";
import styles from "./game.module.css"
import { stateInit, numState, stateType, actionType, actionName, ContextType, TableContext } from "./interface"
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


const isWinning = (state : stateType ,newBoard : number[][]) : boolean =>{
  let count = 0;
  for (let i=0 ; i<newBoard.length ; i++) {
    for (let j=0 ; j<newBoard[0].length ; j++) {
      if (newBoard[i][j]==numState.open) count++;
    }
  }

  if (count==sizeMode[state.gameMode]*sizeMode[state.gameMode]-minesMode[state.gameMode]) return true
  else return false;
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

          if (isWinning(state, newBoard)) {
            return {
              ...state,
              playBoard : newBoard,
              result : "성공!",
              gameState : "종료"
            }
          } else {
            return {
              ...state,
              playBoard : newBoard
            }
          }
        } else {
          //빈칸이라면 빈칸과 주변 숫자 확 열기
          
          let checkArray = [];
          checkArray.push([pos.x, pos.y]);
          newBoard[pos.x][pos.y] = numState.open;

          let operX = [-1, 0, 1];
          let operY = [-1, 0, 1];

          while(checkArray.length>0 && checkArray) {
            let [cx, cy] : number[] = checkArray.splice(0, 1)[0];
            
            for (let i=0 ; i<operX.length ; i++) {
              for (let j=0 ; j<operY.length ; j++) {
                let [sx, sy] : number[] = [cx+operX[i], cy+operY[j]];
                if (sx>=0 && sx<newBoard.length && sy>=0 && sy<newBoard[0].length && newBoard[sx][sy]!=numState.open) {
                  if (state.gameBoard[sx][sy]>=numState.normal) {
                    if (state.gameBoard[sx][sy]==numState.normal) checkArray.push([sx, sy]);
                    newBoard[sx][sy] = numState.open;
                  } 
                }
              }
            }
            
          }

          if (isWinning(state, newBoard)) {
            return {
              ...state,
              playBoard : newBoard,
              result : "성공!",
              gameState : "종료"
            }
          } else {
            return {
              ...state,
              playBoard : newBoard
            }
          }
        }
    }
    case actionName.RIGHTCLICK : { 
        if (action.pos==undefined) return state;
        let pos = action.pos;
        let newBoard = [... state.playBoard];
        let flagPoint = 0;
        if (newBoard[pos.x][pos.y]==numState.flag) {
          newBoard[pos.x][pos.y] = numState.question;
          flagPoint=-1;
        } else if (newBoard[pos.x][pos.y]==numState.question) {
          newBoard[pos.x][pos.y] = numState.normal;
        } 
        else {
          newBoard[pos.x][pos.y] = numState.flag
          flagPoint = 1;
        }

        return {
          ...state,
          numOfFlag : state.numOfFlag+flagPoint,
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

  const contextValue : ContextType = {
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
          <label>총 지뢰 수 : {minesMode[state.gameMode]}</label>
          <label>남은 지뢰 수 : {minesMode[state.gameMode]-state.numOfFlag}</label>
          <Timer state={state.gameState}/>
        </section>
      
        <section className={styles.gameTable} onClickCapture={gameCheck} onContextMenuCapture={gameCheck}>
          <TableContext.Provider value={contextValue}>
            <Table tableData={state.playBoard} />
          </TableContext.Provider>          
        </section>
        <section>
          <h5>{state.result}</h5>
          <button onClick={restartEvent}>재시작</button>
        </section>
        </>
        }
    </section>
  );
}

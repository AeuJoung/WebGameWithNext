"use client"

import Image from "next/image";
import styles from "./game.module.css"
import { useEffect, useReducer } from "react";
import Table from "./Table";
import { GameContext, actionName, actionType, initType } from "./gamecontext";

const oxIndex = {
  o : 0,
  x : 1
}

const user = {
  pc1 : "pc1",
  pc2 : "pc2"
}


const initData : initType = {
  turnUser : user.pc1,
  playBoard : new Array(3).fill(0).map(()=>new Array(3).fill(-1)),
  pc1Shape : oxIndex.o,
  pc2Shape : oxIndex.x,
  gameStart : false,
  count : 0,
  hasWinner : null
}


function reducer(state : initType, action : actionType) : initType {
  switch(action.type) {
    case actionName.a_gameStart : {
      if (action.shape==undefined) return state; 
      let pc2 = (action.shape==oxIndex.x) ? oxIndex.o : oxIndex.x;
      return {
        ...state, 
        gameStart : true,
        pc1Shape : action.shape,
        pc2Shape : pc2
      }
    }
    case actionName.WRITENUMBER : {
      if (action.cellpos==undefined) return state;
      let [x, y] = action.cellpos;
      let gamepan = [... state.playBoard];
      let writeNum = (state.turnUser==user.pc1) ? state.pc1Shape : state.pc2Shape;
      gamepan[x][y] = writeNum;

      let que=[];
      let check = new Array(3).fill(0).map(()=>new Array(3).fill(0));
      let checkDirect = new Array(3).fill(0).map(()=>new Array(3).fill(0).map(()=>[0, 0]));
      
      let isWinner=null;
      que.push([x, y]);
      check[x][y]=1;
      while(que.length>0) {
        let xy : number[] | undefined = que.pop();
        if (xy!=undefined) {
          let cx : number = xy[0];
          let cy : number = xy[1];
          
          let operx = [-1, 0, 1];
          let opery = [-1, 0, 1];
          for (let i=0 ; i<3 ; i++) {
            for (let j=0 ; j<3 ; j++) {
              let [ccx, ccy] = [cx+operx[i], cy+opery[j]];

              if (ccx>=0 && ccx<3 && ccy>=0 && ccy<3 && writeNum==gamepan[ccx][ccy] && check[ccx][ccy]==0) {
                if (cx==x && cy==y) {
                    checkDirect[ccx][ccy] = [operx[i], opery[j]];
                    que.push([ccx, ccy]);
                    check[ccx][ccy]=1;
                    check[ccx][ccy] += check[cx][cy];
                    if (check[ccx][ccy]==3) { isWinner=true; } 
                } else {
                  if (checkDirect[cx][cy][0]==operx[i] && checkDirect[cx][cy][1]==opery[j]) {
                    checkDirect[ccx][ccy] = [operx[i], opery[j]];
                    que.push([ccx, ccy]);
                    check[ccx][ccy]=1;
                    check[ccx][ccy] += check[cx][cy];
                    if (check[ccx][ccy]==3) { isWinner=true; } 
                  }
                }
              }
            }
          }
        }
      }

      if (isWinner==null && state.count<8) {
        return {
          ...state,
          count : state.count+1,
          playBoard : gamepan,
          turnUser : (state.turnUser=="pc1") ? user.pc2 : user.pc1
        }
      } else if (!isWinner && state.count==8) { //무승부
        return {
          ...state,
          hasWinner : false,
          playBoard : gamepan,
        }
      } else { //승패 갈렸음
        return {
          ...state,
          hasWinner : isWinner,
          playBoard : gamepan,
        }
      }
    }
    case actionName.a_restart : {
      return {
        ...initData,
        playBoard : new Array(3).fill(0).map(()=>new Array(3).fill(-1))
      };
    }
    default : return state;
  }
}


export default function Page() {
  const [state, dispatch] = useReducer(reducer, initData);

  useEffect(()=> {
    dispatch({type : actionName.a_restart});
  }, [])

  const selectOXEvent = (e : React.MouseEvent<HTMLElement>, shape : number) => {
      e.preventDefault();
      dispatch({type : actionName.a_gameStart, shape : shape});
  }

  const restartEvent = (e : React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      dispatch({type : actionName.a_restart});
  }

  if (!state.gameStart) {
    return (
      <section className={styles.gameBoard}>
        <section className={styles.selectOX}>
          <p>PC1이 사용할 말을 선택해주세요.</p>
          <span onClick={(e)=>selectOXEvent(e, oxIndex.o)}><Image className={styles.o} src="/o.png" width={200} height={200} alt="동그라미"/></span>
          <span onClick={(e)=>selectOXEvent(e, oxIndex.x)}><Image className={styles.x} src="/x.png" width={200} height={200} alt="액스"/></span>
        </section>
      </section>
    );
  } else {
    return (
      <section className={styles.gameBoard}>
          <section>
            <p>{state.turnUser}({(state.turnUser=="pc1") ? (state.pc1Shape ? "X" : "O") : (state.pc2Shape ? "X" : "O")})님의 차례입니다.</p>
            <GameContext.Provider value={dispatch}>
              <Table gameData={state.playBoard}/>
            </GameContext.Provider>
          </section>
          { state.hasWinner!=null && <div className={styles.whiteBox}></div> }
          <div className={styles.resultBox}>
            { state.hasWinner && <h4>{state.turnUser} 님의 승리!</h4> }
            { state.hasWinner==false && <h4>무승부</h4>}
            <div><button onClick={restartEvent}>게임 재시작</button></div>
          </div>

      </section>
    );
  }
}


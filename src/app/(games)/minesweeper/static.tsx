export const numState = {
    normal : 0,
    mine : -1,
    flag : -2,
    question : -3,
    open : -4
}

export type actionType = { type : string, mode? : number, pos? : {x : number, y:number} };

export const actionName = {
    GAMESTART : 'GAMESTART',
    OPENBOX : 'OPENBOX',
    RIGHTCLICK : 'RIGHTCLICK',
    RESTART : 'RESTART'
  }

export interface stateType {
    gameMode : number;
    numOfMine : number;

    gameBoard : number[][];
    playBoard : number[][];
    numOfFlag : number;
    result : string;
    gameState : string
} 

export const stateInit = {
    gameMode : 0,
    numOfMine : 0,

    numOfFlag : 0,
    gameBoard : [[]], //숫자, 지뢰 적힌 칸
    playBoard : [[]], //깃발, 오픈 데이터
    result : "",
    gameState : "시작전"   //시작전, 시작, 종료
  }
import { Dispatch, createContext } from "react";

export type actionType = { type : string, shape? : number, cellpos? : number[]};

export interface initType {
  turnUser : string;
  playBoard : number[][];
  pc1Shape : number;
  pc2Shape : number;
  gameStart : boolean;
  count : number;
  hasWinner : boolean | null;
}

export const GameContext = createContext<Dispatch<actionType> | null>(null);

export const actionName = {
    a_gameStart : 'gameStart',
    WRITENUMBER : 'WRITENUMBER',
    a_restart : 'RESTART',
  }
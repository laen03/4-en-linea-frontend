import { Cell } from "models";

export abstract class Rule {

    abstract getIsPlaying():boolean;

    abstract initRule(data:any):boolean;

    abstract onClick(board:Cell[][], cell:Cell, userId:number, updateFunction:any):boolean;

    abstract onEnter(board:Cell[][], cell:Cell, userId:number, updateFunction:any):boolean;

    abstract onLeave(board:Cell[][], cell:Cell, userId:number, updateFunction:any):boolean;

}
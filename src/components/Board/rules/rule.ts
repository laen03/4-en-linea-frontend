import { Cell } from "models";

export abstract class Rule {

    abstract onClick(board:Cell[][], cell:Cell, id:number):boolean;

    abstract onEnter(board:Cell[][], cell:Cell, id:number):boolean;

    abstract onLeave(board:Cell[][], cell:Cell, id:number):boolean;

}
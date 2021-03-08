import { Cell } from "models";
import { isGetAccessor } from "typescript";
import { Rule } from "./rule";

export class NLineRule implements Rule{

    private socket:any;

    constructor(socket:any){
        this.socket = socket;
    }
    
    public onEnter(board: Cell[][], cell:Cell, id:number): boolean {
        return false;
    }
    public onLeave(board: Cell[][], cell:Cell, id:number): boolean {
        return false;
    }

    public onClick(board: Cell[][], cell:Cell, id:number): boolean {
        var y = cell.y;
        for(var i = board.length-1; i >= 0;i--){
            const temp:Cell = board[i][y];
            if(temp.id ==0){
                board[i][y].id = id;
                this.socket.on("response", (data:any)=>{
                    console.log(data);
                });
                this.socket.emit('hello', {id:id, x:i, y:y})
                return true;
            }
        }      
        return false;
    }

}
import { Cell } from "models";
import { isGetAccessor } from "typescript";
import { Rule } from "./rule";

export class NLineRule implements Rule{

    private socket:any;

    constructor(socket:any){
        this.socket = socket;
        this.receiveData = this.receiveData.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    public initRule(data:any):boolean{
        this.socket.on('responseBoard', (response:any) => this.receiveData(response, data.updata))
        return true;
    }

    public onEnter(board: Cell[][], cell:Cell, userId:number, updateFunction:any): boolean {
        return false;
    }
    
    public onLeave(board: Cell[][], cell:Cell, userId:number, updateFunction:any): boolean {
        return false;
    }

    public onClick(board: Cell[][], cell:Cell, userId:number, updateFunction:any): boolean {
        var y = cell.y;
        for(var i = board.length-1; i >= 0;i--){
            const temp:Cell = board[i][y];
            if(temp.id ==0){
                this.sendData('boardMove',{id:userId,x:i,y:y});
                updateFunction(i,y,userId);
                return true;
            }
        }      
        return false;
    }

    public sendData(listener:string,data:any){
        this.socket.emit(listener,data);
    }

    public receiveData(data:any,updateBoard:any){
        updateBoard(data.x, data.y, data.id);
    }

}
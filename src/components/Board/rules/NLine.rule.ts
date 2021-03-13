import { Cell } from "models";
import { isGetAccessor } from "typescript";
import { Rule } from "./rule";

export class NLineRule implements Rule{

    private socket:any;
    private isPlaying:boolean;

    constructor(socket:any,isPlaying:boolean){
        this.socket = socket;
        this.isPlaying = isPlaying;
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
        if(this.isPlaying){
            var y = cell.y;
            this.isPlaying=false;
            for(var i = board.length-1; i >= 0;i--){
                const temp:Cell = board[i][y];
                if(temp.id ==0){
                    this.sendData('boardMove',{id:userId,x:i,y:y});
                    updateFunction(i,y,userId);
                    return true;
                }
            }      
        }
        return false;
    }

    public sendData(listener:string,data:any){
        this.socket.emit(listener,data);
    }

    public receiveData(data:any,updateBoard:any){
        this.isPlaying = true;
        updateBoard(data.x, data.y, data.id);
    }

}
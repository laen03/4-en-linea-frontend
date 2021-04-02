import { Cell } from "models";
import { isGetAccessor } from "typescript";
import { Rule } from "./rule";

export class NLineRule implements Rule{

    private socket:any;
    private isPlaying:boolean;
    private isPaused: boolean;
    private isLeave:boolean;

    constructor(socket:any, isPlaying:boolean, isPaused:boolean, isLeave:boolean){
        this.socket = socket;
        this.isPlaying = isPlaying;
        this.isPaused = isPaused;
        this.isLeave = isLeave;
        this.onClick = this.onClick.bind(this);
    }

    public setIsPlaying(state:boolean){
        this.isPlaying = state;
    }

    public getIsPlaying():boolean{
        return this.isPlaying;
    }

    public getIsPaused():boolean{
        return this.isPaused;
    }

    public pauseGame(): boolean{
        this.isPaused = !this.isPaused;
        this.sendData('pauseGame', this.isPaused)
        return true;
    }
    public leaveGame(leave:boolean): boolean{
        this.socket.close();
        return true;
    }


    public initRule(data:any):boolean{
        this.socket.on('responseBoard', (response:any) => {
            console.log(response)
            this.isPlaying = true;
            data.updata(response.x, response.y, response.id);
            data.startTimer();
        });
        this.socket.on("finishGameRoom",(response:any) => {
            this.isPlaying = false;
            data.onFinish(response)
        });
        this.socket.on('pauseGame', (response:any) => {
            this.isPaused = response;
        });
        this.socket.on('leaveGame', (response:any) => {
            this.isPaused = response;
        });
        return true;
    }

    public onEnter(board: Cell[][], cell:Cell, userId:number, updateFunction:any): boolean {
        var y = cell.y;
        for(var i = board.length-1; i >= 0;i--){
            const temp:Cell = board[i][y];
            if(temp.id == 0 || temp.ghost){
                updateFunction(i,y,userId,true);
                return true;
            }
        }    
        return false;
    }
    
    public onLeave(board: Cell[][], cell:Cell, userId:number, updateFunction:any): boolean {
        var y = cell.y;
        for(var i = board.length-1; i >= 0;i--){
            const temp:Cell = board[i][y];
            if(temp.id == 0 || temp.ghost){
                updateFunction(i,y,0,false);
                return true;
            }
        }    
        return false;
    }

    public onClick(board: Cell[][], cell:Cell, userId:number, updateFunction:any): boolean {
        if(this.isPlaying && !this.isPaused && !this.isLeave){
            var y = cell.y;
            this.isPlaying=false;
            for(var i = board.length-1; i >= 0;i--){
                const temp:Cell = board[i][y];
                if(temp.id == 0 || temp.ghost){
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
}
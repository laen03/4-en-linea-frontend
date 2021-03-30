import { Component } from 'react';
import { Cell } from '../../models';
import { CellComponent } from './Cell.component';
import { Rule } from './rules';
import style from './Board.module.css';
const crono = require('proyecto-2c-crono');

interface prop {
    board: Cell[][],
    player1: {
        id: number,
        color: string,
        username: string,
        picture: string,
        win:boolean
    },
    player2: {
        id: number,
        color: string,
        username: string,
        picture: string,
        win:boolean
    },
    gameRule: Rule,
    matchTime:number,
    onFinish:any
}

interface state {
    board: Cell[][],
    timer:string
}

export class Board extends Component<prop> {

    public state: state;

    constructor(props: any) {
        super(props);
        this.state = {
            board: this.props.board,
            timer:''
        };

        if(this.props.gameRule.getIsPlaying()){
            this.startTimer();
        }

        this.props.gameRule.initRule({
            updata: this.update,
            startTimer:this.startTimer,
            onFinish:this.onFinish
        });
    }

    public update = (x: number, y: number, id: number,ghost=false) => {
        this.state.board[x][y].id = id;
        this.state.board[x][y].ghost = ghost;
        this.forceUpdate();
    }

    public onFinish = (data:any) => {
        console.log(data);
        this.props.onFinish();
        if(data.playerWinner == this.props.player1.id){
            this.props.player1.win = true;
        }
        if(data.playerWinner == this.props.player2.id){
            this.props.player2.win = true;
        }
        if(data.win == 1){
            this.setState({board:data.board});
        }
        
       // this.forceUpdate();
    }

    private resetBoard(){
        this.setState({board:[]})
    }

    /**
     * Cuando se hace un click en una celda esta funcion se llama.
     * @param {Cell} cell datos de la celda en la que se dio click
     */
    private onClick = (cell: Cell): boolean => {
        return this.props.gameRule.onClick(this.state.board, cell, this.props.player1.id, this.update)
    };

    /**
     * Cuando se coloca el mouse sobre una celda esta funcion se llama.
     * @param {Cell} cell datos de la celda en la que el mouse salio
     */
    private onLeave = (cell: Cell): boolean => {
        return this.props.gameRule.onLeave(this.state.board, cell, this.props.player1.id, this.update)
    };

    /**
     * Cuando se coloca el mouse sobre una celda esta funcion se llama.
     * @param {Cell} cell datos de la celda en la que el mouse esta
     */
    private onEnter = (cell: Cell): boolean => {
        return this.props.gameRule.onEnter(this.state.board, cell, this.props.player1.id, this.update);
    };

    private returnColor(id: number) {
        if (id == this.props.player1.id) {
            return this.props.player1.color;
        }
        if (id == this.props.player2.id || id == -1) {
            return this.props.player2.color;
        }
        return '';
    }

    /**
     * Esta Funcion se encarga de llevar una cuenta regresiva con el objetivo 
     * de mostrarle al jugador cuanto tiempo le queda para mover su ficha 
     */
    public startTimer = ()=> {
        const cont = new crono.Descontador(this.props.matchTime);
        var d = cont.start().subscribe(
            (data: string) => {
                if(!this.props.gameRule.getIsPlaying()){
                    d.unsubscribe();
                    this.setState({ timer: '' });
                    return;
                }
                if (data === 'FINISH') {
                    d.unsubscribe();
                    this.setState({ timer: 'Fin' });
                    return;
                }
                var seg = data.split(':').pop();
                this.setState({ timer: seg });
            }
        );
    }

    /**
     *  Esta funcion se encarga de renderizar el tablero
     */
    render() {
        return (
            <div className="container-fluid">
                <div className="row mt-2">
                    
                        <div className="col-12 col-md-2">
                            <img className="d-block m-auto" src={this.props.player2.picture} />
                        </div>
                        <div className="col-12 col-md-3 text-center">
                            <div className={this.props.player2.win?style.winner:''}>
                                {this.props.player2.username}
                            </div>
                        </div>
                    
                    
                    <div className="col-12 col-md-2 text-center font-weight-bold">
                        <div>VS</div>
                        <div>{this.state.timer}</div>
                    </div>
                    <div className="col-12  col-md-3 text-center">
                        <div className={this.props.player1.win?style.winner:''}>
                            {this.props.player1.username}
                        </div>
                        
                    </div>
                    <div className="col-12 col-md-2">
                        <img className="d-block m-auto" src={this.props.player1.picture} />
                    </div>
                
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={style.table}>
                            <div className="bg-white">
                                {this.state.board.map((row, inde) => {
                                    return (
                                        <div className="d-flex" key={inde}>
                                            {row.map((singleCell: Cell, index: number) => {
                                                return (
                                                    <CellComponent
                                                        key={index}
                                                        data={singleCell}
                                                        onClick={this.onClick}
                                                        onEnter={this.onEnter}
                                                        onLeave={this.onLeave}
                                                        color={this.returnColor(singleCell.id)}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
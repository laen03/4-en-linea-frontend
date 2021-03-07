import { Component } from 'react';
import { Cell } from '../../models';
import { CellComponent } from './Cell.component';
import { Rule } from './rules';

interface prop {
    size: number,
    ghost: boolean,
    player:{
        id:number,
        color:string
    },
    player2Color:string,
    gameRule:Rule
}

enum GameState {
    Searching,
    Waiting,
    Playing,
    GameOver
}
interface state {
    gameState: GameState,
    board:Cell[][]
}

export class Board extends Component<prop> {

    public state: state;

    constructor(props: any) {
        super(props);
        this.state = { gameState: GameState.Searching,board:this.createBoard(this.props.size) };
    }

    /**
     *  Esta funcion se encarga de la creacion de la matriz segun el tamaño que se le paso coo parametro 
     *  @param {number} size tamaño de la matriz
     */
    private createBoard(size: number):Cell[][] {
        let board:Cell[][] = [];
        for (let x = 0; x < size; x++) {
            let subCol:Cell[] = [];
            for (let y = 0; y < size; y++) {
                subCol.push({
                    id: 0,
                    x: x,
                    y: y,
                });
            }
            board.push(subCol);
        }
        return board;
    }

    /**
     * Cuando se hace un click en la celda esta funcion se llama.
     * @param {Cell} cell datos de la celda en la que se dio click
     */
    private onClick = (cell:Cell) => {
        if(this.props.gameRule.onClick(this.state.board, cell,this.props.player.id)){
            this.forceUpdate();
        }
    };

    /**
     * Cuando se coloca el mouse sobre la celda esta funcion se llama.
     * @param {Cell} cell datos de la celda en la que se dio click
     */
    private onLeave = (cell:Cell) => {
        if(this.props.gameRule.onLeave(this.state.board, cell,this.props.player.id)){
            this.forceUpdate();
        }
    };

    /**
     * Cuando se coloca el mouse sobre la celda esta funcion se llama.
     * @param {Cell} cell datos de la celda en la que se dio click
     */
    private onEnter = (cell:Cell) => {
        if(this.props.gameRule.onEnter(this.state.board, cell,this.props.player.id)){
            this.forceUpdate();
        }
    };

    /**
     *  Esta funcion se encarga de renderizar el tablero
     */
    render() {
        return (
            <div>
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
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}
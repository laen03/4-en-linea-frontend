import { Component } from 'react';
import { Cell } from '../../models';
import { CellComponent } from './Cell.component';
import { Rule } from './rules';

interface prop {
    board: Cell[][],
    player1:number,
    platter2:number,
    gameRule:Rule
}

interface state {
    board:Cell[][]
}

export class Board extends Component<prop> {

    public state: state;

    constructor(props: any) {
        super(props);
        this.state = {
            board:this.props.board 
        };
        this.props.gameRule.initRule({
            updata:this.update
        });
    }

    public update =(x:number,y:number,id:number) => {
        this.state.board[x][y].id = id;
        this.forceUpdate();
    }

    /**
     * Cuando se hace un click en una celda esta funcion se llama.
     * @param {Cell} cell datos de la celda en la que se dio click
     */
    private onClick = (cell:Cell):boolean => {
        return this.props.gameRule.onClick(this.state.board, cell,this.props.player1,this.update)
    };

    /**
     * Cuando se coloca el mouse sobre una celda esta funcion se llama.
     * @param {Cell} cell datos de la celda en la que el mouse salio
     */
    private onLeave = (cell:Cell):boolean => {
        return this.props.gameRule.onLeave(this.state.board, cell,this.props.player1,this.update)
    };

    /**
     * Cuando se coloca el mouse sobre una celda esta funcion se llama.
     * @param {Cell} cell datos de la celda en la que el mouse esta
     */
    private onEnter = (cell:Cell):boolean => {
        return this.props.gameRule.onEnter(this.state.board, cell,this.props.player1,this.update);
    };

    /**
     *  Esta funcion se encarga de renderizar el tablero
     */
    render() {
        return (
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
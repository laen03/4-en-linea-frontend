import { Component } from 'react';
import { Cell } from '../../models';
import { CellComponent } from './Cell.component';

interface prop {
    size: number,
    ghost: boolean,
    player1:{
        id:number,
        color:string
    },
    player2:{
        id:number,
        color:string
    }
}

enum GameState {
    Searching,
    Playing,
    GameOver
}

interface state {
    gameState: GameState
}


export class Board extends Component<prop> {

    public state: state;

    private board: any[];

    constructor(props: any) {
        super(props);
        this.state = { gameState: GameState.Searching };
        this.board = this.createBoard(this.props.size);
    }

    /**
     * [
     *  []
     *  []
     *  []
     * ]
     */
    private createBoard(size: number) {
        let board = [];
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

    private updateBoard = (x:number, y:number, e:number) => {
        console.log("Hola")
        console.log(x)
    };

    render() {
        return (
            <div>
                {this.board.map((row, inde) => {
                    return (
                        <div className="d-flex" key={inde}>
                            {row.map((singleCell: Cell, index: number) => {
                                return (
                                    <CellComponent
                                        key={index}
                                        data={singleCell}
                                        updateBoard={this.updateBoard}
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
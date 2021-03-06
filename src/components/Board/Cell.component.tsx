import { Cell } from 'models';
import { Component } from 'react';

interface prop {
    data: Cell,
    updateBoard: any,
}

export class CellComponent extends Component<prop> {

    public state:Cell;

    constructor(props: any) {
        super(props);
        this.state=this.props.data;
        this.onClick = this.onClick.bind(this);
    }

    private onClick(e:any){
        console.log("click");
        this.setState({id:1});
    }

    private printCircle()  {
        return(
            <div style={{width:'45px',height:'45px',backgroundColor:'red'}} className="rounded-circle">
                a
            </div>
        );
    }

    render() {
        return (
            <div style={{border:'solid 1px black',width:'50px',height:'50px'}} onClick={(e) => this.onClick(e)} >
                {this.state.id == 0? (""):(this.printCircle()) }
            </div>
        );
    }
}
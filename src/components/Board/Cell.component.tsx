import { Cell } from 'models';
import { Component } from 'react';

interface prop {
    data: Cell,
    onClick: any,
    onEnter:any,
    onLeave:any
}

export class CellComponent extends Component<prop> {

    public state:Cell;

    constructor(props: any) {
        super(props);
        this.state=this.props.data;
    }
    

    private printCircle()  {
        return(
            <div style={{width:'45px',height:'45px',backgroundColor:'red'}} className="rounded-circle"/>
        );
    }

    

    render() {
        return (
            <div 
                style={{border:'solid 1px black',width:'50px',height:'50px'}} 
                onClick={(e)=> this.props.onClick(this.state)} 
                onMouseEnter={(e) => this.props.onEnter(this.state)}
                onDrag={(e) => {}}
                onMouseLeave={(e) => this.props.onLeave(this.state)}>
                    {this.state.id == 0? (""):(this.printCircle()) }
            </div>
        );
    }
}
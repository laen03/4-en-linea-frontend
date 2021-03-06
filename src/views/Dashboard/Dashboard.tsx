import { Component } from 'react';
import { Board } from '../../components';

import './Dashboard.css';
export class Dashboard extends Component {

  constructor(props:any){
    super(props);
  }

  render(){
    return (
      <Board size={3} ghost={true} player1={{id:1, color:''}} player2={{id:2, color:'#E62B3F'}} />
    );
  }
}
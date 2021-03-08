import { Cell, User } from 'models';
import { Component } from 'react';
import { NLineRule,Rule } from 'components/Board/rules';
import { Board } from '../../components';
import { getAuthUser } from '../../services'
import config  from '../../envConfig';

import style from './GameRoom.module.css';
import { Socket } from 'dgram';

const io = require('socket.io-client');

export class GameRoom extends Component {

  public state:any;
  private socket:any;

  constructor(props:any){
    super(props);
    this.state = {user:null, socket:io(config.ApiUrl)};
  }

  createGameRoom(){
    this.state.size = 5;
    this.socket.emit("createGameRoom", {size:this.state.size, id:this.state.user.id, socket:this.state.socket})
  }

  componentDidMount(){
    this.setState({user:getAuthUser()});
  }
  
  render(){
    var rule = new NLineRule(this.state.socket);
    return (
      <div>
        {this.state.user == null? (""):(<Board gameRule={rule} size={5} ghost={true} player2Color='#00ff00' player={{id:this.state.user.data.id, color:''}} />) }
      
      </div>
      
    );
  }



}
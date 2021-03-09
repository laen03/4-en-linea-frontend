import { Cell, User } from 'models';
import { Component } from 'react';
import { NLineRule,Rule } from 'components/Board/rules';
import { Board } from '../../components';
import { getAuthUser } from '../../services'
import config  from '../../envConfig';

import style from './GameRoom.module.css';
import { Socket } from 'dgram';

const io = require('socket.io-client');

enum RoomState{
  IDEL,
  SEARCHING,
  PLAYING
}
export class GameRoom extends Component {

  public state:any;
  private board:Cell[][];

  constructor(props:any){
    super(props);
    this.state = {user:null, socket:io(config.ApiUrl), roomState:RoomState.IDEL,player2:{}};
    this.board = []
    this.state.socket.on('gameRoomInfo', (data:any)=> {
      this.setState({roomState:RoomState.PLAYING,board:data.board,player2:data.player});
      this.forceUpdate();
    });
  }

  createGameRoom(){
    this.state.socket.emit("createGameRoom", { 
      boardSize:8,
      playerInfo:{
        id:this.state.user.data.id, 
        username:this.state.user.data.username, 
        picture: this.state.user.data.picture
      }
    })

    this.state.socket.on('createdGameRoom', (data:any) => {
      console.log(data);
    });

  }

  searchGameRoom(){
    this.state.socket.emit("searchGame", {
      boardSize:8,
      playerInfo:{
        id:this.state.user.data.id, 
        username:this.state.user.data.username, 
        picture: this.state.user.data.picture
      }
    });

    this.state.socket.on('searchedGame', (data:any) => {
      if(data.searching){
        this.setState({roomState:RoomState.SEARCHING});
      }
    });

  }

  componentDidMount(){
    this.setState({user:getAuthUser()});
  }
  
  render(){
    var rule = new NLineRule(this.state.socket);
    return (
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-12 col-md-6">
            {
              this.state.roomState == RoomState.PLAYING? 
                (<Board gameRule={rule} board={this.state.board} platter2={this.state.player2.id} player1={this.state.user.data.id} />) 
              :
                ('')
            }
          </div>
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <button onClick={(e) => this.createGameRoom()}>
                Crear Partida
              </button>
              <button onClick={(e) => this.searchGameRoom()}>
                Buscar Partida
              </button>
              <div>
                Player2: {this.state.player2.username}
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    );
  }



}
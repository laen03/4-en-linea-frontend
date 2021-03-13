import { CirclePicker } from 'react-color';
import Tippy from '@tippyjs/react';
import { Cell, User } from 'models';
import { Component, useState } from 'react';
import { NLineRule,Rule } from 'components/Board/rules';
import { Board } from '../../components';
import { getAuthUser } from '../../services'
import config  from '../../envConfig';
import style from './GameRoom.module.css';
import ReactLoading from 'react-loading';
const io = require('socket.io-client');

enum RoomState{
  IDEL,
  SEARCHING,
  WAITING,
  PLAYING
}
export class GameRoom extends Component {

  public state:any;
  private board:Cell[][];

  constructor(props:any){
    super(props);
    this.state = {user:getAuthUser(), 
      socket:io(config.ApiUrl), 
      roomState:RoomState.IDEL,player2:{}, 
      colorPlayer1: '#F44E3B',
      colorPlayer2: '#68BC00'};
    this.board = []
    this.state.socket.on('gameRoomInfo', (data:any)=> {
      console.log(data);
      this.setState({
        roomState: RoomState.PLAYING,
        board: data.board,
        player2: data.player
      });

      //this.forceUpdate();
    });
  }

  createGameRoom(){
    this.state.socket.emit("createGameRoom", { 
      boardSize:8,
      playerInfo:{
        id:this.state.user.data.id, 
        username:this.state.user.data.username, 
        picture: this.state.user.data.picture,
        code:''
      }
    })

    this.state.socket.on('createdGameRoom', (data:any) => {
      this.setState({ownCode:data,roomState: RoomState.WAITING})
    });

  }

  joinGameRoom(){
    this.state.socket.emit("connectGameRoom", { 
      code:this.state.code,
      playerInfo:{
        id:this.state.user.data.id, 
        username:this.state.user.data.username, 
        picture: this.state.user.data.picture
      }
    })

    this.state.socket.on('connectedGameRoom', (data:any) => {
      if(!data){
        console.log("not Connected");
        this.setState({roomState: RoomState.IDEL});
        return;
      }
      console.log("conected");
    });
  }

  searchGameRoom(){
    console.log(this.state.user)
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

  render(){
    var rule = new NLineRule(this.state.socket);
    return (
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <h2 className="text-center">Tablero</h2>
              <div className="container-fluid">
                <div className="row mt-2">
                  <div className="col-12 col-md-2">
                    {this.state.roomState == RoomState.PLAYING? ( <img className="d-block m-auto" src={this.state.player2.picture}/>) : ('')}
                  </div>
                  <div className="col-12 col-md-3 text-center">
                    {this.state.roomState == RoomState.PLAYING? ( this.state.player2.username) : ('')}
                  </div>
                  <div className="col-12 col-md-2 text-center font-weight-bold">
                    VS
                  </div>
                  <div className="col-12  col-md-3 text-center">
                    {this.state.user.data.username}
                  </div>
                  <div className="col-12 col-md-2">
                    <img className="d-block m-auto" src={this.state.user.data.picture}/>
                  </div>
                  
                </div>
                <div className="row mt-2">
                  <div className="col-12">
                    {(this.state.roomState != RoomState.IDEL && this.state.roomState != RoomState.PLAYING)? 
                      (<ReactLoading type="bubbles" className="m-auto" color="#2395FF" height={'100px'} width={'100px'} />):
                        (this.state.roomState == RoomState.PLAYING?
                          (<Board gameRule={rule} board={this.state.board} player2={{id:this.state.player2.id, color:this.state.colorPlayer2}} player1={{id:this.state.user.data.id, color:this.state.colorPlayer1}} />) :
                          (''))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card h-100 ">
              <h2 className="text-center">Jugar</h2>
              <div className={`container-fluid mb-3 ${style.gameRoom}`}>
                <div className="row mt-2">
                  <div className="col-12 col-md-5">
                    <label><strong>Codigo:</strong> {this.state.ownCode}</label>
                  </div>
                  <div className="col-12 col-md-7">
                    <button disabled={this.state.roomState != RoomState.IDEL } className="btn btn-block btn-primary" onClick={(e) => this.createGameRoom()}>
                      Crear Sala
                    </button>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-md-5">
                    <input type="text" className="form-control" value={this.state.code} onChange={(e) => this.setState({code:e.target.value})}  placeholder="Codigo de sala" />
                  </div>
                  <div className="col-12 col-md-7">
                    <button disabled={this.state.roomState != RoomState.IDEL}  className="btn btn-block btn-primary" onClick={(e) => this.joinGameRoom()}>
                      Unirse a Sala
                    </button>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12">
                    <button disabled={this.state.roomState != RoomState.IDEL } className="btn btn-success btn-block" onClick={(e) => this.searchGameRoom()}>
                      Buscar Partida
                    </button>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-6">
                    <h4 className='text-center'>Player1</h4>
                    <CirclePicker className='center' width ='100%' colors={['#F44E3B', '#FE9200', '#FCDC00', '#A4DD00']}
                    color={this.state.colorPlayer1}
                    onChangeComplete={(color: { hex: any; }) => this.setState({colorPlayer1:color.hex})}
                    />
                  </div>  
                    <div className="col-6">
                    <h4 className='text-center'>Player2</h4>
                    <CirclePicker className='center' width ='100%' colors={['#68BC00', '#009CE0', '#7B64FF', '#FA28FF']}
                    color={this.state.colorPlayer2}
                    onChangeComplete={(color: { hex: any; }) => this.setState({colorPlayer2:color.hex})}
                    />
                  </div>
                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>
      
    );
  }



}
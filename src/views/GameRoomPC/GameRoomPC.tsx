import { CirclePicker } from 'react-color';
import { Cell, User } from 'models';
import { Component, useState } from 'react';
import { NLineRule, Rule } from 'components/Board/rules';
import { Board } from '../../components';
import { getAuthUser } from '../../services'
import config from '../../envConfig';
import style from './GameRoomPC.module.css';
import ReactLoading from 'react-loading';
import defaultProfilePic from '../../views/defaultPic.jpg';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
const io = require('socket.io-client');

enum RoomState {
  IDEL,
  SEARCHING,
  WAITING,
  PLAYING
}
export class GameRoomPC extends Component {

  public state: any;
  private board: Cell[][];

  constructor(props: any) {
    super(props);

    this.state = {
      user: getAuthUser(),
      socket: io(config.ApiUrl),
      roomState: RoomState.IDEL,
      player2: {},
      colorPlayer1: '#F44E3B',
      colorPlayer2: '#68BC00',
      seg:'',
      nivel: 1,
      dropdown: false, //para el select del tamaño del tablero,
      selectedBoardSize: 8
    };

    this.board = []

    this.state.socket.on('gameRoomInfo', (data: any) => {
      console.log(data);

      this.setState({
        roomState: RoomState.PLAYING,
        board: data.board,
        player2: data.player,
        gamerule: new NLineRule(this.state.socket, data.isPlaying)
      });
      //this.forceUpdate();
    });
  }

    /**
   * Detecta cuando una sala acabo.
   * @param data 
   */
    finishGameRoom = (data:any) =>{

    }

  createGameRoom() {
    this.state.socket.emit("createGameRoom", {
      boardSize: this.state.selectedBoardSize,
      bot: true, 
      nivel: this.state.nivel,
      playerInfo: {
        id: this.state.user.data.id,
        username: this.state.user.data.username,
        picture: this.state.user.data.picture,
        code: ''
      }
    })
    this.state.socket.on('createdGameRoom', (data: any) => {
      this.setState({ ownCode: data, roomState: RoomState.WAITING })
    });
  }

  private openCloseDropdown=()=>{
    this.setState({dropdown:!this.state.dropdown});
  }

  sendBoardSize(size: number) {
    this.setState({selectedBoardSize: size});
  }

  render() {
    return (
      <div className="container mt-2 bg-white">
        <div className="row">
          <div className="col-12 col-md-6">
            <h2 className="text-center">Tablero</h2>
            {(this.state.roomState != RoomState.IDEL && this.state.roomState != RoomState.PLAYING) ?
              (<ReactLoading type="bubbles" className="m-auto" color="#2395FF" height={'100px'} width={'100px'} />) :
              (this.state.roomState == RoomState.PLAYING ?
                (<Board
                  matchTime={15}
                  gameRule={this.state.gamerule}
                  board={this.state.board}
                  player2={{
                    id: -1,
                    color: this.state.colorPlayer2,
                    picture: defaultProfilePic,
                    username: 'BAD BOT',
                    win:false
                  }}
                  player1={{
                    id: this.state.user.data.id,
                    color: this.state.colorPlayer1,
                    picture: this.state.user.data.picture,
                    username: this.state.user.data.username,
                    win:false
                  }}
                  onFinish={this.finishGameRoom}
                />) :
                (''))}
          </div>
          <div className="col-12 col-md-6">
            <h2 className="text-center">Jugar</h2>
            <div className={`container-fluid mb-3 ${style.gameRoom}`}>
            <div className="row mt-5">
              <div className="col-12">
                  <button disabled={this.state.roomState != RoomState.IDEL} className="btn btn-success btn-block" onClick={(e) => this.createGameRoom()}>
                      Nivel 1
                    </button>
                </div>
              </div>
                <div className="row mt-5">
                  <div className="col-12">
                    <button disabled={this.state.roomState != RoomState.IDEL} className="btn btn-success btn-block" onClick={(e) => this.createGameRoom()}>
                        Nivel 2
                      </button>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-12">
                    <button disabled={this.state.roomState != RoomState.IDEL} className="btn btn-success btn-block" onClick={(e) => this.createGameRoom()}>
                        Nivel 3
                      </button>
                  </div>
                </div>
              <div className="row mt-5">
                <div className="col-6">
                  <h4 className='text-center'>Player1</h4>
                  <CirclePicker className='center' width='100%' colors={['#F44E3B', '#FE9200', '#FCDC00', '#A4DD00']}
                    color={this.state.colorPlayer1}
                    onChangeComplete={(color: { hex: any; }) => this.setState({ colorPlayer1: color.hex })}
                  />
                </div>
                <div className="col-6">
                  <h4 className='text-center'>Player2</h4>
                  <CirclePicker className='center' width='100%' colors={['#68BC00', '#009CE0', '#7B64FF', '#FA28FF']}
                    color={this.state.colorPlayer2}
                    onChangeComplete={(color: { hex: any; }) => this.setState({ colorPlayer2: color.hex })}
                  />
                </div>
              </div>
              <div className='row mt-5'>
                <div className='col-3'></div>
                <div className='col-6'>
                    <Dropdown isOpen={this.state.dropdown} toggle={this.openCloseDropdown} direction='right'>
                      <DropdownToggle caret>
                        Tamaño del tablero
                      </DropdownToggle>

                      <DropdownMenu>
                        <DropdownItem header>Elige el tamaño</DropdownItem>
                            <DropdownItem onClick={()=>this.sendBoardSize(6)}>6x6</DropdownItem>
                            <DropdownItem onClick={()=>this.sendBoardSize(8)}>8x8</DropdownItem>
                            <DropdownItem onClick={()=>this.sendBoardSize(10)}>10x10</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
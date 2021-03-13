import { User } from 'models';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { NLineRule, Rule } from 'components/Board/rules';
import { Board } from '../../components';
import { getAuthUser } from '../../services'

import style from './Dashboard.module.css';
import profilePic from './abc.jpg';
import reportWebVitals from 'reportWebVitals';

import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';

var tablaPrueba = [
  { player1: "AlienWAR", player2: "dani0105", gameStatus: "Empate", date: "25/02/2021" },
  { player1: "laen03", player2: "AlienWAR", gameStatus: "laen03", date: "08/03/2021" },
  { player1: "dani0105", player2: "laen03", gameStatus: "dani0105", date: "29/02/2021" },
  { player1: "AlienWAR", player2: "laen03", gameStatus: "AlienWAR", date: "01/23/2021" }
]

const columnas = [
  {name: "Jugador 1", selector: "player1", sortable: true }, 
  {name: "Jugador 2", selector: "player2",sortable: true}, 
  {name: "Partida", selector: "gameStatus", sortable: true}, 
  {name: "Fecha", selector: "date", sortable: true}
]

const paginationOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: ' de ',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos'
}

export class Dashboard extends Component {

  public state: any;


  constructor(props: any) {
    super(props);
    this.state = {user: getAuthUser()};
  }

  
  fillTable(p1:string, p2:string, gameStatus:number, date:string){
    var rows = []
    var status = ""
    if (gameStatus== 0){
      status = "Empate"
    }else if(gameStatus == 1){
      status = "Jugador 1"
    }else{
      status = "Jugador 2"
    }
    rows.push({
      player1:p1,
      player2:p2,
      gameStatus:status,
      date:date
    })
    return rows
  }

  componentDidMount() {
    this.setState({ user: getAuthUser() });
  }



  render() {
    return (
      <div className='container'>

        <div className='row mt-1'>
          <div className='col-sm-9'>
            <button type="button" className="btn btn-outline-light">
              {this.state.user.data.username}
            </button>
          </div>
          <div className='col'>
            <img src={this.state.user.data.picture} alt='20' className="img-thumbnail w-50"></img>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-6'>
            <NavLink to='dashboard/play'>
            <button type="button" className={`btn btn-block ${style.createRoom}`}>
              Jugar en línea
            </button>
            </NavLink>
          </div>
          <div className='col-6'>
            <button type="button" className={`btn btn-block ${style.createRoom}`}>
              Jugar con el ordenador
            </button>
          </div>
        </div>

        <div className='row mt-2'>
          <div className='col-12 table-responsive'>
            <DataTable columns={columnas} 
            data={tablaPrueba} 
            title="Historial de Partidas"
            pagination
            paginationComponentOptions={paginationOptions}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            />
          </div>
        </div>
      </div>
    );

  }



}
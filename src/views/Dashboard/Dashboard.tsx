import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuthUser, getHistory } from '../../services'

import style from './Dashboard.module.css';
import defaultProfilePic from './defaultPic.jpg';

import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';


const columnas = [
  {name: "Jugador 1", selector: "player1", sortable: true }, 
  {name: "Jugador 2", selector: "player2",sortable: true}, 
  {name: "Partida", selector: "gamestatus", sortable: true}, 
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
    this.state = { user: getAuthUser(), historyTable: [] };
  }

  private getHistory(){
    getHistory({size:20,page_number:0, id_user_account: this.state.user.data.id}).then( result =>{
      if(result.success){
        for(var i in result.data){
          if(result.data[i].gamestatus == 0){
            result.data[i].gamestatus= 'Empate'
          }else if(result.data[i].gamestatus == 1){
            result.data[i].gamestatus= 'Victoria'
          }else{
            result.data[i].gamestatus= 'Derrota'
          }
          result.data[i].date = result.data[i].date.split('T')[0]
        }
        this.setState({historyTable:result.data})
      }
    },err => console.log(err))
  }
  
  componentDidMount() {
    this.getHistory()
    this.setState({ user: getAuthUser() });
  }

  render() {
    return (
      <div className='container container-custom'>

        <div className='row mt-1'>
          <div className='col-7'>
          </div>
          <div className='col-2'>
              {this.state.user.data.username}
          </div>
          <div className='col'>
            <img src={this.state.user.data.picture?this.state.user.data.picture:defaultProfilePic} 
            alt='20' 
            className="img-thumbnail w-50"></img>
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
            data={this.state.historyTable} 
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
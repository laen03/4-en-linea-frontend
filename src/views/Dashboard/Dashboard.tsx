import { User } from 'models';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { NLineRule, Rule } from 'components/Board/rules';
import { Board } from '../../components';
import { getAuthUser } from '../../services'

import style from './Dashboard.module.css';
import profilePic from './abc.jpg';
export class Dashboard extends Component {

  public state: any;

  constructor(props: any) {
    super(props);
    this.state = { user: null };

  }

  componentDidMount() {
    this.setState({ user: getAuthUser() });
  }


  render() {
    return (
      <div className='container'>

        <div className='row mt-2'>
          <div className='col-9'>
          </div>
          <div className='col'> 
            <img src={profilePic} alt='20' className="img-thumbnail d-block m-auto w-50"></img>
          </div>
        </div>

        <div className='row mt-2'>
          <div className='col-8'>
            
            <NavLink to='dashboard/play'>
              <button type="button" className={`btn btn-block ${style.createRoom}`}>
                  Crear sala
              </button>
            </NavLink>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-8'>
            <button type="button" className={`btn btn-block ${style.createRoom}`}>
              Encontar partida
            </button>
          </div>
        </div>
        
        <div className='row mt-5'>
          <div className='col-8'>
            <button type="button" className={`btn btn-block ${style.createRoom}`}>
              Jugar con el ordenador
            </button>
          </div>
        </div>

      </div>
    );
  }



}
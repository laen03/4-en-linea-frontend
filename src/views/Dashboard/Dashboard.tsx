import { User } from 'models';
import { Component } from 'react';
import { NLineRule,Rule } from 'components/Board/rules';
import { Board } from '../../components';
import { getAuthUser } from '../../services'

import style from './Dashboard.module.css';
export class Dashboard extends Component {

  public state:any;



  constructor(props:any){
    super(props);
    this.state = {user:null};
  
  }

  componentDidMount(){
    this.setState({user:getAuthUser()});
  }

  
  render(){
    return (
      <div>
        Dashboard works!
      </div>
      
    );
  }



}
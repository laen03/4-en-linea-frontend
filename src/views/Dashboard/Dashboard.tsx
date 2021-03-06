import { User } from 'models';
import { Component } from 'react';
import { NLineRule,Rule } from 'components/Board/rules';
import { Board } from '../../components';
import { getAuthUser } from '../../services'

import './Dashboard.css';
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
    var rule = new NLineRule();
    return (
      <div>
        {this.state.user == null? (""):(<Board gameRule={rule} size={5} ghost={true} player2Color='#00ff00' player={{id:this.state.user.data.id, color:''}} />) }
      
      </div>
      
    );
  }
}
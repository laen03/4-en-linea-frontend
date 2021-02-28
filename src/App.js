import { Component } from 'react';
import LoginFacebook from './components/LoginFacebbok/LoginFacebook/LoginFacebook'

class App extends Component {
  render(){
    return (
      //<LoginFacebook />,
      <LoginGoogle />
    );
  }
}

export default App;

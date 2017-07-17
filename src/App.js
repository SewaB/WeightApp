import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import Page from './Page'
import { Button } from 'react-bootstrap'

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props){
    super(props)
    const userFromStorage = localStorage.getItem('WeightApp')
    const isUser = userFromStorage !== null
    const user = isUser ? JSON.parse(userFromStorage) : {}
    this.state = {
      autificated:isUser,
      user,
      loading: true,
      day:'',
      newDay:true,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ 
          user ,
          autificated:true
        });
      }else{
        this.setState({
          authenticated: false, 
          user: {}});
        localStorage.removeItem('WeightApp');
      }
    });
    
  }

  logIn(){
    firebase.auth().signInWithRedirect(provider);
   }  

  render() {

    let showPage;

    if(this.state.autificated){
        showPage =  <Page user={ this.state.user }/>
      }else{
        showPage = <Button onClick={()=>this.logIn()}> Sync with Google Account</Button>
      }
    return (
     <div>
        <div className="App">
         <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
              <h2>Худеть можно Вкусно!</h2>
        </div>
        </div>
        <div className="body">
          {showPage}
        </div>
     </div>
    );
  }
}

export default App;




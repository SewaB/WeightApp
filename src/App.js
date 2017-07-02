  import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      userLoggedIn:false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(userLoggedIn) => this.setState({ userLoggedIn }))
  }

  logIn(){
      firebase.auth().signInWithRedirect(provider);
     }
   
  render() {
    let showPage;
      if(this.state.userLoggedIn){
        showPage =  <Page />
      }else{
        showPage = <button onClick={()=>this.logIn()}> Sync with Google Account</button>
      }
      console.log(this.state.userLoggedIn 'adASDASDASDAD')
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Худеем Вкусно!</h2>
        </div>
          {showPage}
        </div>
    );
  }
}

export default App;

class Page extends Component {
  render(){
    return(
      <div>asd
      </div>
      )
  }
}

  import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import moment from 'moment';

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => this.setState({ user }))
  }

  logIn(){
    firebase.auth().signInWithRedirect(provider);
  }
   
  render() {
    let showPage;
      if(this.state.user){
        showPage =  <Page user={ this.state.user }/>
      }else{
        showPage = <button onClick={()=>this.logIn()}> Sync with Google Account</button>
      }
      console.log(' HUI', this.state.user)
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

  constructor(props) {
    super(props)

    this.state = {
      current: {},
      day: {},
      water:'',
      callory:'',
      item: '',
      endday:false,
      noday:false
    }
  }

  getUser(props){
       firebase.database().ref('Days')
      .push({ 
        water: 'water',
        callory: '1',
        day:moment().format('YYYY-MM-DD'),
        user: this.props.user.uid
      });
      firebase.database().ref('Users')
      .push({ 
         user: this.props.user.uid
      });
  }

  lastDay(){
    if(this.state.endday || this.state.noday){
      return (
        <div>
          полоска еды
          полоска воды
          <button>Добавить</button>
        </div>
      )
    }else{
      return (
        <div> 
         <button onClick={()=>this.getUser()}>Начать новый день</button>
        </div>
    )
    }
  }


  render(){
    return(
      <div>
        {this.lastDay()}
      </div>
    )
  }
}





// class NewDay extends Component {

//   // getGram(grams){
//   //      firebase.database().ref(this.props.user.uid + '/' + moment().format('YYYY-MM-DD'))
//   //     .push({ 
//   //       day: this.state.slot, 
//   //       weight: grams 
//   //     });
//   // }

//   render(){
//     return(
//       <div> 
//         <button>Начать новый день</button>
//       </div>
//       )
//   }
// }
// class CurrentDay extends Component {
//   render(){
//     return(
      
//       )
//   }
// }
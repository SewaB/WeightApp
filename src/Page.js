import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import CurrentDay from './CurrentDay'
import { Button } from 'react-bootstrap'

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dayStart: '',
      noDay:'',
      caloryNorm:'2500',
      waterNorm:'3',
      key:'',
    }
  }

  componentDidMount() {
    const { uid } = this.props.user
    firebase.database().ref('Users/' + uid).once('value')
    .then(snapshot => {
      this.setState({
        noDay:snapshot.val()
      })
    })
  }

  getUser(props){
    const { uid } = this.props.user
    const key = firebase.database().ref('Days').push({ }).key;
    this.setState({key:key})
    let noDay = { 
      user:uid,
      caloryNorm:this.state.caloryNorm,
      waterNorm:this.state.waterNorm,
      dayStart:moment().format('DD MMM YYYY'),
      key:key
    }
    firebase.database().ref('Days/' + key + '/' + uid + '/')
    .update({ 
      dayStart:moment().format('DD MMM YYYY'),
      time:moment().format('DD MMM YYYY hh:mm a'),
    });
    firebase.database().ref('Users/' + uid )
    .set(noDay);
    
    this.setState({
      dayStart: Date.now(),
      noDay,
    })
  }
 
  checkDay(){
    const {dayStart} = this.state.noDay;
    return dayStart === moment().format('DD MMM YYYY')
  }

  checkLastDay(){

    if(this.state.noDay && this.checkDay() && this.props.user !== null){
      return (
        <CurrentDay noDay ={this.state.noDay} user={this.props.user} caloryNorm={this.state.caloryNorm} waterNorm={this.state.waterNorm}/>
      )
    }else{
      return (
        <div> 
         <Button className="newDay" bsSize="large" onClick={()=>this.getUser()}>Начать новый день</Button>
        </div>
      )
    }
  }

  render(){
      return(
      <div>
        {this.checkLastDay()}
      </div>
    )
  }
}
export default Page;


import React, { Component } from 'react';
import firebase from 'firebase';
import moment from 'moment';
import CurrentDay from './CurrentDay'
import { Button } from 'react-bootstrap'

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: {},
      dayStart: '',
      water:'',
      calory:'',
      item: '',
      endday:false,
      noDay:'',
      caloryNorm:'2500',
      waterNorm:'3',
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
    let noDay = { 
      user:uid,
      caloryNorm:this.state.caloryNorm,
      waterNorm:this.state.waterNorm,
      dayStart:moment().format('DD MMM YYYY'),
      key:key
    }
    firebase.database().ref('Days/' + key)
    .update({ 
      dayStart:moment().format('DD MMM YYYY'),
      time:moment().format('DD MMM YYYY hh:mm a'),
    });
    firebase.database().ref('Days/' + key + '/user')
    .update({ 
         user:uid,
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
    return(
        dayStart === moment().format('DD MMM YYYY')
    )
  }

  checkLastDay(){

    if(this.state.noDay && this.checkDay() && this.props.user !== null){
      return (
        <CurrentDay user={this.props.user} caloryNorm={this.state.caloryNorm} waterNorm={this.state.waterNorm}/>
      )
    }else{
      return (
        <div> 
         <Button onClick={()=>this.getUser()}>Начать новый день</Button>
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


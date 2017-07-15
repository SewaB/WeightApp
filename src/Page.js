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
      noday:false,
      caloryNorm:'',
      waterNorm:'',
    }
  }
// componentDidMount() {
// 	const { uid } = this.props.user
//       firebase.database().ref('Users/' + uid).once('value').then(snapshot => {
//       const snapshotval = snapshot.val()
//       const { calory, dayStart,water, uid } = snapshot.val()
//       if (snapshotval !== null) {
//         if (snapshot.val().dayStart + 86400000 > moment()) {
//           this.setState({
//             water:'',
//             calory:'',
//             dayStart:'',
//           })
//         }
//       }
//     })
//   }
  getUser(props){
    const { uid } = this.props.user
    const key = firebase.database().ref('Days').push({ }).key;
    const dayStart = Date.now()

    firebase.database().ref('Days/' + key)
    .update({ 
      dayStart:moment().format('DD MMM YYYY hh:mm a'),
      user:uid
    });

    firebase.database().ref('Users/' + uid )
    .set({ 
      user:uid,
      caloryNorm:'2500',
      waterNorm:'3',
      dayStart:moment().format('DD MMM YYYY hh:mm a'),
      key:key
    });
    
    this.setState({
      dayStart: Date.now(),
      endday:true,
    })
  }

  checkLastDay(){
    if(this.state.endday){
      return (
        <CurrentDay user={this.props.user}/>
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


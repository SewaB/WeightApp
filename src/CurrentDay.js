import React, { Component } from 'react';
import { Button , Modal , ProgressBar} from 'react-bootstrap';
import firebase from 'firebase'
import moment from 'moment';

class CurrentDay extends Component {

  constructor(props){
    super(props);
    this.state = {
      water:'',
      calory:'',
      showItem1:false,
      showItem2:false,
      term:'',
      user:'',
      key:'',
      addAt:'',
      totalCalory:'',
      totalWater:'',
      total:'',
    }
  }

  componentDidMount() {
    // const { uid } = this.props.user
    firebase.database().ref('Days/' + this.state.key + '/user').once('value')
    .then(snapshot => {
      console.log(snapshot.val())
      this.setState({
        total:snapshot.val(),
        
      })
     console.log(this.state.total)
      // const snapshotval = snapshot.val()
      // const { key, user } = snapshot.val()
      //  if (snapshotval !== null) {
      //   this.setState({
      //     user,
      //     key
      //   })
      // }
      })
      }

  onInputChangeCalory(calory){
    this.setState({calory});
   }
    onInputChangeWater(water){
    this.setState({water});
   }
  addWater(){
    firebase.database().ref('Days/' + this.state.key + '/user')
    .push({ 
      water:this.state.water,
      addAt:moment().format('DD MMM YYYY hh:mm a'),
    });
  }
  addCalory(){
    firebase.database().ref('Days/' + this.state.key + '/user')
    .push({ 
      calory:this.state.calory,
      addAt:moment().format('DD MMM YYYY hh:mm a'),
    });
  }

   render() {
   
    let waterNorm = this.props.waterNorm;
    let caloryNorm = this.props.caloryNorm;
    let item;
    if(this.state.showItem1){
      item =   
          <div className="static-modal">
            <Modal.Dialog>
             <Modal.Header>
                     Калории
            </Modal.Header>
                  <Modal.Body>
                    <label  className="control-label">Введите количество,в ккал</label>
                    <input 
                    type='number' 
                    placeholder='Например 140'
                    value={this.state.calory}
                    onChange={event => this.onInputChangeCalory(event.target.value)} />
           </Modal.Body>
              <Modal.Footer>
                <Button onClick={()=>this.setState({showItem1:false})}>Close</Button>
                <Button 
                    bsStyle="primary"
                    onClick={()=> this.addCalory()}>   
                     Save changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
    }
    if(this.state.showItem2){
      item =   
          <div className="static-modal">
            <Modal.Dialog>
             <Modal.Header>
                     Вода
            </Modal.Header>
                  <Modal.Body>
                    <label  className="control-label">Введите количество,в литрах</label>
                    <input 
                    type='number' 
                    placeholder='Например 12'
                    value={this.state.water}
                    onChange={event => this.onInputChangeWater(event.target.value)} />
           </Modal.Body>
              <Modal.Footer>
                <Button onClick={()=>this.setState({showItem2:false})}>Close</Button>
                <Button 
                  bsStyle="primary" 
                  onClick={()=> this.addWater()}
                  //disabled={this.state.textIsEmpty || this.state.authorIsEmpty || this.state.agreeNotChecked}
                  >
                   Save changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
    }
    return (
      <div>
         <h3>Британские учёные провели исследование и выяснили,что ваша дневная норма составляет 2500ккал и 3 литра воды.</h3>
      <div className ="screen">
        <ProgressBar bsStyle="success" active now={ 100*this.state.calory/caloryNorm } />
        <Button bsStyle="success" onClick={()=>this.setState({ showItem1:true })}> Добавить Калории </Button>
        <ProgressBar bsStyle="info" active now={ 100*this.state.water/waterNorm } />
        <Button bsStyle="info" onClick={()=>this.setState({ showItem2:true})}> Добавить Воду </Button>
          {item}
          <p>Сьедено на 5000 калорий</p>
          <p>Выпито 2 литра</p>
        </div>
        </div>
    );
  }
}

export default CurrentDay;



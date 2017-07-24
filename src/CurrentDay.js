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
      addAt:'',
      totalCalory:'',
      totalWater:'',
      total:'',
      show:false,
    }
  }

  componentDidMount() {
    const key = this.props.noDay.key;
    const {uid} = this.props.user;
    firebase.database().ref('Days/' + key + '/'+ uid + '/').once('value')
    .then(snapshot => {
      this.setState({
        total:snapshot.val(),
        totalCalory:snapshot.val().totalCalory || 0,
        totalWater:snapshot.val().totalWater || 0,
       })
      console.log(this.state.totalCalory,this.state.totalWater);
    })
  }

  onInputChangeCalory(calory){
    this.setState({calory});
   }

  onInputChangeWater(water){
    this.setState({water});
   }

  addWater(){
    const key = this.props.noDay.key;
    const {uid} = this.props.user;
    firebase.database().ref('Days/' + key + '/'+ uid + '/mealWater')
    .push({ 
      water:this.state.water,
      addAt:moment().format('DD MMM YYYY hh:mm a'),
    });

    this.setState({showItem2:false})
    firebase.database().ref('Days/' + key + '/' + uid + '/')
    .update({ 
      totalWater:+this.state.totalWater + +this.state.water,
    });

    this.setState({totalWater:+this.state.totalWater + +this.state.water})
  }

  addCalory(){
    const key = this.props.noDay.key;
    const {uid} = this.props.user;
    firebase.database().ref('Days/' + key + '/'+ uid + '/mealFood')
    .push({ 
      calory:this.state.calory,
      addAt:moment().format('DD MMM YYYY hh:mm a'),
    });

    this.setState({showItem1:false})

    firebase.database().ref('Days/' + key + '/' + uid + '/')
    .update({ 
      totalCalory:+this.state.totalCalory + +this.state.calory,
   });

    this.setState({totalCalory:+this.state.totalCalory + +this.state.calory})
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
              placeholder='Например 17'
              value={this.state.water}
              onChange={event => this.onInputChangeWater(event.target.value)} />
         </Modal.Body>
            <Modal.Footer>
              <Button 
                bsStyle="primary" 
                onClick={()=> this.addWater()}>
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
            <ProgressBar bsStyle="success" active now={ 100*this.state.totalCalory/caloryNorm } />
            <Button  bsSize="large" bsStyle="success" onClick={()=>this.setState({ showItem1:true })}> Добавить Калории </Button>
            <ProgressBar bsStyle="info" active now={ 100*this.state.totalWater/waterNorm } />
            <Button  bsSize="large" bsStyle="info" onClick={()=>this.setState({ showItem2:true})}> Добавить Воду </Button>
            {item}
            <p>Сьедено {this.state.totalCalory} калорий</p>
            <p>Выпито {this.state.totalWater} литра(-ов) воды</p>
        </div>
      </div>
    );
  }
}

export default CurrentDay;



  //   <div className="modal-container" style={{height: 200}}>
  //       <Button
  //         bsStyle="primary"
  //         bsSize="large"
  //         onClick={() => this.setState({ show: true})}
  //       >
  //         Launch contained modal
  //       </Button>

  //       <Modal
  //         show={this.state.show}
  //         onHide={close}
  //         container={this}
  //         aria-labelledby="contained-modal-title"
  //       >
  //         <Modal.Header closeButton>
  //           <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button onClick={close}>Close</Button>
  //         </Modal.Footer>
  //       </Modal>
  //     </div>
  //   );
  // }
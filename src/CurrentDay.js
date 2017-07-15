import React, { Component } from 'react';
import { Button , Modal , ProgressBar} from 'react-bootstrap';
import firebase from 'firebase'


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
      key:''
    }
  }

  componentDidMount() {
    const { uid } = this.props.user
    firebase.database().ref('Users/' + uid).once('value')
    .then(snapshot => {
      const snapshotval = snapshot.val()
      const { key, user } = snapshot.val()
       if (snapshotval !== null) {
        this.setState({
          user,
          key
        })
      }}
      )

    }

  onInputChangeCalory(calory){
    this.setState({calory});
   }
    onInputChangeWater(water){
    this.setState({water});
   }
  addWater(){
    firebase.database().ref('Days/' + this.state.key + '/totalThisDay')
    .update({ 
      water:this.state.water,
    });
  }
  addCalory(){
    firebase.database().ref('Days/' + this.state.key + '/totalThisDay')
    .update({ 
      calory:this.state.calory,
    });
  }

   render() {
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
                    placeholder='Например 140'
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
console.log(this.state.water,this.state.calory)
    return (
      <div>
        <ProgressBar bsStyle="success" active now={40} />
        <Button bsStyle="success" onClick={()=>this.setState({showItem1:true})}> Добавить Калории </Button>
        <ProgressBar bsStyle="info" active now={20} />
        <Button bsStyle="info" onClick={()=>this.setState({showItem2:true})}> Добавить Воду </Button>
          {item}
        </div>
    );
  }
}

export default CurrentDay;



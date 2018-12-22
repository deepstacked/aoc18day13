import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Tracks from './components/tracks';
import Carts from './components/carts';
import Collisions from './components/collisions';
import CartInfos from './components/cartinfos';
import * as actions  from './actions';
import { Button, Container, Row, Badge } from 'reactstrap';

const CRASHOPTIONS = {first: 'first', last: 'last'};
class App extends Component {
  componentDidMount(){
    this.props.dispatch(actions.loadInitialData());
  }
  componentDidUpdate(prevProps){
    let { collisions, cartsalive, running, timer, crashoption, turn } = this.props;
    if(turn > 10000) console.log(prevProps, this.props);
    if(collisions.length > 0 && prevProps.collisions.length === 0 && running === true && crashoption === CRASHOPTIONS.first){
      this.props.dispatch(actions.stopTimer(timer));
    } else if (cartsalive === 1 && running === true && crashoption === CRASHOPTIONS.last){
      this.props.dispatch(actions.stopTimer(timer));
    }
  }
  componentWillUnmount(){
    this.onStopRun();
  }
  onAdvanceRun = () => {
    let { tracks, carts, collisions, crashoption } = this.props;
    this.props.dispatch(actions.advanceCarts(tracks, carts, collisions, crashoption));
  }
  onStartRun = () => {
    let { timer } = this.props;
    if(timer === 0){
      let runTimer = setInterval(this.onAdvanceRun, 100);
      this.props.dispatch(actions.startTimer(runTimer, CRASHOPTIONS.first));
    }
  }
  onStartRunTillLast = () => {
    let { timer } = this.props;
    if(timer === 0){
      let runTimer = setInterval(this.onAdvanceRun, 25);
      this.props.dispatch(actions.startTimer(runTimer, CRASHOPTIONS.last));
    }
  }
  onStopRun = () => {
    let { timer } = this.props;
    this.props.dispatch(actions.stopTimer(timer));
  }
  onResetCartsCollisions = () => {
    this.props.dispatch(actions.resetCartsAndCollisions());
  }
  render() {
    
    let {tracks, running, turn} = this.props;    
    if(typeof tracks === 'undefined') return null;
    return (
      <div className="App">
      <Container>
        <Row className="pt-2 w-100 px-4 px-xl-0 ">
          <Button key="runone" type="button" className="btn-primary mr-3" disabled={running} onClick={this.onAdvanceRun}>Run once</Button>
          <Button key="startTimerFirst" type="button" className="btn-primary mr-3" disabled={running} onClick={this.onStartRun}>Run till First Crash</Button>
          <Button key="startTimerLast" type="button" className="btn-primary mr-3" disabled={running} onClick={this.onStartRunTillLast}>Run till Last Crash</Button>
          <Button key="stopTimer" type="button" className="btn-danger mr-3" disabled={!running} onClick={this.onStopRun}>Stop</Button>
          <Button key="resetCarts" type="button" className="btn-info mr-1" disabled={running || turn === 0} onClick={this.onResetCartsCollisions}>Reset</Button>
          <Badge color={running ? 'success' : 'primary'}>{turn}</Badge>
        </Row>
        <Row className="pt-2 w-100 px-4 px-xl-0 "><CartInfos /></Row>
      </Container>
      <svg id="overallApp" key="overallApp" viewBox='0 0 1600 1600' xmlns='http://www.w3.org/2000/svg'>
        <Tracks />
        <Carts />
        <Collisions />
      </svg>
      </div>
    );
  }
}

function mapStateToProps(state){
  if(state.turn > 10000) console.log(state);
  return {
    carts: state.carts,
    tracks: state.tracks,    
    turn: state.turn,
    collisions: state.collisions,    
    running: state.running,
    timer: state.timer,
    crashoption: state.crashoption,
    cartsalive: state.cartsalive
  };
}
export default connect(mapStateToProps)(App);

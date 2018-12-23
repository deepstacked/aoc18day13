import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Tracks from './components/tracks';
import Carts from './components/carts';
import Collisions from './components/collisions';
import CartInfos from './components/cartinfos';
import TrackInfo from './components/trackinfo';
import * as actions  from './actions';
import { Button, Container, Row, Badge } from 'reactstrap';

const CRASHOPTIONS = {first: 'first', last: 'last'};
class App extends Component {
  componentDidMount(){
    this.props.dispatch(actions.loadInitialData());
  }
  componentDidUpdate(prevProps){
    let { collisions, cartsalive, running, timer, crashoption } = this.props;

    // automatic shutting down timer on certain conditions.
    if(collisions.length > 0 && prevProps.collisions.length === 0 && running === true && crashoption === CRASHOPTIONS.first){
      this.props.dispatch(actions.stopTimer(timer));
    } else if (cartsalive === 1 && running === true && crashoption === CRASHOPTIONS.last){
      this.props.dispatch(actions.stopTimer(timer));
    }
  }

  // ensures timer is cleaned up
  componentWillUnmount(){
    this.onStopRun();
  }

  // calls the advanceCarts. Usually on a loop from a timer/interval
  onAdvanceRun = () => {
    let { tracks, carts, collisions, crashoption } = this.props;
    this.props.dispatch(actions.advanceCarts(tracks, carts, collisions, crashoption));
  }

  // runs on a timer till the first crash.
  onStartRun = () => {
    let { timer } = this.props;
    if(timer === 0){
      let runTimer = setInterval(this.onAdvanceRun, 100);
      this.props.dispatch(actions.startTimer(runTimer, CRASHOPTIONS.first));
    }
  }
  // runs on a timer till the last crash
  onStartRunTillLast = () => {
    let { timer } = this.props;
    if(timer === 0){
      let runTimer = setInterval(this.onAdvanceRun, 25);
      this.props.dispatch(actions.startTimer(runTimer, CRASHOPTIONS.last));
    }
  }

  // runs till the last crash without a timer or intermediate UI updates.
  onStartRunNoDelay = () => {
    let { tracks, carts } = this.props;
    this.props.dispatch(actions.doAllNoDelay(tracks, carts))
  }

  // clears the time
  onStopRun = () => {
    let { timer } = this.props;
    this.props.dispatch(actions.stopTimer(timer));
  }

  // reset the game board.
  onResetCartsCollisions = () => {
    this.props.dispatch(actions.resetCartsAndCollisions());
  }
  render() {
    
    let {tracks, running, tick} = this.props;    
    if(typeof tracks === 'undefined') return null;
    return (
      <div className='App'>
      <Container>
        <Row className='pt-2 w-100 px-4 px-xl-0 '>
          <Button key='runone' type='button' className='mr-3' disabled={running} onClick={this.onAdvanceRun}>Run one tick</Button>
          <Button key='runall' type='button' className='mr-3' disabled={running} onClick={this.onStartRunNoDelay}>Run No Delay</Button>
          <Button key='startTimerFirst' type='button' className='ml-4 mr-2' disabled={running} onClick={this.onStartRun}>Run till First Crash</Button>
          <Button key='startTimerLast' type='button' className='mr-2' disabled={running} onClick={this.onStartRunTillLast}>Run till Last Crash</Button>          
          <Button key='stopTimer' type='button' color='danger' className='mr-4' disabled={!running} onClick={this.onStopRun}>Stop</Button>
          <Button key='resetCarts' type='button' color='success' className='mr-1' disabled={running || tick === 0} onClick={this.onResetCartsCollisions}>Reset</Button>          
        </Row>
        <Row><Badge className='mt-2 mr-2' color={running ? 'success' : 'primary'}>Ticks: {tick}</Badge><TrackInfo /></Row>
        <Row className='pt-2 w-100 px-4 px-xl-0 '><CartInfos /></Row>
      </Container>
      <svg id='overallApp' key='overallApp' viewBox='0 0 1600 1600' xmlns='http://www.w3.org/2000/svg'>
        <Tracks />
        <Carts />
        <Collisions />
      </svg>
      </div>
    );
  }
}

function mapStateToProps(state){  
  return {
    carts: state.carts,
    tracks: state.tracks,    
    tick: state.turn,
    collisions: state.collisions,    
    running: state.running,
    timer: state.timer,
    crashoption: state.crashoption,
    cartsalive: state.cartsalive
  };
}
export default connect(mapStateToProps)(App);

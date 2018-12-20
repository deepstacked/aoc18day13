import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Tracks from './components/tracks';
import Carts from './components/carts';
import Collisions from './components/collisions';
import * as actions  from './actions';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(actions.loadInitialData());
  }
  componentDidUpdate(prevProp){
    let { collisions, running, timer } = this.props;
    if(collisions.length > 0 && running === true){
      this.props.dispatch(actions.stopTimer(timer));
    }
  }
  componentWillUnmount(){
    this.onStopRun();
  }
  onAdvanceRun = () => {
    let { tracks, carts } = this.props;
    this.props.dispatch(actions.advanceCarts(tracks, carts));
  }
  onStartRun = () => {
    let { timer } = this.props;
    if(timer === 0){
      let runTimer = setInterval(this.onAdvanceRun, 100);
      this.props.dispatch(actions.startTimer(runTimer));
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
        <button key="runone" type="button" onClick={this.onAdvanceRun}>Run once</button>
        <button key="startTimer" type="button" disabled={running} onClick={this.onStartRun}>Run turns</button>
        <button key="stopTimer" type="button" disabled={!running} onClick={this.onStopRun}>Stop</button>
        <button key="resetCarts" type="button" disabled={running || turn === 0} onClick={this.onResetCartsCollisions}>Reset</button>
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
  console.log("App::mapStateToProps", state);
  return {
    carts: state.carts,
    tracks: state.tracks,    
    turn: state.turn,
    collisions: state.collisions,    
    running: state.running,
    timer: state.timer
  };
}
export default connect(mapStateToProps)(App);

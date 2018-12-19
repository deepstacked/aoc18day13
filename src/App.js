import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Tracks from './components/tracks';
import { loadInitialData, advanceCarts }  from './actions';

class App extends Component {

  onAdvanceRun = () => {
    let { tracks, carts } = this.props;    
    this.props.dispatch(advanceCarts(tracks, carts));
  }

  componentDidMount(){
    this.props.dispatch(loadInitialData());
  }

  render() {
    
    let {tracks} = this.props;    
    if(typeof tracks === 'undefined') return null;
    return (
      <div className="App">
        <button type="button" onClick={this.onAdvanceRun}>Click for 1 turn</button>
        <Tracks tracks = {this.props.tracks} carts = {this.props.carts} turn = {this.props.turn} />
      </div>
    );
  }
}

function mapStateToProps(state){  
  return {
    carts: state.carts,
    tracks: state.tracks,
    occupiedTracks: state.occupiedTracks,
    turn: state.turn,
    collision: state.collision,
    collisionMsg: state.collisionMsg
  };
}
export default connect(mapStateToProps)(App);

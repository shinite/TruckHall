import React, { Component } from "react";
import socketIOClient from "socket.io-client";

//Component to display individual match scores.

class Matches extends React.Component {

  state = {
      endpoint: "http://localhost:3000",
      score:'',
      batting:'',
      lastRun:'',
      wickets:''
    };

componentWillMount(){
    const socket = socketIOClient(this.state.endpoint);
    const match = this.props.match;
     socket.on(match, (data)=> {
       this.setState(()=>({score:data.score,batting:data.batting,lastRun:data.lastRun,wickets:data.wickets}))
     });
  }

  render() {
    return (
      <div className="match">
        <p className="text-heading">{this.props.match} </p>
        <p className="text-normal">  {this.state.batting}: {this.state.score}/{this.state.wickets}</p>
        {this.state.lastRun == '4' || this.state.lastRun == '6'
            ?  <p className="text-highlighted">{this.state.batting} just scored {this.state.lastRun} runs!!! </p>
            :  <p className="text-normal">Current ball :  {this.state.lastRun} {this.state.lastRun <= 1 ? <span>run</span> : <span>runs</span>}</p>
          }
      </div>
    )
  }
}
export default Matches;

import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Matches from './Matches';
import Header  from './Header'

//Component to display different matches that are live.
const Dashboard =(props) => {

  const match = props.matches.map((match,index)=>(
    <div>
      <Matches key={index} match={match}/>
    </div>
   ));

  return (
    <div>
      <Header/>
      <div className="matches">
        {match}
      </div>
    </div>
  )}

//matches is a list of live matches
Dashboard.defaultProps={
	matches:['IndVsPak','BanVsSL','CAVsHol','EngVsNZ','NabVsPng','NepVsHong','SAVsAus','ScoVsIre','UaeVsUsa','AfgVsKen']
}
export default Dashboard;

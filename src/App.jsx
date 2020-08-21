import React, { Component } from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {SeverityLevel} from '@microsoft/applicationinsights-web';
import './App.css';
import { getAppInsights } from './TelemetryService';
import TelemetryProvider from './telemetry-provider';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      api_secret: "j#i&dltG#Z3LyyrxBQ6#B#Ry",
      user: "oldevops@brixon.io",

    }
    this.fetchRequest = this.fetchRequest.bind(this);
  }
  fetchRequest() {
    this.interval = setInterval(() => {
    fetch('https://mcn0z3x23a.execute-api.us-east-1.amazonaws.com/dev/check-role', {
      method: 'post',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': this.state.id_token
      },
      body:JSON.stringify({
        "user": this.state.user,
        "api_secret": this.state.api_secret,
      })
    })
    .then((response) => response.json())
        .then(responseJson => {
          console.log(responseJson);
        })
      .catch((error)=>{
        console.error(error);
      });
    }, 5000);
  }
  render() {
    let appInsights = null;

    return (
      <div className="App">


      <BrowserRouter>
        <TelemetryProvider instrumentationKey="7696784d-3192-42a6-891e-1f8ca728cfae" after={() => { appInsights = getAppInsights() }}>

          <div className="App">
            <button onClick={this.fetchRequest}>Fetch Request from AWS API Gateway(Lambda)</button>
          </div>
        </TelemetryProvider>
      </BrowserRouter>
      </div>
    );
  }
}

export default App

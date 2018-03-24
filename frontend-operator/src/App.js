import React, {Component} from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:4000/operator');

socket.on('newInquiryAdded', (data) => {
  console.log(data);
});

socket.on('currentInqueries', (data) => {
  console.log(data);
});

class App extends Component{
  render(){
    return(
      <div></div>
    )
  }
}

export default App;


import React, { Component } from 'react';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './App.css';
import Navbar from './Navbar/Navbar';
import Product from './Product/Product';
import Issue from './Issue/Issue';
import io from 'socket.io-client';
import SpeechRecognition from './SpeechRecognition';

const socket = io('http://localhost:4000/customer');

socket.on('greeting', (data) => {
  console.log(data);
  socket.emit('addNewInquiry', { my: 'data' });
});


class App extends Component {
  constructor() {
    super();
    this.speechReco = new SpeechRecognition(this.handleRecognizedSpeech);
  }

  componentDidMount() {
    // this.speechReco.startRecognition();
    // this.sythesizeSpeech("eloszka", () => {
    //   console.log("Skończyło gadać");
    // });
  }

  sythesizeSpeech = (text, onEndCallback) => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'pl-PL';
    msg.onend = onEndCallback;
    window.speechSynthesis.speak(msg);
  }

  handleRecognizedSpeech = (transcript) => {
    console.log(`Transkrypt: ${transcript}`);
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={12}>
            <div className="App">
              <Issue />
              <Col xs={12}>
                <Row center="xs">
                  <Navbar />
                </Row>
                <Row center="xs">
                  <Product />
                </Row>
              </Col>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

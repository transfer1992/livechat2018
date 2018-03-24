import React, { Component } from 'react';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './App.css';
import Navbar from './Navbar/Navbar';
import io from 'socket.io-client';

var socket = io('http://localhost:4000/customer');

socket.on('greeting', (data) => {
  console.log(data);
  socket.emit('addNewInquiry', { my: 'data' });
});

class App extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={12}>
            <div className="App">
              <Col xs={12}>
                <Row center="xs">
                  <Navbar />
                  <div className="line"></div>
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

import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Image } from 'semantic-ui-react';
import av from './img/av.png';

const socket = io('http://192.168.43.56:4000/operator');
let currentInqueries = [];

socket.on('newInquiryAdded', (data) => {
  currentInqueries = [...currentInqueries, data]
  console.log(currentInqueries)
});

socket.on('currentInqueries', (data) => {
  currentInqueries = data
});

const objs = [{
  "_id": "5ab68f975dbab84f487ea78c",
  "category": "reklamacja",
  "consultantId": "0",
  "date": "2018-03-24T17:48:35.973Z",
  "email": "maciej.maciek@dżimejl.kom",
  "message": " Dzień dobry państwu",
  "name": "Maciej Maciek",
  "status": "open"
}, {
  "_id": "5ab68f975dbab84f487ea78c",
  "category": "reklamacja",
  "consultantId": "0",
  "date": "2018-03-24T17:48:35.973Z",
  "email": "maciej.maciek@dżimejl.kom",
  "message": " Dzień dobry państwu",
  "name": "Maciej Maciek",
  "status": "open"
}]

class App extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={6} md={3}>
            <div>
              <Card.Group>
                {currentInqueries.map(obj =>

                  <Card>
                    <Card.Content>
                      <Image floated='right' size='mini' src={av} />
                      <Card.Header>
                        <p className="name">{`${obj.name}`}</p>
                        {`(${obj.email})`}
                      </Card.Header>
                      <Card.Meta>
                      {obj.category}
                      </Card.Meta>
                      <Card.Description>
                        <div>
                        <p><strong>Date:</strong> {obj.date}</p>
                        <p><strong>ID:</strong> {obj._id}</p>
                        <p>{obj.message}</p>
                        </div>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className='ui two buttons'>
                        <Button basic color='green'>Approve</Button>
                        <Button basic color='red'>Decline</Button>
                      </div>
                    </Card.Content>
                  </Card>
                )}
              </Card.Group>
            </div>
          </Col>
        </Row>
      </Grid>
        )
  }
}

export default App;

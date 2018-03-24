import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Image } from 'semantic-ui-react';
import av from './img/av.png';

const socket = io('/operator');

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentInqueries: []
    }
  }

  componentDidMount() {
    socket.on('newInquiryAdded', (data) => {
      this.setState({
        currentInqueries: [...this.state.currentInqueries, data]
      });
      console.log(this.state.currentInqueries)
    });

    socket.on('currentInqueries', (data) => {
      this.setState({
        currentInqueries: data
      });
    });
  }
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={6} md={3}>
            <div>
              <Card.Group>
                {this.state.currentInqueries.map(obj =>

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

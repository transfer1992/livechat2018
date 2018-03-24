import React, { Component } from 'react';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Navbar from './Navbar/Navbar';
import Product from './Product/Product';
import Issue from './Issue/Issue';
import io from 'socket.io-client';
import SpeechRecognition from './SpeechRecognition';
import ModalRep from './Modal/Modal';
import 'semantic-ui-css/semantic.min.css';

const socket = io('http://localhost:4000/customer');

socket.on('greeting', (data) => {
  console.log(data);
  socket.emit('addNewInquiry', { my: 'data' });
});

const categories = [
  "zapytanie o produkt",
  "reklamacja",
  "zwrot",
  "inne"
]

const person = {
  name: "Maciej Maciek",
  email: "maciej.maciek@dżimejl.kom"
}


class App extends Component {
  constructor() {
    super();
    this.speechReco = new SpeechRecognition(this.handleRecognizedSpeech);
    this.state = {
      isModalOpened: false,
      chosenCategory: null,
      inquiryText: ""
    }
  }

  componentDidMount() {
    this.speechReco.startRecognition();
  }

  handleCheckboxChanges = (e, {value}) => {
    this.setState({chosenCategory: value});
  }

  problemDescriptionChange = (e, {value}) => {
    this.setState({inquiryText: value})
  }

  sythesizeSpeech = (text, onEndCallback) => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'pl-PL';
    msg.onend = onEndCallback;
    window.speechSynthesis.speak(msg);
  }

  handleRecognizedSpeech = (transcript) => {
    console.log(transcript);
    if (!this.state.isModalOpened) {
      if (transcript.toLowerCase() === "mam pytanie") {
        this.speechReco.stopRecognition();
        this.setState({
          isModalOpened: true
        }, () => {
          this.sythesizeSpeech("Wybierz kategorię zapytania.", this.speechReco.startRecognition);
        });
      }
    } else if (!this.state.chosenCategory) {
      let tmpIndex = categories.indexOf(transcript.toLowerCase());
      if (tmpIndex !== -1) {
        this.speechReco.stopRecognition();
        this.setState({
          chosenCategory: categories[tmpIndex]
        }, () => {
          this.sythesizeSpeech(`Wybrano kategorię ${transcript.toLowerCase()}. Podaj treść zapytania. Aby zakończyć i wysłać zapytanie, powiedz "koniec treści".`, this.speechReco.startRecognition);
        });
      } else {
        this.speechReco.stopRecognition();
        this.sythesizeSpeech("Niestety nie zrozumiałam. Czy mógłbyś powtórzyć?", this.speechReco.startRecognition);
      }
    } else {  //wprowadzamy treść zapytania
      if (transcript.toLowerCase() === "koniec treści") {
        this.speechReco.stopRecognition();

        let tmpInquiry = {
          email: person.email,
          name: person.name,
          category: this.state.chosenCategory,
          message: this.state.inquiryText
        }

        socket.emit('addNewInquiry', tmpInquiry);
        this.sythesizeSpeech(`Twoje zapytanie zostało wysłane. Dziekujemy!`, () => {
          this.setState({
            isModalOpened: false,
            chosenCategory: null,
            inquiryText: ""
          }, this.speechReco.startRecognition);
        });

      } else { //dodajemy treść do zapytania
        let tmpInquiryText = this.state.inquiryText + " " + transcript;
        this.setState({
          inquiryText: tmpInquiryText
        });
      }
    }
  }


  openModalOnCLick = e => {
    this.setState({isModalOpened: true});
  }

  proceedData = e => {
    this.setState({isModalOpened: false});
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={12}>
            <ModalRep 
            checked={this.state.chosenCategory} 
            handleCheckboxChanges={this.handleCheckboxChanges} 
            isModalOpened={this.state.isModalOpened} 
            proceedData={this.proceedData}
            problemDescriptionChange={this.problemDescriptionChange}
            problemDescription={this.state.inquiryText}
            personData={person}/>
            <div className="App">
              <Col xs={12}>
                <Row center="xs">
                  <Navbar />
                </Row>
                <Row>
                  <Product openModalOnCLick={this.openModalOnCLick}/>
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

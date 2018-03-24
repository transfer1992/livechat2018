class SpeechRecognition {
  constructor(transcriptReceiveCallback) {

    this.sendTranscript = transcriptReceiveCallback;
    this.shouldStopRecognition = false;

    this.BrowserSpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition;

    this.recognition = this.BrowserSpeechRecognition ? new this.BrowserSpeechRecognition() : null;
    this.browserSupportsSpeechRecognition = this.recognition !== null;

    if (this.browserSupportsSpeechRecognition) {
      this.recognition.continuous = false;
      this.recognition.lang = 'pl-PL';
      this.recognition.interimResults = false;
      this.recognition.onresult = this.handleRecognitionResult;
      this.recognition.onend = this.handleRecognitionEnd;
    }
  }

  startRecognition = () => {
    this.shouldStopRecognition = false;
    this.recognition.start();
  }

  stopRecognition = () => {
    this.recognition.abort();
    this.shouldStopRecognition = true;
  }

  handleRecognitionEnd = () => {
    if (!this.shouldStopRecognition) {
      this.recognition.start();
    }
  }

  handleRecognitionResult = (event) => {
    this.sendTranscript(event.results[0][0].transcript);
  }
}

export default SpeechRecognition

import React from "react";

import { Row, Col, Container } from "react-bootstrap";
// import OptionsContainer from "./options";
// import JSONtab from "./JSONtab";
import TextTab from "./TEXTtab";
import LinkViewer from "../LinkViewer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      countedWords: [],
      loading: false,
      tab: 1,
    };
    // this.onProcessClick = this.onProcessClick.bind(this);
    this.processText = this.processText.bind(this);
    this.setCountedWords = this.setCountedWords.bind(this);
    this.setTab = this.setTab.bind(this);
    // this.setLoading = this.setLoading.bind(this);
  }

  setCountedWords(data) {
    console.log("setting counted words");
    this.setState({
      countedWords: data,
      loading: false,
    });
  }
  setTab(t) {
    this.setState({
      tab: t,
    });
  }
  processText(t) {
    console.log("sending plain text for processing");
    this.setState({
      text: t,
      loading: true,
    });
    // const wordCounter = new WordCounter(t, this.setCountedWords);
    // wordCounter.returnWordCountArray();
  }

  render() {
    return (
      <div
        style={{
          padding: "20px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "rgb(116, 147, 168)",
        }}
      >
        <Row style={{ width: "90%", position: "absolute" }}>
          <Router>
            <Col style={{ padding: 0 }}>
              <Switch>
                <Route exact path="/">
                  <TextTab></TextTab>
                  {/* <MainForm processText={this.processText}></MainForm> */}
                </Route>
                {/* <Route path="/json_editor">
                  <JSONtab></JSONtab>
                </Route> */}
                <Route path="/:tid">
                  <LinkViewer></LinkViewer>
                </Route>
              </Switch>
            </Col>
            {/* <Col sm={2} style={{ padding: 0 }}>
              <OptionsContainer tabCallback={this.setTab} />
            </Col> */}
          </Router>
        </Row>
      </div>
    );
  }
}

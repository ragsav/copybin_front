
import MainNavBar from "./components/navBar";

import './App.css';
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import EditorTab from "./components/link_generator/EditorTab";
// import LinkViewer from "./components/unused/LinkViewer";
import CodeViewer from "./components/link_generator/CodeViewer";
import Constants from "./constants/constants";
import EncryptDecrypt from "./components/encrypt decrypt/encrypt_decrypt";

function App() {
  return (
    <div
      className="App"
      style={{
        overflow: "scroll",
        backgroundColor: Constants.PRIMARY,
        padding: 10,
      }}
    >
      <Container style={{ padding: 0, height: "100%" }} fluid>
        <Row
          style={{ padding: 0, margin: 0, width: "100%", maxHeight: "100%" }}
        >
          <Col style={{ padding: 0, margin: 0 }}>
            <MainNavBar></MainNavBar>
          </Col>
        </Row>
        <Row
          style={{ padding: 0, margin: 0, width: "100%", maxHeight: "100%" }}
        >
          <Col style={{ padding: 0, margin: 0 }}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <EditorTab></EditorTab>
                </Route>
                <Route exact path="/link_generator">
                  <EditorTab></EditorTab>
                </Route>
                <Route exact path="/encrypt_decrypt">
                  <EncryptDecrypt></EncryptDecrypt>
                </Route>

                <Route exact path="/viewer/:tid">
                  <CodeViewer></CodeViewer>
                </Route>
              </Switch>

              {/* <Col sm={2} style={{ padding: 0 }}>
              <OptionsContainer tabCallback={this.setTab} />
            </Col> */}
            </Router>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

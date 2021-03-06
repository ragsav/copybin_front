import React from "react";
import { Alert, Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { useLoading, Audio, SpinningCircles, Grid } from "@agney/react-loading";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { useParams } from "react-router-dom";
const axios = require("axios");
const Loader = require("react-loader");
// import { FcSynchronize } from "react-icons/fc";
const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css",
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
/*eslint-disable no-alert, no-console */

export default class LinkViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      editedText: "",
      submitted: false,
      isPassword: false,
      editable: false,
      password: "",
      theme: "monokai",
      mode: "javascript",
      errors: [],
    };

    this.onTextChanged = this.onTextChanged.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.getInitData = this.getInitData.bind(this)
    this.setMode = this.setMode.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleProcess = this.handleProcess.bind(this);
  }

 
  componentDidMount() {
    // window.addEventListener("load", this.handleLoad);
    console.log("mounted");
    var url_comp = window.location.href.split("/");
          var currentUrlToken = url_comp[url_comp.length - 1];
          var self = this;
          axios({
            method: "get",
            headers: { "Content-Type": "application/json" },
            url:
              "https://copybinback.herokuapp.com/api/public/tapLink/" +

                 currentUrlToken,
          })
            .then(function (response) {
              console.log(response.data);
              console.log("response recieved");
              if (response.data.message === "please enter password") {
                self.setState({
                  isPassword: true,
                });
              } else {
                self.setState({
                  text: response.data.message,
                  editedText: response.data.message,
                  editable: response.data.editable,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
    // this.getInitData();
  }

  componentWillUnmount() {
    // window.removeEventListener("load", this.handleLoad);
  }

  setTheme = (e) => {
    this.setState({
      theme: e.target.value,
    });
  };
  setMode = (e) => {
    this.setState({
      mode: e.target.value,
    });
  };

  onTextChanged = (newText) => {
    this.setState({ editedText: newText });
    console.log(this.state.editedText);
  };

  handleGetText = (event) => {
    var url_comp = window.location.href.split("/");
    var currentUrlToken = url_comp[url_comp.length - 1];
    var self = this;
    const postObject = {
      tid: currentUrlToken,
      isPassword: this.state.isPassword,
      password: this.state.password,
    };
    this.setState({
      submitted: true,
    });
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "https://copybinback.herokuapp.com/api/public/openLink/",
      data: postObject,
    })
      .then(function (response) {
        console.log(response);

        if (response.data.success === true) {
          self.setState({
            text: response.data.message,
            editedText: response.data.message,
            editable: response.data.editable,
          });
        } else {
          alert("Wrong password");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Oops!Something went wrong!");
      });
    self.setState({
      submitted: false,
    });
    event.preventDefault();
  };
  onPasswordChanged = (event) => {
    console.log(this.state.password);
    this.setState({ password: event.target.value });
  };
  handleSubmit = (event) => {
    var self = this;
    var errors = [];
    if (this.state.text === "") {
      errors.push("text");
    }
    // if (this.state.title === "") {
    //   errors.push("title");
    // }
    // if (this.state.isPassword && this.state.password === "") {
    //   errors.push("password");
    // }
    this.setState({
      errors: errors,
    });
    // console.log(errors);
    // if (errors.length > 0) {
    //   // return false;
    //   event.preventDefault();
    // } else {
    //   this.setState({
    //     submitted: true,
    //   });
    //   // alert("everything good. submit form!");
    var url_comp = window.location.href.split("/");
    var currentUrlToken = url_comp[url_comp.length - 1];
    const postObject = {
      tid: currentUrlToken,
      text: this.state.editedText,
      isPassword: this.state.isPassword,
      password: this.state.password,
    };
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "https://copybinback.herokuapp.com/api/public/updateLink",
      data: postObject,
    })
      .then(function (response) {
        if (response.data.success === true) {
          self.setState({ text: self.state.editedText });
          alert("Text updated");
        } else {
          alert("Text not editable");
        }

        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    //   console.log("text submitted");
    //   console.log(postObject);
    self.setState({
      submitted: false,
    });
    event.preventDefault();
    // }
  };
  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }
  render() {
    return (
      <div>
        <Card
          style={{ height: "100%", margin: 0, borderRadius: 0, width: "100%" }}
        >
          <Container fluid style={{ padding: 4 }}>
            <Row style={{ padding: 0, margin: 0, height: "100%" }}>
              <Col sm={9} style={{ padding: 4, width: "100%", height: "100%" }}>
                <AceEditor
                  style={{ width: "100%", height: "550px" }}
                  //   placeholder={this.state.placeholder}
                  mode={this.state.mode}
                  theme={this.state.theme}
                  name="editor"
                  //   onLoad={this.onLoad}
                  onChange={this.onTextChanged}
                  //   onSelectionChange={this.onSelectionChange}
                  //   onCursorChange={this.onCursorChange}
                  //   onValidate={this.onValidate}
                  value={this.state.editedText}
                  //   fontSize={this.state.fontSize}
                  //   showPrintMargin={this.state.showPrintMargin}
                  //   showGutter={this.state.showGutter}
                  //   highlightActiveLine={this.state.highlightActiveLine}
                  setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                />
              </Col>
              <Col sm={3} style={{ padding: 0 }}>
                <Form style={{ width: "100%" }}>
                  <div style={{ padding: 4 }}></div>

                  <Row style={{ padding: 4 }}>
                    <Col>
                      {this.state.isPassword ? (
                        <Form.Control
                          size="sm"
                          type="password"
                          placeholder="Password"
                          onChange={this.onPasswordChanged}
                          style={{
                            fontSize: "small",
                            float: "right",
                            color: "rgb(153, 153, 153)",
                            backgroundColor: this.hasError("title")
                              ? "rgb(255, 236, 235)"
                              : "white",
                            border: this.hasError("title")
                              ? "1px solid red"
                              : "1px solid rgb(153, 153, 153)",
                          }}
                        />
                      ) : (
                        <Form.Control
                          size="sm"
                          type="password"
                          placeholder="Password"
                          readOnly
                          style={{ fontSize: "small", float: "right" }}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row style={{ padding: 4 }}>
                    <Col style={{}}>
                      {this.state.text === "" ? (
                        <Button
                          variant="success"
                          type="submit"
                          className="mr-1"
                          style={{
                            width: "100%",
                            fontSize: "small",
                            float: "left",
                            border: "none",
                            fontWeight: "600",
                            backgroundColor: "rgb(116, 147, 168)",
                          }}
                          onClick={this.handleGetText}
                        >
                          <Row>
                            <Col sm={10}>
                              {this.state.submitted
                                ? "Getting text..."
                                : "Get text"}
                            </Col>
                            <Col sm={2}>
                              <Grid
                                style={{
                                  visibility: this.state.submitted
                                    ? "visible"
                                    : "hidden",
                                }}
                                width="12"
                              />
                            </Col>
                          </Row>
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          type="submit"
                          className="mr-1"
                          disabled={!this.state.editable}
                          style={{
                            width: "100%",
                            fontSize: "small",
                            float: "left",
                            border: "none",
                            fontWeight: "600",
                            backgroundColor: "rgb(116, 147, 168)",
                          }}
                          onClick={this.handleSubmit}
                        >
                          <Row>
                            <Col sm={10}>
                              {this.state.submitted
                                ? "Updating text..."
                                : "Update text"}
                            </Col>
                            <Col sm={2}>
                              <Grid
                                style={{
                                  visibility: this.state.submitted
                                    ? "visible"
                                    : "hidden",
                                }}
                                width="12"
                              />
                            </Col>
                          </Row>
                        </Button>
                      )}
                    </Col>
                  </Row>

                  <Row style={{ padding: 4 }}>
                    <Col>
                      <Form.Control
                        as="select"
                        style={{
                          fontSize: "small",
                          border: "1px solid rgb(153, 153, 153)",
                          color: "rgb(153, 153, 153)",
                        }}
                        onChange={this.setMode}
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row style={{ padding: 4 }}>
                    <Col>
                      <Form.Control
                        as="select"
                        style={{
                          fontSize: "small",
                          border: "1px solid rgb(153, 153, 153)",
                          color: "rgb(153, 153, 153)",
                        }}
                        onChange={this.setTheme}
                      >
                        {themes.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <a
                        href="https://github.com/josdejong/jsoneditor"
                        style={{
                          textDecoration: "none",
                          fontSize: 10,
                          fontWeight: "400",
                          textAlign: "start",
                        }}
                      >
                        This editor is project by Josdejong on github
                      </a>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
    );
  }
}

// MainForm.propTypes = {
//   processText: React.PropTypes.array.isRequired,
// };

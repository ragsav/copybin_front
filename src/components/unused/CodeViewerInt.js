import React from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { Grid } from "@agney/react-loading";
import AceEditor from "react-ace";
import Footer from "../footer";
// import PostTab from "../PostTab";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
// import Ipfs from "ipfs";
// import useIpfs from "../IPFC hooks/use-ipfs";
// import useIpfsFactory from "../IPFC hooks/use-ipfs-factory";

const axios = require("axios");

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

// hookhelper = () =>{
// const { ipfs, ipfsInitError } = useIpfsFactory({ commands: ["id"] });
// const id = useIpfs(ipfs, "id");
// ["id", "agentVersion"].map((key) => console.log(id[key]));
// }
export default class CodeViewerInt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      editedText: "",
      submitted: false,
      isPassword: false,
      editable: false,
      password: "",
      textEditortheme: "monokai",
      textEditorMode: "javascript",
      errors: [],
    };

    this.onTextChanged = this.onTextChanged.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.getInitData = this.getInitData.bind(this)
    this.setTextEditorMode = this.setTextEditorMode.bind(this);
    this.setTextEditorTheme = this.setTextEditorTheme.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    // window.addEventListener("load", this.handleLoad);
    // console.log("mounted");
    // var url_comp = window.location.href.split("/");
    // var currentUrlToken = url_comp[url_comp.length - 1];
    // var self = this;
    // axios({
    //   method: "get",
    //   headers: { "Content-Type": "application/json" },
    //   url:
    //     "https://copybinback.herokuapp.com/api/public/tapLink/" +
    //     currentUrlToken,
    // })
    //   .then(function (response) {
    //     console.log(response.data);
    //     console.log("response recieved");
    //     if (response.data.message === "please enter password") {
    //       self.setState({
    //         isPassword: true,
    //       });
    //     } else {
    //       self.setState({
    //         text: response.data.message,
    //         editedText: response.data.message,
    //         editable: response.data.editable,
    //       });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // this.getInitData();
  }

  componentWillUnmount() {
    // window.removeEventListener("load", this.handleLoad);
  }

  setTextEditorTheme = (e) => {
    this.setState({
      textEditortheme: e.target.value,
    });
  };
  setTextEditorMode = (e) => {
    this.setState({
      textEditorMode: e.target.value,
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
    self.setState({
      submitted: true,
    });
    var errors = [];
    if (this.state.text === "") {
      errors.push("text");
    }

    this.setState({
      errors: errors,
    });

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
        <Col
          style={{
            // maxWidth:"100%",
            // left:"50px",
            // right:"50px",
            // padding: "30px",
            margin: "auto",

            // marginLeft:"5%",
            // marginRight:"5%",
            backgroundColor: "white",
            borderRadius: 0,
            maxWidth: "80%",
            minWidth: "450px",
            padding: 0,
            // margin: 0,
          }}
        >
          <Row
            style={{
              padding: "2% 0% 2% 0%",
              margin: "0% 0% 0% 0%",
            }}
          >
            <Col
              style={{
                padding: 4,
                margin: 0,
              }}
            >
              <Card
                style={{
                  height: "100%",
                }}
              >
                <Container fluid style={{ padding: 4, margin: 0 }}>
                  <Row style={{ padding: 0, margin: 0 }}>
                    <Col
                      sm={9}
                      style={{
                        padding: 4,
                        margin: 0,
                        // width: "100%",

                        height: "100%",
                      }}
                    >
                      <AceEditor
                        style={{
                          height: "550px",
                          width: "100%",
                          borderRadius: 4,
                          border: "1px solid #272822",
                        }}
                        placeholder="Your text here"
                        mode={this.state.textEditorMode}
                        theme={this.state.textEditortheme}
                        name="editor"
                        //   onLoad={this.onLoad}

                        value={this.state.editedText}
                        onChange={this.onTextChanged}
                        //   onSelectionChange={this.onSelectionChange}
                        //   onCursorChange={this.onCursorChange}
                        //   onValidate={this.onValidate}
                        // value={this.state.text}
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
                    <Col
                      sm={3}
                      style={{
                        padding: 0,
                        margin: 0,
                      }}
                    >
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
                                  fontSize: "13px",
                                  float: "left",
                                  border: "none",
                                  fontWeight: "500",
                                  color: "#04e000",
                                  backgroundColor: Constants.MONOKAI,
                                }}
                                onClick={this.handleGetText}
                              >
                                <Row>
                                  <Col sm={10} className="textStyleCode">
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
                                  fontSize: "13px",
                                  float: "left",
                                  border: "none",
                                  fontWeight: "500",
                                  color: "#04e000",
                                  backgroundColor: Constants.MONOKAI,
                                }}
                                onClick={this.handleSubmit}
                              >
                                <Row>
                                  <Col sm={10} className="textStyleCode">
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
                              onChange={this.setTextEditorMode}
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
                              onChange={this.setTextEditorTheme}
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
            </Col>
          </Row>

          <Row
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            <Col
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              <Footer></Footer>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

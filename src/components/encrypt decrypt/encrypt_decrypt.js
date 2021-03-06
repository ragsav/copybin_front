import React from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { Grid } from "@agney/react-loading";
import AceEditor from "react-ace";
import Footer from "../footer";
import Constants from "../../constants/constants";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
const axios = require("axios");
const crypto = require("crypto");
const passwordValidator = require("password-validator");
Constants.MODES.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

Constants.THEMES.forEach((theme) =>
  require(`ace-builds/src-noconflict/theme-${theme}`)
);

var iv = "whfowihohrrovhhvjqsvhdjjadsllv";
var passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(8)
  .is()
  .max(8)
  .has()
  .not()
  .symbols()
  .has()
  .not()
  .spaces();

function encodeText(text, key, iv) {
  var ivstring = iv.toString("hex").slice(0, 16);
  var key_string = crypto
    .createHash("sha256")
    .update(String(key))
    .digest("base64")
    .substr(0, 32);
  var cipher = crypto.createCipheriv("aes-256-cbc", key_string, ivstring);
  var encodedString = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encodedString;
}

function decodeText(text, key, iv) {
  var ivstring = iv.toString("hex").slice(0, 16);
  var key_string = crypto
    .createHash("sha256")
    .update(String(key))
    .digest("base64")
    .substr(0, 32);
  var decipher = crypto.createDecipheriv("aes-256-cbc", key_string, ivstring);
  var decodedText =
    decipher.update(text, "hex", "utf8") + decipher.final("utf8");

  return decodedText;
}
function makeTextFile(text) {
  var data = new Blob([text], { type: "text/plain" });

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  var textFile;
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);

  // returns a URL you can use as a href
  return textFile;
}

export default class EncryptDecrypt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      password: "",
      type: "file",
      process: "encrypt",
      isPassword: false,
      submitted: false,
      file: "",
      fileLink: "",
      textEditortheme: Constants.DEFAULTTHEME,
      textEditorMode: Constants.DEFAULTMODE,
      errors: [],
    };

    this.onTextChanged = this.onTextChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onCheckBoxClicked = this.onCheckBoxClicked.bind(this);
    this.onProcessChanged = this.onProcessChanged.bind(this);
    this.setTextEditorMode = this.setTextEditorMode.bind(this);
    this.setTextEditorTheme = this.setTextEditorTheme.bind(this);
    this.onFileDropped = this.onFileDropped.bind(this);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  onTextChanged = (newText) => {
    this.setState({ text: newText });
    // console.log(this.state.editedText);
  };
  onPasswordChanged = (event) => {
    console.log(this.state.password);
    this.setState({ password: event.target.value });
  };
  onCheckBoxClicked = () => {
    this.setState({ isPassword: !this.state.isPassword });
  };
  onFileDropped = (file, text) => {
    this.setState({ file: text });
  };
  onProcessChanged = (event) => {
    this.setState({ process: event.target.value });
  };
  onTypeChanged = (event) => {
    this.setState({ type: event.target.value });
  };

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

  handleProcessFile = (e) => {
    e.preventDefault();
    var contents = this.state.file;
    if (contents === "") {
      return;
    }

    if (passwordSchema.validate(this.state.password)) {
      if (this.state.process === "encrypt") {
        var encodedText = encodeText(contents, this.state.password, iv);

        this.setState({
          fileLink: makeTextFile(encodedText),
        });
      } else {
        var decodedText = decodeText(contents, this.state.password, iv);
        this.setState({
          fileLink: makeTextFile(decodedText),
        });
      }
    } else {
      alert("Password not valid");
    }
  };

  handleProcessText = (event) => {
    event.preventDefault();
    if (passwordSchema.validate(this.state.password)) {
      if (this.state.process === "encrypt") {
        var encodedText = encodeText(this.state.text, this.state.password, iv);
        this.setState({
          text: encodedText,
        });
      } else {
        var decodedText = decodeText(this.state.text, this.state.password, iv);
        this.setState({
          text: decodedText,
        });
      }
      console.log(this.state.text);
    } else {
      alert("Password not valid");
    }
  };

  render() {
    return (
      <div>
        <Col
          style={{
            margin: "auto",
            backgroundColor: "white",
            borderRadius: 0,
            width: "1024px",
            padding: 4,
          }}
        >
          <Row
            style={{
              padding: 4,
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
                    <Card
                      className="textStyleCode"
                      style={{
                        width: "100%",
                        backgroundColor: Constants.PRIMARY,

                        // border: "none",
                        borderRadius: 4,
                        padding: 4,
                        fontSize: "13px",
                        fontWeight: "500",
                        color: Constants.SECONDARY,
                        margin: 4,
                      }}
                    >
                      <Row style={{ padding: 0, margin: 0 }}>
                        <Col
                          style={{ padding: 4, margin: 0, textAlign: "start" }}
                        >
                          {Constants.ENCRYPTDECRYPTHEADING}
                        </Col>
                      </Row>
                    </Card>
                  </Row>
                  <Row style={{ padding: 0, margin: 0 }}>
                    <Col
                      xs={{ span: 12 }}
                      sm={{ span: 12 }}
                      md={{ span: 12 }}
                      lg={{ span: 9 }}
                      xl={{ span: 9 }}
                      style={{
                        padding: 4,
                        margin: 0,
                        // width: "100%",

                        height: "100%",
                      }}
                    >
                      {this.state.type === "file" ? (
                        <StyledDropZone
                          style={{
                            height: "450px",
                            width: "100%",
                            backgroundColor: Constants.TERTIARY,
                          }}
                          onDrop={(file, text) =>
                            this.onFileDropped(file, text)
                          }
                        />
                      ) : (
                        <AceEditor
                          style={{
                            height: "440px",
                            width: "100%",
                            borderRadius: 4,
                            border: `1px solid ${Constants.MONOKAI}`,
                          }}
                          placeholder="Your text here"
                          mode={this.state.textEditorMode}
                          theme="xcode"
                          value={this.state.text}
                          onChange={this.onTextChanged}
                          setOptions={{
                            useWorker: false,
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                          }}
                        />
                      )}
                    </Col>
                    <Col
                      xs={{ span: 12 }}
                      sm={{ span: 12 }}
                      md={{ span: 12 }}
                      lg={{ span: 3 }}
                      xl={{ span: 3 }}
                      style={{
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <Form style={{ width: "100%" }}>
                        <div style={{ padding: 4 }}>
                          {this.state.type === "file" ? (
                            <a href={this.state.fileLink} download>
                              Download file
                            </a>
                          ) : null}
                        </div>
                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
                            <Form.Control
                              as="select"
                              style={{
                                fontSize: "small",
                                border: `1px solid ${Constants.SECONDARY}`,
                                color: "rgb(153, 153, 153)",
                              }}
                              onChange={this.onTypeChanged}
                            >
                              <option value="file">File</option>
                              <option value="text">Text</option>
                            </Form.Control>
                          </Col>
                        </Row>
                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
                            <Form.Control
                              as="select"
                              style={{
                                fontSize: "small",
                                border: `1px solid ${Constants.SECONDARY}`,
                                color: "rgb(153, 153, 153)",
                              }}
                              onChange={this.onProcessChanged}
                            >
                              <option value="encrypt">Encrypt</option>
                              <option value="decrypt">Decrypt</option>
                            </Form.Control>
                          </Col>
                        </Row>
                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
                            <Form.Check
                              type="checkbox"
                              checked={this.state.isPassword}
                              onChange={this.onCheckBoxClicked}
                              label="Password Enabled"
                              style={{
                                fontSize: "small",
                                float: "left",
                                color: Constants.MONOKAI,
                                fontWeight: "600",
                              }}
                            />
                          </Col>
                        </Row>
                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
                            {this.state.isPassword ? (
                              <Form.Control
                                size="sm"
                                type="password"
                                placeholder="Password"
                                onChange={this.onPasswordChanged}
                                style={{
                                  fontSize: "small",
                                  float: "right",
                                  color: Constants.MONOKAI,
                                  backgroundColor: "white",
                                  border: `2px solid ${Constants.SECONDARY}`,
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
                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
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
                                color: Constants.TERTIARY,
                                // boxShadow: "1px 3px 1px #9E9E9E",
                                backgroundColor: Constants.SECONDARY,
                              }}
                              onClick={
                                this.state.type === "file"
                                  ? this.handleProcessFile
                                  : this.handleProcessText
                              }
                            >
                              {this.state.submitted ? (
                                <Row>
                                  <Col>
                                    <Grid width="20" height="20" />
                                  </Col>
                                </Row>
                              ) : (
                                <Row>
                                  <Col className="textStyleCode">
                                    {this.state.process === "encrypt"
                                      ? "Encrypt"
                                      : "Decrypt"}
                                  </Col>
                                </Row>
                              )}
                            </Button>
                          </Col>
                        </Row>
                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
                            <Form.Control
                              as="select"
                              disabled={this.state.type === "file"}
                              style={{
                                fontSize: "small",
                                border: `1px solid ${Constants.SECONDARY}`,
                                color: Constants.MONOKAI,
                              }}
                              onChange={this.setTextEditorMode}
                            >
                              {Constants.MODES.map((lang) => (
                                <option key={lang} value={lang}>
                                  {lang}
                                </option>
                              ))}
                            </Form.Control>
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

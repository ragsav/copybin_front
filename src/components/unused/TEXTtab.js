import React from "react";
import {Form, Button, Card, Row, Col } from "react-bootstrap";
import {Grid } from "@agney/react-loading";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

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


export default class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      text: "",
      title: "",
      password: "",
      burn: -1,
      expiry: 3600,
      editable: false,
      isPassword: false,
      link: "",
      submitted: false,
      textEditortheme: "monokai",

      textEditorMode: "json",

      errors: [],
    };

    this.onCheckBoxClicked = this.onCheckBoxClicked.bind(this);
    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.onBurnChanged = this.onBurnChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onExpiryChanged = this.onExpiryChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLinkRecieved = this.onLinkRecieved.bind(this);
    this.setTextEditorMode = this.setTextEditorMode.bind(this);

    this.setTextEditorTheme = this.setTextEditorTheme.bind(this);
    this.onEditableChanged = this.onEditableChanged.bind(this);

  }

  onEditableChanged = (e) => {
    this.setState({
      editable: !this.state.editable,
    });
    console.log(this.state.editable);
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

  onCheckBoxClicked = () => {
    this.setState({ isPassword: !this.state.isPassword });
  };
  onTitleChanged = (event) => {
    this.setState({ title: event.target.value });
  };
  onTextChanged = (newText) => {
    this.setState({ text: newText });
    console.log(this.state.text);
  };
  onBurnChanged = (event) => {
    this.setState({ burn: event.target.value });
  };
  onPasswordChanged = (event) => {
    console.log(this.state.password);
    this.setState({ password: event.target.value });
  };
  onExpiryChanged = (event) => {
    this.setState({ expiry: parseInt(event.target.value) });
  };
  onLinkRecieved = (url) => {
    this.setState({
      link: url,
    });
  };

  handleSubmit = (event) => {
    var self = this;
    var errors = [];
    if (this.state.text === "") {
      errors.push("text");
    }
    if (this.state.title === "") {
      errors.push("title");
    }
    if (this.state.isPassword && this.state.password === "") {
      errors.push("password");
    }

    this.setState({
      errors: errors,
    });

    console.log(errors);
    if (errors.length > 0) {
      // return false;

      event.preventDefault();
    } else {
      this.setState({
        submitted: true,
      });
      // alert("everything good. submit form!");
      const postObject = {
        text: this.state.text,
        expiry: parseInt(this.state.expiry),
        isPassword: this.state.isPassword,
        password: this.state.password,
        editable: this.state.editable,
      };

      axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "https://copybinback.herokuapp.com/api/public/generateLink",
        data: postObject,
      })
        .then(function (response) {
          console.log(response.data.url);
          self.setState({
            link: response.data.url,
            submitted: false,
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log("text submitted");
      console.log(postObject);
      event.preventDefault();
    }
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }
  render() {
    return (
      <div>
        <Card
          border="none"
          style={{ height: "100%", margin: 0, borderRadius: 0, width: "100%" }}
        >
          <Row style={{ padding: 0, margin: 0 }}>
            <Col sm={9} style={{ padding: 0, margin: 0 }}>
              <AceEditor
                style={{ width: "100%", height: "100%" }}
                placeholder="Your text here"
                mode={this.state.textEditorMode}
                theme={this.state.textEditortheme}
                name="editor"
                //   onLoad={this.onLoad}
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
            <Col sm={3} style={{ padding: 0, margin: 0 }}>
              <Form style={{ width: "100%" }}>
                <Col style={{ padding: 0, margin: 0 }}>
                  <div style={{ padding: 4 }}></div>
                  <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                    <Col style={{ padding: 0 }}>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        style={{
                          fontSize: "small",
                          color: "rgb(153, 153, 153)",
                          backgroundColor: this.hasError("title")
                            ? "rgb(255, 236, 235)"
                            : "white",
                          border: this.hasError("title")
                            ? "1px solid red"
                            : "1px solid rgb(153, 153, 153)",
                        }}
                        onChange={this.onTitleChanged}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                    <Col style={{ padding: 0 }}>
                      <Form.Control
                        as="select"
                        style={{
                          fontSize: "small",
                          border: "1px solid rgb(153, 153, 153)",
                          color: "rgb(153, 153, 153)",
                        }}
                        onChange={this.onExpiryChanged}
                      >
                        <option value="600">10 minutes</option>
                        <option value="3600">1 hour</option>
                        <option value="86400">1 day</option>
                        <option value="604800">1 weak</option>
                        <option value="1209600">2 weaks</option>
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                    <Col style={{ padding: 0 }}>
                      <Form.Control
                        type="number"
                        placeholder="Enter reads to burn"
                        style={{
                          fontSize: "small",
                          border: "1px solid rgb(153, 153, 153)",
                          color: "rgb(153, 153, 153)",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                    <Col style={{ padding: 0 }}>
                      <Form.Check
                        type="checkbox"
                        onChange={this.onEditableChanged}
                        label="Editable"
                        style={{
                          fontSize: "small",
                          float: "left",
                          color: "rgb(153, 153, 153)",
                          fontWeight: "600",
                        }}
                      />
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
                          color: "rgb(153, 153, 153)",
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
                  <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                    <Col style={{ padding: 0 }}>
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
                        onClick={this.handleSubmit}
                      >
                        {this.state.submitted ? (
                          <Row>
                            <Col sm={10}>Generating link...</Col>
                            <Col sm={2}>
                              <Grid width="12" />
                            </Col>
                          </Row>
                        ) : (
                          <Row>
                            <Col>Generate link</Col>
                          </Row>
                        )}
                      </Button>
                    </Col>
                  </Row>
                  <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                    <Col style={{ padding: 0 }}>
                      <Form.Group>
                        <Form.Control
                          value={this.state.link}
                          placeholder="Link will be generated here"
                          style={{
                            fontSize: "small",
                            border:
                              this.state.link === ""
                                ? "1px solid white"
                                : "1px solid rgb(191, 212, 227)",
                            boxShadow:
                              this.state.link === ""
                                ? "null"
                                : "0 0 10px rgb(191, 212, 227)",
                            backgroundColor: "rgb( 211, 229, 242)",
                          }}
                          as="textarea"
                          rows={4}
                          size="sm"
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                    <Col style={{ padding: 0 }}>
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
                  <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                    <Col style={{ padding: 0 }}>
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

                  <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                    <Col style={{ padding: 0 }}>
                      <a
                        href="https://github.com/josdejong/jsoneditor"
                        style={{
                          
                          textDecoration: "none",
                          fontSize: 10,
                          fontWeight: "400",
                          
                        }}
                      >
                        This json editor is project by Josdejong on github
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}



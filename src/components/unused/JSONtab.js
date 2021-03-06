import React from "react";
import { useLoading, Audio, SpinningCircles, Grid } from "@agney/react-loading";
import { Alert, Form, Button, Card, Row, Col } from "react-bootstrap";
// import { JsonEditor as Editor } from "jsoneditor-react";
// import "jsoneditor-react/es/editor.min.css";

// import "brace";
// import "brace/mode/json";
// import "brace/theme/github";
// import ace from "brace";
// import Ajv from "ajv";

import { JsonEditor } from "jsoneditor-react";
import JSONEditorReact from "./JSONEditorReact";

const axios = require("axios");
const schema = {
  title: "Example Schema",
  type: "object",
  properties: {
    array: {
      type: "array",
      items: {
        type: "number",
      },
    },
    boolean: {
      type: "boolean",
    },
    number: {
      type: "number",
    },
  },
  required: ["array", "string", "boolean"],
};

const json = {
  array: [1, 2, 3],
  boolean: true,
  null: null,
  number: "four",
  object: { a: "b", c: "d" },
  string: "Hello World",
};

const modes = ["tree", "form", "view", "code", "text"];

export default class JSONtab extends React.Component {
  setJsonEditorRef = (instance) => (this.editor = instance);
  constructor(props) {
    super(props);
    this.state = {
      schema,
      text: JSON.stringify(json, null, 2),
      mode: "tree",
      title: "",
      password: "",
      burn: -1,
      editable:false,
      expiry: 3600,
      isPassword: false,
      link: "",
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
    this.onEditableChanged = this.onEditableChanged.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleProcess = this.handleProcess.bind(this);
  }
  
  componentDidMount() {
    console.log("mounted json tab");
    if (this.editor) {
      this.transformEditorOnTreeView();
    }
  }

  componentDidUpdate() {
    if (this.editor) {
      this.transformEditorOnTreeView();
    }
  }

  transformEditorOnTreeView() {
    const jsonEditor = this.editor.jsonEditor;
    const node = this.editor.htmlElementRef;

    if (jsonEditor.getMode() !== "tree") return;

    // Your manipulations with dom
  }
  onEditableChanged = (e) => {
    this.setState({
      editable: !this.state.editable,
    });
    console.log(this.state.editable);
  };
  onCheckBoxClicked = () => {
    this.setState({ isPassword: !this.state.isPassword });
  };
  onTitleChanged = (event) => {
    this.setState({ title: event.target.value });
  };
  onTextChanged = (event) => {
    this.setState({ text: event.target.value });
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
    console.log(window.location.href);
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
        editable:this.state.editable,
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
  componentDidMount() {
    console.log("json tab mounted");
    // window.addEventListener("load", this.handleLoad);
  }
  render() {
    return (
      <Card
        border="none"
        style={{ height: "550px", margin: 0, borderRadius: 0, padding: 0 }}
      >
        <Row style={{ padding: 0, margin: 0, height: "100%" }}>
          <Col sm={9} style={{ padding: 4, margin: 0, height: "100%" }}>
            <div style={{ padding: 0, margin: 0, height: "100%" }}>
              <div style={{ backgroundColor: "white", height: "100%" }}>
                <JSONEditorReact
                  schema={this.state.schema}
                  text={this.state.text}
                  mode={this.state.mode}
                  modes={modes}
                  indentation={4}
                  onChangeText={this.onChangeText}
                  onModeChange={this.onModeChange}
                />
              </div>
            </div>
          </Col>
          <Col sm={3} style={{ padding: 0 }}>
            <Form style={{ width: "100%" }}>
              <div style={{ padding: 4 }}></div>
              <Row style={{ padding: 4 }}>
                <Col>
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
              <Row style={{ padding: 4 }}>
                <Col>
                  <Form.Control
                    as="select"
                    style={{
                      fontSize: "small",
                      border: "1px solid rgb(153, 153, 153)",
                      color: "rgb(153, 153, 153)",
                    }}
                  >
                    <option value="600">10 minutes</option>
                    <option value="3600">1 hour</option>
                    <option value="86400">1 day</option>
                    <option value="604800">1 weak</option>
                    <option value="1209600">2 weaks</option>
                  </Form.Control>
                </Col>
              </Row>
              <Row style={{ padding: 4 }}>
                <Col>
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
              <Row style={{ padding: 4 }}>
                <Col>
                  <Form.Check
                    type="checkbox"
                    //   checked={this.state.editable}
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
              <Row style={{ padding: 4 }}>
                <Col>
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
                    <Row>
                      <Col sm={10}>
                        {this.state.submitted
                          ? "Generating Link..."
                          : "Generate Link"}
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
                </Col>
              </Row>
              <Row style={{ padding: 4 }}>
                <Col>
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
                      rows={10}
                      size="sm"
                      readOnly
                      // value={this.state.text}
                      // onChange={this.handleChange}
                    />
                  </Form.Group>
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
      </Card>
    );
  }
}

// MainForm.propTypes = {
//   processText: React.PropTypes.array.isRequired,
// };

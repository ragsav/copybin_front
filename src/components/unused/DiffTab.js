import React from "react";
import { useLoading, Audio, SpinningCircles, Grid } from "@agney/react-loading";
import { Alert, Form, Button, Card, Row, Col } from "react-bootstrap";
import { diff as DiffEditor } from "react-ace";
import "./Diff.css";
import "ace-builds/src-noconflict/theme-github";

const axios = require("axios");

const defaultValue = [
  `// Use this tool to display differences in code.
// Deletions will be highlighted on the left, insertions highlighted on the right.`,
  `// Use this too to show difference in code.
// Deletions will be highlighted on the left, insertions highlighted on the right.
// The diff highlighting style can be altered in CSS.
`,
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
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
export default class DiffViewer extends React.Component {
  //   setJsonEditorRef = (instance) => (this.editor = instance);
  constructor(props) {
    super(props);
    this.state = {
      value: ["Test code differences", "Test code difference"],
      fontSize: 14,
      markers: {},
      theme: "monokai",
      mode: "javascript",
    };
    this.onChange = this.onChange.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setTheme = this.setTheme.bind(this);
  }

  onChange = (newValue) => {
    this.setState({
      value: newValue,
    });
  };

  setMode = (e) => {
    this.setState({
      mode: e.target.value,
    });
  };
  setTheme = (e) => {
    this.setState({
      theme: e.target.value,
    });
  };
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
        <Row
          style={{
            padding: 0,
            margin: 0,
            backgroundColor: "#363636",
          }}
        >
          <Col sm={2} style={{ padding: 4 }}>
            <Form.Control
              as="select"
              style={{
                padding: 1,
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

          <Col sm={2} style={{ padding: 4 }}>
            <Form.Control
              as="select"
              style={{
                padding: 1,
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
        <Row style={{ padding: 0, margin: 0, height: "100%" }}>
          <DiffEditor
            value={this.state.value}
            height="100%"
            width="100%"
            mode={this.state.mode}
            theme={this.state.theme}
            onChange={this.onChange}
            setOptions={{
              useWorker: false,
            }}
          />
        </Row>
      </Card>
    );
  }
}

// MainForm.propTypes = {
//   processText: React.PropTypes.array.isRequired,
// };

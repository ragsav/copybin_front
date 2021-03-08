import { Grid } from "@agney/react-loading";

// import ReCAPTCHA from "react-google-recaptcha";
// import FileHandler from "./encrypt_decrypt";
import Captcha from "captcha-image";
import React from "react";
import AceEditor from "react-ace";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Constants from "../../constants/constants";
import Footer from "../footer";
import Products from "../products";
import PostTab from "./PostTab";

const axios = require("axios");

Constants.MODES.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

Constants.THEMES.forEach((theme) =>
  require(`ace-builds/src-noconflict/theme-${theme}`)
);

// hookhelper = () =>{
// const { ipfs, ipfsInitError } = useIpfsFactory({ commands: ["id"] });
// const id = useIpfs(ipfs, "id");
// ["id", "agentVersion"].map((key) => console.log(id[key]));
// }
const captchaImage = new Captcha(
  "35px Arial",
  "center",
  "middle",
  300,
  150,
  "#eee",
  "#111",
  6
).createImage();

function createMarkup(source) {
  return { __html: source };
}
export default class EditorTab extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.state = {
      // ipfs: null,
      text: "",
      title: "",
      password: "",
      burn: -1,
      expiry: 3600,
      editable: false,
      isPassword: false,
      link: "",
      submitted: false,
      textEditortheme: Constants.DEFAULTTHEME,
      public: false,
      textEditorMode: Constants.DEFAULTMODE,

      errors: [],
    };

    this.onCheckBoxClicked = this.onCheckBoxClicked.bind(this);
    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.onBurnChanged = this.onBurnChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onExpiryChanged = this.onExpiryChanged.bind(this);
    this.handleAppServerSubmit = this.handleAppServerSubmit.bind(this);
    this.onLinkRecieved = this.onLinkRecieved.bind(this);
    this.setTextEditorMode = this.setTextEditorMode.bind(this);
    this.onPublicChanged = this.onPublicChanged.bind(this);
    this.setTextEditorTheme = this.setTextEditorTheme.bind(this);
    this.onEditableChanged = this.onEditableChanged.bind(this);
  }
  // componentCleanup() {
  //   if (this.state.ipfs && this.state.ipfs.stop) {
  //     console.log("Stopping IPFS");
  //     this.state.ipfs.stop().catch((err) => console.error(err));
  //     this.setState({
  //       ipfs: null,
  //     });
  //   }
  // }

  componentWillUnmount() {
    // this.componentCleanup();
  }
  componentDidMount() {
    // var word="hello"
    // const canvas = this.canvasRef.current;
    // const context = canvas.getContext("2d");
    // // for(var i = 0; i < word.length; i++) {
    // //   context.transform(
    // //     Math.random(),
    // //     Math.random(),
    // //     Math.random(),
    // //     Math.random(),
    // //     Math.random(),
    // //     Math.random()
    // //   );
    // // }
    // context.transform(
    //   1 - Math.random(),
    //   Math.random(),
    //   Math.random(),
    //   1 + Math.random(),
    //   Math.random(),
    //   Math.random()
    // );
    // // context.setTransform(1,0, 0, 1, 0, 0);
    // context.font = "30px Arial";
    // context.fillText(word, 10, 50);
    //Our first draw
    // context.fillStyle = "#000000";
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    // window.addEventListener("beforeunload", this.componentCleanup);
  }
  onEditableChanged = (e) => {
    this.setState({
      editable: !this.state.editable,
    });
    console.log(this.state.editable);
  };
  onPublicChanged = (e) => {
    this.setState({
      public: !this.state.public,
    });
    console.log(this.state.public);
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

  handleAppServerSubmit = (event) => {
    event.preventDefault();

    var self = this;
    var errors = [];
    if (this.state.text === "") {
      errors.push("text");
      alert("Enter some text");
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
    } else {
      this.setState({
        submitted: true,
      });
      // alert("everything good. submit form!");
      const postObject = {
        title: this.state.title,
        public: this.state.public,
        text: this.state.text.toString(),
        burn: this.state.burn,
        expiry: parseInt(this.state.expiry),
        isPassword: this.state.isPassword,
        password: this.state.isPassword ? this.state.password : "",
        editable: this.state.editable,
      };

      axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: Constants.SERVERHOST + "/api/public/generateLink",
        data: postObject,
      })
        .then(function (response) {
          console.log(response.data);
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
    }
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }
  render() {
    return (
      <div style={{}}>
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
            width: "1024px",
            padding: 4,
            // margin: 0,
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
                          {Constants.PASTE}
                        </Col>
                      </Row>
                    </Card>
                  </Row>
                  <Row style={{ padding: 0, margin: 0 }}>
                    <Col
                      xs={{ span: 12 }}
                      sm={{ span: 12 }}
                      md={{ span: 9 }}
                      lg={{ span: 9 }}
                      xl={{ span: 9 }}
                      style={{
                        padding: 4,
                        margin: 0,
                        // width: "100%",

                        height: "100%",
                      }}
                    >
                      <AceEditor
                        style={{
                          height: "450px",
                          width: "100%",
                          borderRadius: 4,
                          border: `1px solid ${Constants.MONOKAI}`,
                        }}
                        placeholder="Your text here"
                        mode={this.state.textEditorMode}
                        theme="xcode"
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
                    </Col>
                    <Col
                      xs={{ span: 12 }}
                      sm={{ span: 12 }}
                      md={{ span: 3 }}
                      lg={{ span: 3 }}
                      xl={{ span: 3 }}
                      style={{
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <Form style={{ width: "100%" }}>
                        <div style={{ padding: 4 }}></div>
                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
                            <Form.Check
                              type="checkbox"
                              onChange={this.onPublicChanged}
                              label="Public"
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
                            <Form.Control
                              type="text"
                              placeholder="Title"
                              style={{
                                fontSize: "small",
                                color: Constants.MONOKAI,
                                backgroundColor: this.hasError("title")
                                  ? "rgb(255, 236, 235)"
                                  : "white",
                                border: this.hasError("title")
                                  ? "1px solid red"
                                  : `1px solid ${Constants.SECONDARY}`,
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
                                border: `1px solid ${Constants.SECONDARY}`,
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
                                border: `1px solid ${Constants.SECONDARY}`,
                                color: Constants.MONOKAI,
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
                                color: Constants.MONOKAI,
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
                                  backgroundColor: this.hasError("title")
                                    ? "rgb(255, 236, 235)"
                                    : "white",
                                  border: this.hasError("title")
                                    ? "1px solid red"
                                    : `2px solid ${Constants.SECONDARY}`,
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
                              onClick={this.handleAppServerSubmit}
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
                                    {Constants.GENERATELINK}
                                  </Col>
                                </Row>
                              )}
                            </Button>
                          </Col>
                        </Row>

                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0, margin: 0 }}>
                            <Form.Group>
                              <Form.Control
                                value={this.state.link}
                                placeholder="Link will be generated here"
                                style={{
                                  fontSize: "small",
                                  border:
                                    this.state.link === ""
                                      ? "1px solid white"
                                      : `2px solid ${Constants.SECONDARY}`,
                                  boxShadow:
                                    this.state.link === ""
                                      ? "null"
                                      : "0 0 10px rgb(191, 212, 227)",
                                  backgroundColor: Constants.PRIMARY,
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
                        {/* <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
                            <Form.Control
                              as="select"
                              style={{
                                fontSize: "small",
                                border: `1px solid ${Constants.SECONDARY}`,
                                color: Constants.MONOKAI,
                              }}
                              onChange={this.setTextEditorTheme}
                            >
                              {Constants.THEMES.map((lang) => (
                                <option key={lang} value={lang}>
                                  {lang}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row> */}

                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
                            <div />
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
              padding: 4,
              margin: 0,
            }}
          >
            <Col
              style={{
                padding: 4,
                margin: 0,
              }}
            >
              <PostTab></PostTab>
            </Col>
          </Row>
          <Row
            style={{
              padding: 4,
              margin: 0,
            }}
          >
            <Col
              style={{
                padding: 4,
                margin: 0,
              }}
            >
              <Products></Products>
            </Col>
          </Row>
          <Row
            style={{
              padding: 4,
              margin: 0,
            }}
          >
            <Col
              style={{
                padding: 4,
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

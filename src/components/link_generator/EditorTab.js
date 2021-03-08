import { Grid } from "@agney/react-loading";

// import ReCAPTCHA from "react-google-recaptcha";
// import FileHandler from "./encrypt_decrypt";
import Captcha from "../captcha/captcha";
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



function createMarkup(source) {
  return { __html: source };
}
export default class EditorTab extends React.Component {
  constructor(props) {
    super(props);
    // this.canvasRef = React.createRef();
    
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
      captcha: "",
      isBot: true,
      errors: [],
    };

    this.canvas = React.createRef();
    this.captchaRef = React.createRef();

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
    this.checkIsBot = this.checkIsBot.bind(this);
    this.getImgValidCode = this.getImgValidCode.bind(this);
    this.onCaptchaChanged = this.onCaptchaChanged.bind(this);
  }

  componentWillUnmount() {
    // this.componentCleanup();
  }

  componentDidMount() {
    this.getImgValidCode();
  }

  getImgValidCode = () => {
    let showNum = [];
    let canvasWinth = 200;
    let canvasHeight = 30;

    const canvas = this.canvas.current;
    const context = canvas.getContext("2d");

    canvas.width = canvasWinth;
    canvas.height = canvasHeight;

    let sCode = this.props.specialChar
      ? "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9,!,@,#,$,%,^,&,*,(,)"
      : "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9";
    let saCode = sCode.split(",");
    let saCodeLen = saCode.length;
    for (let i = 0; i <= 3; i++) {
      let sIndex = Math.floor(Math.random() * saCodeLen);
      let sDeg = (Math.random() * 30 * Math.PI) / 180;
      let cTxt = saCode[sIndex];
      showNum[i] = cTxt;
      let x = 10 + i * 20;
      let y = 20 + Math.random() * 8;
      context.font = "bold 23px 微软雅黑";
      context.translate(x, y);
      context.rotate(sDeg);

      context.fillStyle = this.randomColor();
      context.fillText(cTxt, 0, 0);

      context.rotate(-sDeg);
      context.translate(-x, -y);
    }
    for (let i = 0; i <= 5; i++) {
      context.strokeStyle = this.randomColor();
      context.beginPath();
      context.moveTo(Math.random() * canvasWinth, Math.random() * canvasHeight);
      context.lineTo(Math.random() * canvasWinth, Math.random() * canvasHeight);
      context.stroke();
    }
    for (let i = 0; i < 30; i++) {
      context.strokeStyle = this.randomColor();
      context.beginPath();
      let x = Math.random() * canvasWinth;
      let y = Math.random() * canvasHeight;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
    // context.fillStyle = "white";
    var rightCode = showNum.join("");
    this.setState({
      captcha: rightCode,
    });
  };

  randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  onEditableChanged = (e) => {
    this.setState({
      editable: !this.state.editable,
    });
   
  };

  onPublicChanged = (e) => {
    this.setState({
      public: !this.state.public,
    });
   
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

  onCaptchaChanged = (event) => {
    this.setState({ captcha: event.target.value });
  };

  onTextChanged = (newText) => {
    this.setState({ text: newText });
    
  };

  onBurnChanged = (event) => {
    this.setState({ burn: event.target.value });
  };

  onPasswordChanged = (event) => {
    
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

    
    if (this.state.captcha !== this.captchaRef.current.value) {
    
      errors.push("Not human");
    }
    this.setState({
      errors: errors,
    });

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
          
          self.setState({
            link: response.data.url,
            submitted: false,
          });
        })
        .catch(function (error) {
          
        });

     
    }
  };

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  checkIsBot = (isBot) => {
    this.setState({ isBot: isBot });
  };

  render() {
    return (
      <div style={{}}>
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
                        {/* <Row style={{ padding: 4, width: "100%", margin: 0 }}>
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
                        </Row> */}
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
                            <canvas
                              id="valicode"
                              ref={this.canvas}
                              style={{
                                width: "100%",
                                backgroundColor: "white",
                                border: `1px solid ${Constants.SECONDARY}`,
                                borderRadius: 4,
                              }}
                            ></canvas>
                          </Col>
                        </Row>
                        <Row style={{ padding: 4, width: "100%", margin: 0 }}>
                          <Col style={{ padding: 0 }}>
                            <Form.Control
                              type="text"
                              placeholder="Enter captcha"
                              ref={this.captchaRef}
                              style={{
                                fontSize: "small",
                                color: Constants.MONOKAI,
                                backgroundColor: this.hasError("Not human")
                                  ? "rgb(255, 236, 235)"
                                  : "white",
                                border: this.hasError("Not human")
                                  ? "1px solid red"
                                  : `1px solid ${Constants.SECONDARY}`,
                              }}
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
                                rows={2}
                                size="sm"
                                readOnly
                              />
                            </Form.Group>
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

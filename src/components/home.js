import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Constants from "../constants/constants";
import Footer from "./footer";


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.state = {};
  }

  componentWillUnmount() {}
  componentDidMount() {}

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
                          {Constants.HOME}
                        </Col>
                      </Row>
                    </Card>
                  </Row>
                  <Row style={{ padding: 0, margin: 0, marginTop: 20 }}>
                    <Col style={{ padding: 0, margin: 0, textAlign: "start" }}>
                      <ul>
                        <li key={"lg"} style={{ padding: 4, fontSize: 16 }}>
                          <a href={Constants.HOST + "link_generator"}>
                            <strong>LINK GENERATION</strong>
                          </a>
                          <ul>
                            <li style={{ padding: 4, fontSize: 12 }}>
                              Anonymously generate short lived links for your
                              code or text
                            </li>
                          </ul>
                        </li>
                        <li key={"ed"} style={{ padding: 4, fontSize: 16 }}>
                          <a href={Constants.HOST + "encrypt_decrypt"}>
                            <strong>ENCRYPT / DECRYPT</strong>
                          </a>
                          <ul>
                            <li style={{ padding: 4, fontSize: 12 }}>
                              Encrypt/Decrypt any file or text with no server
                              side uploading
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                  <Row style={{ padding: 0, margin: 0, marginTop: 20 }}>
                    <Card
                      className="textStyleCode"
                      style={{
                        width: "100%",
                        backgroundColor: Constants.PRIMARY,
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
                          {Constants.ABOUT}
                        </Col>
                      </Row>
                    </Card>
                  </Row>
                  <Row
                    style={{
                      padding: 0,
                      margin: 0,
                      marginTop: 20,
                      textAlign: "start",
                    }}
                  >
                    <ul>
                      <li style={{ padding: 4, fontSize: 16 }}>
                        <strong>DESCRIPTION</strong>

                        <ul>
                          <li>
                            <a
                              href=""
                              style={{
                                textDecoration: "none",
                                fontWeight: 500,
                              }}
                            >
                              {Constants.WEBSITE}
                            </a>{" "}
                            is a non-profit educational website.
                          </li>
                        </ul>
                      </li>
                      <li style={{ padding: 4, fontSize: 16 }}>
                        <strong>CREDITS</strong>
                      </li>
                      <li style={{ padding: 4, fontSize: 16 }}>
                        <a
                          href="https://github.com/ragsav/copybin_front"
                          target="_blank"
                        >
                          <strong>SOURCE</strong>
                        </a>
                      </li>
                    </ul>
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
              <Footer></Footer>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

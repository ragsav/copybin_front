import {
  Alert,
  Form,
  Button,
  Card,
  Row,
  Col,
  Image,
  Container,
} from "react-bootstrap";
import logo from "./logo_size.jpg";
import Constants from "../constants/constants";
var { SocialIcon } = require("react-social-icons");
export default function Footer(props) {
    return (
      <div
        style={{
          width: "100%",
          borderRadius: 4,
          height: "200px",
          color: "white",
          padding: 10,
          marginTop: 80,
          backgroundColor: Constants.SECONDARY,
        }}
      >
        <Row style={{ padding: 4, margin: 0 }}>
          <Col
            className="textStyleCode d-none d-lg-block"
            style={{
              padding: 4,
              paddingLeft: 10,
              paddingRight: 10,
              
              fontSize: 20,
            }}
          >
            <Image src={logo} rounded style={{  height:  100,  width:  100}}  />
          </Col>

          <Col
            className="d-none d-sm-block"
            style={{ padding: 0, paddingLeft: 10, paddingRight: 10, margin: 0 }}
          >
            <Row style={{ padding: 4, margin: 0 }}>
              <Col
                className="textStyleLatoThin"
                style={{
                  textAlign: "left",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                Description
              </Col>
            </Row>
            <Row style={{ padding: 4, margin: 0 }}>
              <Col
                className="textStyleLatoThin"
                style={{
                  fontSize: 12,
                  textAlign: "left",
                  fontWeight: 100,
                }}
              >
                Copy>bin is a link generation website
              </Col>
            </Row>
            <Row style={{ padding: 4, margin: 0, paddingLeft: 15 }}>
              <div
                style={{
                  padding: 4,
                  textAlign: "left",
                }}
              >
                <SocialIcon
                  bgColor="#fff"
                  fgColor="#000"
                  url="https://github.com/ragsav/copybin_frontend"
                  style={{ height: 30, width: 30 }}
                />
              </div>
              <div
                style={{
                  padding: 4,
                  textAlign: "left",
                }}
              >
                <SocialIcon
                  fgColor="#fff"
                  url="https://reddit.com/user/bappujji"
                  style={{ height: 30, width: 30 }}
                />
              </div>
            </Row>
          </Col>

          <Col
            style={{ padding: 0, paddingLeft: 10, paddingRight: 10, margin: 0 }}
          >
            <Row style={{ padding: 4, margin: 0 }}>
              <Col
                className="textStyleLatoThin"
                style={{
                  textAlign: "left",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                More Utilities
              </Col>
            </Row>
            <Row style={{ padding: 4, margin: 0 }}>
              <ul
                style={{
                  //   textDecoration: "none",
                  textAlign: "left",
                  //   color: "white",
                  fontSize: 12,
                  fontWeight: 100,
                }}
              >
                {Constants.PRODUCTS.map((co) => (
                  <li key={co.key}>
                    <a
                      href={co.key}
                      // target="_blank"
                      // className="textStyleCode"
                      style={{
                        textDecoration: "none",

                        color: "white",
                      }}
                    >
                      {" "}
                      {co.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Row>
          </Col>

          <Col
            style={{ padding: 0, paddingLeft: 10, paddingRight: 10, margin: 0 }}
          >
            <Row style={{ padding: 4, margin: 0 }}>
              <Col
                className="textStyleLatoThin"
                style={{
                  textAlign: "left",
                  fontSize: 14,
                  fontWeight: 400,
                }}
              >
                Technology
              </Col>
            </Row>
            <Row style={{ padding: 4, margin: 0 }}>
              <ul
                style={{
                  fontSize: 12,
                  fontWeight: 100,
                  textAlign: "left",
                }}
              >
                <li>
                  <a>React js</a>
                </li>
                <li>
                  <a>MongoDB</a>
                </li>
                <li>
                  <a>NodeJS</a>
                </li>
                <li>
                  <a>Heroku</a>
                </li>
                <li>
                  <a>Firebase</a>
                </li>
              </ul>
            </Row>
          </Col>
        </Row>
      </div>
    );
}
// import GithubCorner from "react-github-corner";
{/* <GithubCorner href="https://github.com/username/repo" direction="left" />; */}
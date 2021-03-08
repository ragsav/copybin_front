import {
    Alert,
    Form,
    Button,
    Card,
    Row,
    Col,
    Container,
} from "react-bootstrap";
import Constants from "../constants/constants";
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
              margin: 0,
              fontSize: 20,
            }}
          >
            {Constants.WEBSITE}
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
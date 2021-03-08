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
export default function Products(props) {
  return (
    <div style={{ width: "100%" }}>
      <Card style={{ padding: 0, margin: 0 }}>
        <Row
          style={{
            padding: "0%",
            margin: "0%",
          }}
        >
          <Col
            style={{
              padding: 4,
              margin: 0,
            }}
          >
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
                  <Col style={{ padding: 4, margin: 0, textAlign: "start" }}>
                    {Constants.MOREPRODUCTS}
                  </Col>
                </Row>
              </Card>
            </Row>
            <Row
              gutter={40}
              style={{
                padding: 0,
                margin: 0,
                marginTop: 5,
              }}
            >
              {Constants.PRODUCTS.map((co) => (
                <Col
                  key={co.key}
                  style={{
                    padding: 0,
                    paddingTop: 4,
                    paddingBottom: 4,
                    margin: 0,
                  }}
                  xs={{ span: 6 }}
                  sm={{ span: 4 }}
                  md={{ span: 4 }}
                  lg={{ span: 3 }}
                  xl={{ span: 2 }}
                >
                  <Card
                    style={{
                      height: "100%",
                      padding: 4,
                      border: "none",
                      margin: 4,

                      backgroundColor: Constants.TERTIARY,
                    }}
                  >
                    <a
                      href={co.key}
                      // target="_blank"
                      // className="textStyleCode"
                      style={{
                        textDecoration: "none",
                        color: Constants.SECONDARY,
                        fontSize: "12px",
                        fontWeight: "400",
                        textAlign: "start",
                      }}
                    >
                      {" "}
                      {co.name}
                    </a>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

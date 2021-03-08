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
          backgroundColor: "white",
        }}
      >
        <Row style={{ padding: 0, margin: 0 }}></Row>
        {/* <Row
          gutter={40}
          style={{
            padding: 4,
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

                  backgroundColor: "#00000000",
                }}
              >
                <a
                  href={co.key}
                  // target="_blank"
                  // className="textStyleCode"
                  style={{
                    textDecoration: "none",
                    color: "white",
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
        </Row> */}
      </div>
    );
}
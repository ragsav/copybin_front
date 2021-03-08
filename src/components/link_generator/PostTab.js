import React from "react";
// import logo from "public.png";
import {
  Alert,
  Form,
  Button,
  Card,
  Row,
  Col,
  Container,
} from "react-bootstrap";
// import { Grid } from "@agney/react-loading";
// import CodeViewer from "./CodeViewer";
import Constants from "../../constants/constants";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

const axios = require("axios");
function toDate(date) {
  var d = new Date(date);
  return d.toTimeString() + " (" + d.toLocaleDateString() + ")";
}
function PostsList(props) {
  const posts = props.posts[0].message;

  const PostItems = posts.map((post) => (
    <Card
    key={post.updatedAt}
      style={{
        padding: "0% 0% 0% 0%",
        border: "none",
        borderRadius: 0,
        fontSize: "13px",
        color: Constants.MONOKAI,
        fontWeight: "100",
        margin: 1,
      }}
    >
      <Row
        style={{
          margin: 0,
        }}
      >
        <Col
          xs={{ span: 12 }}
          sm={{ span: 6 }}
          md={{ span: 4 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
          style={{
            padding: "5px",
            margin: 0,
            textAlign: "start",
          }}
        >
          <a
            href={`${Constants.HOST}viewer/${post._id}`}
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            {post.title}
          </a>
        </Col>
        <Col
          className="d-none d-sm-block"
          sm={{ span: 6 }}
          md={{ span: 4 }}
          lg={{ span: 6 }}
          xl={{ span: 6 }}
          style={{
            padding: "5px",

            margin: 0,
            textAlign: "end",
          }}
        >
          {toDate(post.updatedAt)}
        </Col>
        <Col
          className="d-none d-md-block"
          md={{ span: 2 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
          style={{
            padding: "5px",

            margin: 0,
            textAlign: "end",
          }}
        >
          {post.isPassword ? "True" : "False"}
        </Col>
        <Col
          className="d-none d-md-block"
          md={{ span: 2 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
          style={{
            padding: "5px",

            margin: 0,
            textAlign: "end",
          }}
        >
          {post.editable ? "True" : "False"}
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: Constants.PRIMARY,
          //   width: "100%",
          height: "1px",
          padding: "0% 1% 0% 1%",
          margin: "0px 4px 0px 4px",
        }}
      ></Row>
    </Card>
  ));
  return (
    <Col
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      {PostItems}
    </Col>
  );
}
export default class PostTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],
      errors: [],
    };
    this.setLoading = this.setLoading.bind(this);
    this.setPosts = this.setPosts.bind(this);
    this.loadPost = this.loadPost.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }
  componentDidMount() {
    this.loadPost();
  }
  loadPost = () => {
    var self = this;
    self.setLoading(true);
    axios({
      method: "get",
      headers: { "Content-Type": "application/json" },
      url: Constants.SERVERHOST + "/api/public/getLatestPosts/",
    })
      .then(function (response) {
        self.setPosts([]);
        var newData = self.state.posts.concat([response.data]);

        self.setPosts(newData);
        self.setLoading(false);
      })
      .catch(function (error) {
      });
  };
  setLoading = (loading) => {
    this.setState({
      loading,
    });
  };

  setPosts = (posts) => {
    this.setState({
      posts: posts,
    });
  };

  handleRefresh = (event) => {
    event.preventDefault();
    this.loadPost();
  };
  render() {
    return (
      <div
        style={{
          padding: 0,
          paddingTop: 50,
          paddingBottom: 50,
          margin: 0,
        }}
      >
        <Card style={{ padding: 4, margin: 0 }}>
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
                  {Constants.PUBLICCODES}
                </Col>
              </Row>
            </Card>
          </Row>
          <Row
            style={{
              width: "100%",
              margin: 0,
              padding: 0,
              fontSize: "14px",
              fontWeight: "600",
              color: Constants.MONOKAI,
            }}
          >
            <Col
              xs={{ span: 12 }}
              sm={{ span: 6 }}
              md={{ span: 4 }}
              lg={{ span: 2 }}
              xl={{ span: 2 }}
              style={{
                padding: "5px",
                margin: 0,
                textAlign: "start",
              }}
            >
              Title
            </Col>
            <Col
              className="d-none d-sm-block"
              sm={{ span: 6 }}
              md={{ span: 4 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              style={{
                padding: "5px",

                margin: 0,
                textAlign: "end",
              }}
            >
              Last updated
            </Col>
            <Col
              className="d-none d-md-block"
              md={{ span: 2 }}
              lg={{ span: 2 }}
              xl={{ span: 2 }}
              style={{
                padding: "5px",

                margin: 0,
                textAlign: "end",
              }}
            >
              Password protected
            </Col>
            <Col
              className="d-none d-md-block"
              md={{ span: 2 }}
              lg={{ span: 2 }}
              xl={{ span: 2 }}
              style={{
                padding: "5px",

                margin: 0,
                textAlign: "end",
              }}
            >
              Editable
            </Col>
          </Row>
          <Row
            style={{
              backgroundColor: Constants.PRIMARY,
              //   width: "100%",
              height: "1px",
              padding: "0% 1% 0% 1%",
              margin: "0px 4px 0px 4px",
            }}
          ></Row>
          <Row style={{ padding: 0, margin: 0 }}>
            {this.state.loading === false ? (
              <PostsList posts={this.state.posts}></PostsList>
            ) : null}
          </Row>
          <div
            style={{
              width: "100%",
              height: "20px",
            }}
          ></div>
        </Card>
      </div>
    );
  }
}

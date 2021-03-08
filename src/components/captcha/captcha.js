import React from "react";
export default class Captcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: "",
    };

    this.canvas = React.createRef();
    this.input = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getImgValidCode = this.getImgValidCode.bind(this);
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

  componentDidMount = () => {
    this.getImgValidCode();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.input.current.value === "") {
      this.props.isBot(true);
      console.log("Verification code must be filled!");
    } else if (this.input.current.value !== this.state.captcha) {
      this.props.isBot(true);
      console.log("Verification code error!");
    } else {
      this.props.isBot(false);
      console.log("Verification success!");
    }
    this.getImgValidCode();
    return;
  };

  render() {
    return (
      <div style={{ width: "100%", alignSelf: "center" }}>
        <form
          action=""
          method="get"
          style={{
            backgroundColor: "white",

            margin: " 10px auto",
            display: "flex",
            flexDirection: "column",
            width: 200,
            padding: 2,
          }}
        >
          <canvas
            id="valicode"
            ref={this.canvas}
            style={{
              padding: 2,
              backgroundColor: "white",
              margin: 2,
              border: "1px solid black",
              borderRadius: 2,
            }}
          ></canvas>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: 200,
              //   margin: 2,
            }}
          >
            <input
              type="text"
              name="valiIpt"
              ref={this.input}
              id="valiIpt"
              placeholder="Captcha"
              style={{
                padding: 2,
                width: 100,
                margin: 2,
                border: "1px solid black",
                borderRadius: 2,
              }}
            ></input>
            <button
              id="submit"
              type="submit"
              style={{
                padding: 2,
                width: 100,
                margin: 2,
                border: "1px solid black",
                borderRadius: 2,
              }}
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    );
  }
}

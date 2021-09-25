import React, { createRef, useRef } from 'react';
import Ball from './Ball';
import Barrel from './Barrel';

import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import '../App.css';
import '@tensorflow/tfjs-backend-webgl';
import pokeball1 from '../images/pokeball1.png';
import pokeball2 from '../images/pokeball2.png';
import covid1 from '../images/covid1.png';
import covid2 from '../images/covid2.png';
import amongus1 from '../images/amongus1.png';
import amongus2 from '../images/amongus2.png';
import StartScreenBackground from '../images/StartScreenBackground.png';
import AmongUsBackground from '../images/AmongUsBackground.png';
import CovidBackground from '../images/Covid.png';
import PokemonBackground from '../images/PokemonBackground.png';
import BlurredBackground from '../images/BlurredBackground.png';

const defaultConfig = {
  width: 640,
  height: 480,
  gravity: 0.2,
  friction: 0.98,
};

export class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = createRef();
    this.webcamRef = createRef();
    this.head = [];
    this.state = {
      name: '',
      play: false,
      lives: 5,
      score: 0,
      difficulty: this.props.difficulty,
      gameOver: false,
      leaderboard: [],
    };

    if (!this.state.gameOver) {
      this.runPosenet();
    }
    if (this.props.theme === 'pokemon') {
      this.state.theme = PokemonBackground;
    } else if (this.props.theme === 'amongus') {
      this.state.theme = AmongUsBackground;
    } else {
      this.state.theme = CovidBackground;
    }
    this.addToLeaderboard = this.addToLeaderboard.bind(this);
  }

  async getLeaderboard() {
    const response = await fetch('http://localhost:5000/leaderboard', {
      method: 'GET',
    });
    const leaderboard = await response.json();
    // console.log('Leaderboard', leaderboard);
    this.setState({
      leaderboard,
    });
  }

  componentDidMount() {
    this.getLeaderboard();
  }

  async addToLeaderboard() {
    // console.log(this.state);
    this.setState({
      name: "",
    });
    const { name, score } = this.state;
    const response = await fetch('http://localhost:5000/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        score,
      }),
    });
    this.getLeaderboard();
  }

  async runPosenet() {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });

    setInterval(() => {
      this.detect(net);
    }, 100);
  }

  async detect(net) {
    if (
      typeof this.webcamRef.current !== 'undefined' &&
      this.webcamRef.current !== null &&
      this.webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = this.webcamRef.current.video;
      const videoWidth = this.webcamRef.current.video.videoWidth;
      const videoHeight = this.webcamRef.current.video.videoHeight;

      // Set video width
      this.webcamRef.current.video.width = videoWidth;
      this.webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await net.estimateSinglePose(video);
      // console.log(pose);

      this.drawCanvas(pose, video, videoWidth, videoHeight, this.canvas);
    }
  }

  drawCanvas(pose, video, videoWidth, videoHeight, canvas) {
    const { ctx } = this;
    const keypoints = pose.keypoints;
    const leftKeypoint = keypoints.find(
      (keypoint) => keypoint.part === 'leftEar'
    );
    const rightKeypoint = keypoints.find(
      (keypoint) => keypoint.part === 'rightEar'
    );

    const { y: leftY, x: leftX } = leftKeypoint.position;
    const { y: rightY, x: rightX } = rightKeypoint.position;
    this.head = [
      rightX,
      rightY - 100,
      rightX + (leftX - rightX),
      rightY - 100 + (leftX - rightX) * 1.25,
    ];
  }

  createBalls() {
    const { config } = this;
    let balls = [];

    let leftOrRight = Math.round(Math.random());
    leftOrRight = leftOrRight === 0 ? 0 : config.width;

    if (this.state.difficulty === 'easy') {
      setTimeout(() => {
        balls.push(
          new Ball(
            leftOrRight,
            Math.random() * (config.height * 0.7) + config.height * 0.3,
            {
              ...config,
              gravity: config.gravity,
            },
            {
              // extra bouncey
              bounce: 0.9,
              // size 10-30
              radius: Math.random() * 40 + 60,
            }
          )
        );
      }, Math.random() * 500);
    } else if (this.state.difficulty === 'medium') {
      setTimeout(() => {
        balls.push(
          new Ball(
            leftOrRight,
            Math.random() * (config.height * 0.7) + config.height * 0.3,
            {
              ...config,
              gravity: config.gravity,
            },
            {
              // extra bouncey
              bounce: 0.9,
              // size 10-30
              radius: Math.random() * 40 + 60,
            }
          )
        );
      }, Math.random() * 500);

      setTimeout(() => {
        balls.push(
          new Barrel(
            Math.random() * config.width,
            0,
            {
              ...config,
              gravity: 0.1,
            },
            {
              // extra bouncey
              bounce: 0.9,
              // size 10-30
              radius: Math.random() * 40 + 60,
            }
          )
        );
      }, Math.random() * 500);
    } else {
      setTimeout(() => {
        balls.push(
          new Ball(
            0,
            Math.random() * (config.height * 0.7) + config.height * 0.3,
            {
              ...config,
              gravity: config.gravity,
            },
            {
              // extra bouncey
              bounce: 0.9,
              // size 10-30
              radius: Math.random() * 40 + 60,
            }
          )
        );
      }, Math.random() * 500);

      setTimeout(() => {
        balls.push(
          new Ball(
            config.width,
            Math.random() * (config.height * 0.7) + config.height * 0.3,
            {
              ...config,
              gravity: config.gravity,
            },
            {
              // extra bouncey
              bounce: 0.9,
              // size 10-30
              radius: Math.random() * 40 + 60,
            }
          )
        );
      }, Math.random() * 500);

      setTimeout(() => {
        balls.push(
          new Barrel(
            Math.random() * config.width,
            0,
            {
              ...config,
              gravity: 0.1,
            },
            {
              // extra bouncey
              bounce: 0.9,
              // size 10-30
              radius: Math.random() * 40 + 60,
            }
          )
        );
      }, Math.random() * 500);
    }

    if (!this.state.gameOver) {
      this.balls.forEach((ball) => {
        if (ball instanceof Barrel)
          this.setState({ score: this.state.score + 50 });
        else this.setState({ score: this.state.score + 100 });
      });
    }

    this.balls = balls;
  }

  startGame() {
    this.ctx = this.canvas.current.getContext('2d');

    this.config = {
      ...defaultConfig,
    };

    this.canvas.current.width = this.config.width;
    this.canvas.current.height = this.config.height;

    this.balls = [];

    setInterval(() => {
      this.createBalls();
    }, 3000);

    if (!this.state.gameOver) {
      this.update();
    }
  }

  update() {
    const { ctx, config, balls } = this;
    window.requestAnimationFrame(() => this.update());
    ctx.clearRect(0, 0, config.width, config.height);
    var imgBall = new Image();
    var imgBarrel = new Image();
    if (this.props.theme === 'pokemon') {
      imgBall.src = pokeball1;
      imgBarrel.src = pokeball2;
    } else if (this.props.theme === 'amongus') {
      imgBall.src = amongus1;
      imgBarrel.src = amongus2;
    } else {
      imgBall.src = covid1;
      imgBarrel.src = covid2;
    }
    // console.log(this.head);
    const [left, top, right, bottom] = this.head;
    let handsLocation;
    if (this.hands) handsLocation = this.hands;
    balls.forEach(async (ball, index) => {
      if (ball.x > left && ball.x < right && ball.y > top && ball.y < bottom) {
        // console.log("COLLISION!");
        this.balls.splice(index, 1);
        if (this.state.lives - 1 <= 0) {
          this.setState({ gameOver: true });
        } else {
          this.setState({ lives: this.state.lives - 1 });
        }
      }
      await ball.update();
      if (ball instanceof Barrel) await ball.draw(ctx, imgBarrel);
      else await ball.draw(ctx, imgBall);
    });
  }

  render() {
    if (this.state.gameOver) {
      return (
        <div
          className="App"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            background: `url(${BlurredBackground})`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              backgroundColor: "#1F1F1F",
              borderRadius: 25,
              height: "87%",
              width: "28%",
              marginTop: "3.5%",
              marginLeft: "20%",
              marginRight: "5%",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: "30px",
                marginTop: "5%",
              }}
            >
              <b>Leaderboard</b>
            </div>
            <div
              style={{
                marginTop: "2%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  color: "#B8B8B8",
                  fontSize: "24px",
                  marginLeft: "10%",
                  marginBottom: "3%",
                }}
              >
                Player
              </div>
              <div
                style={{
                  color: "#B8B8B8",
                  fontSize: "24px",
                  marginRight: "10%",
                  marginBottom: "3%",
                }}
              >
                Score
              </div>
            </div>
            {this.state.leaderboard.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  marginRight: "10%",
                  marginBottom: "2%",
                }}
                key={index}
              >
                <div
                  style={{
                    color: "#B8B8B8",
                    flex: 1,
                    marginLeft: "12%",
                    fontSize: "18px",
                  }}
                >
                  <b>{item.name}</b>
                </div>
                <div style={{ color: "#B8B8B8", flex: 1, fontSize: "18px" }}>
                  <b>{item.score}</b>
                </div>
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                bottom: "8%",
                marginLeft: "1.5%",
              }}
            >
              <div
                style={{
                  backgroundColor: "black",
                  height: "3px",
                  width: "90%",
                  marginLeft: "5%",
                }}
              />
              <div
                style={{
                  color: "#B8B8B8",
                  marginTop: "3%",
                  fontSize: "24px",
                  marginLeft: "10%",
                  marginRight: "10%",
                }}
              >
                Enter your score to the leaderboard!
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "4%",
                }}
              >
                <input
                  type="text"
                  style={{
                    borderRadius: 8,
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    width: "70%",
                  }}
                  placeholder={"Enter your name"}
                  onChange={(e) =>
                    this.setState({
                      name: e.target.value,
                    })
                  }
                  value={this.state.name}
                />
                <div
                  className="difficultyButton"
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#4D4D4D",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: 8,
                  }}
                  onClick={this.addToLeaderboard}
                >
                  OK
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#1F1F1F",
              borderRadius: 25,
              height: "40%",
              width: "28%",
              marginTop: "3.5%",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: "36px",
                marginTop: "5%",
              }}
            >
              <b>Game Over!</b>
            </div>
            <div
              style={{
                color: "#B8B8B8",
                fontSize: "24px",
                marginTop: "5%",
              }}
            >
              Your Final Score:
              <br />
              <div
                style={{
                  color: "white",
                  fontSize: "30px",
                  marginTop: "1%",
                }}
              >
                <b>{this.state.score}</b>
              </div>
            </div>
            <div
              className="difficultyButton"
              style={{
                fontSize: "24px",
                backgroundColor: "#4D4D4D",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: "40px",
                paddingTop: "15px",
                paddingBottom: "15px",
                borderRadius: 15,
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "10%",
              }}
              onClick={() => {
                window.location.reload();
              }}
            >
              Play Again
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className='App'
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `url(${this.state.theme})`,
          backgroundSize: 'cover',
        }}
      >
        <header className='App-header'>
          <Webcam
            ref={this.webcamRef}
            style={{
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zindex: 9,
              width: 640,
              height: 480,
            }}
            mirrored={false}
          />
          <canvas
            id='gameCanvas'
            ref={this.canvas}
            style={{
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zindex: 10,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              zindex: 10,
              width: 640,
              height: 480,
              borderRadius: 2,
              justifyContent: 'space-evenly',
            }}
          >
            <div
              style={{
                width: 200,
                height: 50,
                background: 'orange',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                fontSize: 25,
              }}
            >
              Score: {this.state.score}
            </div>
            <div
              style={{
                width: 150,
                height: 50,
                background: 'orange',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                fontSize: 25,
              }}
            >
              Lives: {this.state.lives}
            </div>
          </div>
          {!this.state.play ? (
            <div
              className='difficultyButton'
              style={{
                fontSize: '50px',
                backgroundColor: '#1F1F1F',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                borderRadius: 25,
                position: 'absolute',
              }}
              onClick={() => {
                this.setState({ play: true });
                this.startGame();
              }}
            >
              Ready?
            </div>
          ) : null}
        </header>
      </div>
    );
  }
}

export default Scene;

import React, { useState } from "react";
import "./App.css";
import "./Home.css";
import Pokemon from "./images/Pokemon.png";
import AmongUs from "./images/AmongUs.png";
import CoronaVirus from "./images/CoronaVirus.png"
import SelectYourThemeText from "./images/SelectYourThemeText.png";
import StartScreenBackground from "./images/StartScreenBackground.png";
import SussyBallsLogo from "./images/SussyBallsLogo.png";
import BlurredBackground from "./images/BlurredBackground.png";
import Game from "./Game/Game.js";

export default function Home() {
  const [difficulty, setDifficulty] = useState("none");
  const [theme, setTheme] = useState("none");
  const [showHowTo, setShowHowTo] = useState(false);

  return (
    <>
      {showHowTo && 
        <>
        <img src = {BlurredBackground} style={{position: 'absolute', top: 0, left: 0, zIndex: '50', width: '100%', height: '100%'}}/>
        <div style={{
            position: "absolute",
            width: "70%",
            backgroundColor: "#1F1F1F",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 99,
            borderRadius: 35,
          }}>
          
          <div style={{color: 'white', fontWeight: 'bold', fontSize: '50px', display: 'flex', justifyContent: 'center', padding: '3%'}}>How To Play</div>
          <div style={{color: 'white', fontSize: '20px', padding: '0% 5% 5% 5%'}}>
            Sussy Balls is a game where you want to avoid getting by virtual projectiles.
            <br/><br/>
            In order to survive, you must maneuver your head to dodge incoming projectiles that launch from the sides or top of your screen. These projectiles will differ depending on the theme you choose.
            <br/><br/>
            You start off with 5 total lives. Every time an item hits your head, you lose 1 life. Points are gained by dodging the projectiles. You will gain 50 points for each item you dodge falling from the top and 100 points for each item coming from the sides. Try to get the highest score possible on the leaderboard. Good luck and have fun!
          </div>
          <div
              className="difficultyButton"
              style={{
                backgroundColor: "#4D4D4D",
                margin: '0% 5% 5% 5%',
                padding: '1%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
                fontSize: "30px",
                color: 'white',
              }}
              onClick={() => {
                setShowHowTo(!showHowTo);
              }}
            >
              Understood!
            </div>     
        </div> 
        </>
      }
      {difficulty === "none" ? (
        <div
          
        >
          <img
            src={StartScreenBackground}
            style={{ position: 'absolute', width: "100%", height: "100%"}}
          />
          <div style={{ position: "absolute", top: "20%", width: "100%" }}>
            <img
              src={SussyBallsLogo}
              style={{
                width: "50%",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "10%",
              bottom: "28%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="difficultyButton"
              style={{
                fontSize: "50px",
                backgroundColor: "#1F1F1F",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px",
                borderRadius: 25,
                marginLeft: "1.5%",
                marginRight: "1.5%",
              }}
              onClick={() => {
                setDifficulty("easy");
              }}
            >
              Easy
            </div>
            <div
              className="difficultyButton"
              style={{
                fontSize: "50px",
                backgroundColor: "#1F1F1F",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px",
                borderRadius: 25,
                marginLeft: "1.5%",
                marginRight: "1.5%",
              }}
              onClick={() => {
                setDifficulty("medium");
              }}
            >
              Medium
            </div>
            <div
              className="difficultyButton"
              style={{
                fontSize: "50px",
                backgroundColor: "#1F1F1F",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px",
                borderRadius: 25,
                marginLeft: "1.5%",
                marginRight: "1.5%",
              }}
              onClick={() => {
                setDifficulty("hard");
              }}
            >
              Hard
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "10%",
              bottom: "8%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="difficultyButton"
              style={{
                position: "absolute",
                width: '700px',
                height: "100%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#1F1F1F",
                borderRadius: 25,
                fontSize: "40px",
                color: 'white',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
              onClick={() => {
                setShowHowTo(!showHowTo);
              }}
            >
              How To Play
            </div>
          </div>
        </div>
      ) : (
        <>
          {theme === "none" ? (
            <>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "space-between",
                  zIndex: 5,
                }}
              >
                <div
                  className="theme"
                  style={{
                    background: `url(${Pokemon})`,
                    height: "100%",
                    width: "35%",
                    backgroundSize: "cover",
                    marginRight: "0.7%",
                  }}
                  onClick={() => {
                    setTheme("pokemon");
                  }}
                ></div>
                <div
                  className="theme"
                  style={{
                    background: `url(${AmongUs})`,
                    height: "100%",
                    width: "35%",
                    marginRight: "0.7%",
                    backgroundSize: "cover",
                  }}
                  onClick={() => {
                    setTheme("amongus");
                  }}
                ></div>
                <div
                  className="theme"
                  style={{
                    background: `url(${CoronaVirus})`,
                    height: "100%",
                    width: "35%",
                    backgroundSize: "cover",
                  }}
                  onClick={() => {
                    setTheme("covid");
                  }}
                ></div>
              </div>
              <div
                style={{
                  zIndex: 100,
                  position: "absolute",
                  width: "100%",
                  marginTop: "8%",
                }}
              >
                <img
                  src={SelectYourThemeText}
                  style={{
                    display: "block",
                    margin: "auto",
                    width: "60%",
                  }}
                />
              </div>
            </>
          ) : (
            <Game difficulty={difficulty} theme={theme}/>
          )}
        </>
      )}
    </>
  );
}

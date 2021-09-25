import React from "react";
import Scene from "./Scene";

export default function Game (props) {
    return <Scene difficulty={props.difficulty} theme={props.theme} />;
}

import React from "react";
function StartingScreen(props) {
  return (
    <div>
      <h1 className="start-screen-title">Quizzical</h1>
      <p className="start-screen-description">Click below to start quiz</p>
      <button className="start-screen-button" onClick={props.handleStartClick}>
        Start Quiz
      </button>
      <img className="yellow-blob" src="./yellow-blob.png" />
      <img className="blue-blob" src="./blue-blob.png" />
    </div>
  );
}
export default StartingScreen;

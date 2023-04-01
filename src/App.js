import React, {useState} from "react";
import StartingScreen from "./StartingScreen";
import QuizScreen from "./QuizScreen";

function App() {
  const [quizScreen, setQuizScreen] = useState(
    <StartingScreen handleStartClick={handleStartClick} />
  );

  function handleStartClick() {
    setQuizScreen(<QuizScreen handlePlayAgainClick={handlePlayAgainClick}/>);
  }
  
  function handlePlayAgainClick() {
    setQuizScreen(<StartingScreen handleStartClick={handleStartClick}/>)
  }

  return (
    <div className="App">
      {quizScreen}
     
    </div>
  );
}

export default App;

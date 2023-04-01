import React from "react";
import { v4 as uuid } from "uuid";
import CheckAnswersButton from "./CheckAnswersButton";
import Loading from "./Loading";

function QuizScreen(props) {
  const [loading, setLoading] = React.useState(true); 
  const [data, setData] = React.useState([]);
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [checkAnswers, setCheckAnswers] = React.useState(false);
  const [count, setCount] = React.useState(0)
  function randomNumber() {
    return Math.floor((Math.random() * 4))
  }  

  
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const randomPlacementArray = [];
        for (let i = 0; i < 5; i++) {
            randomPlacementArray.push(randomNumber())
        }
        console.log(randomPlacementArray);
        setQuizQuestions(
          data.results.map((item, index) => (
            <>
              <p className="question" id={uuid()}>
                {decodeHtml(item.question)}
              </p>
              {item.incorrect_answers.splice(randomPlacementArray[index], 0, item.correct_answer)}{item.incorrect_answers.map((thing) => (
                  <>
                    <input
                      className={
                        checkAnswers
                          ? "check-answers-display"
                          : "radio-checked-display"
                      }
                      type="radio"
                      name={item.question}
                      value={thing == item.correct_answer ? true : false}
                      id={thing}
                      key={uuid()}
                      onClick={() => handleClick(thing)}
                    />
                    <label htmlFor={thing} className="radio-button">
                      {decodeHtml(thing)}
                    </label>
                  </>
                ))}
              <hr className="hr-line" />
            </>
          ))
        );
        setData(
          data.results.map((questionData) => ({
            ...questionData,
            id: uuid(),
            answerSelected: "",
          }))
        );
        setLoading(false);
      });
  }, []);

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function toggleCheckAnswers() {
    for (let i = 0; i < data.length; i++) {
        if (data[i].answerSelected == data[i].correct_answer) {
            setCount(oldCount => oldCount + 1)
        }
    }
    setCheckAnswers((oldCheckAnswers) => !oldCheckAnswers);
    setQuizQuestions(
      data.map((item) => (
        <>
          <p className="question" id={uuid()}>
            {decodeHtml(item.question)}
          </p>
          {item.incorrect_answers.map((thing) => (
              <>
                <input
                  className={
                    (thing == item.answerSelected) |
                    (thing == item.correct_answer)
                      ? "check-answers-display"
                      : "radio-checked-display"
                  }
                  type="radio"
                  name={item.question}
                  value={thing == item.correct_answer ? true : false}
                  id={thing}
                  key={uuid()}
                  disabled
                />
                <label htmlFor={thing} className="radio-button">
                  {item.answerSelected == thing && item.answerSelected == item.correct_answer ? decodeHtml(thing) + " ✔️" : item.answerSelected == thing && item.answerSelected !== item.correct_answer ? decodeHtml(thing) + " ❌ ": decodeHtml(thing)}
                  
                </label>
              </>
            ))}
          <hr className="hr-line" />
        </>
      ))
    );
  }

  function handleClick(id) {
    console.log(id);
    setData((oldData) =>
      oldData.map((item) => {
        if (item.correct_answer == id) {
          return {
            ...item,
            answerSelected: id,
          };
        } else if (item.incorrect_answers.includes(id)) {
          return {
            ...item,
            answerSelected: id,
          };
        } else {
          return item;
        }
      })
    );
  }
  
if (loading) {
    return (
    <>
    <Loading />
    </>
    )
}
else {
  return (
    <div className="questions-container">
      <div className="question-box">
        {quizQuestions}
        <CheckAnswersButton 
        checkAnswers={checkAnswers}
        toggleCheckAnswers={toggleCheckAnswers}
        handlePlayAgainClick={props.handlePlayAgainClick}
        count={count}/>
      </div>
      <img className="yellow-blob" src="./small-yellow-blob.png" />
      <img className="blue-blob" src="./small-blue-blob.png" />
    </div>
  );
  }
}
export default QuizScreen;

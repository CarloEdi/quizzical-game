function CheckAnswersButton (props) {
    return (
        <>
        {props.checkAnswers ?
        <div className="score-container">
        <p>You scored {props.count}/5 correct answers !!</p>
        <button className="check-ans-button"
        onClick={props.handlePlayAgainClick}>
        Play Again</button>
        </div>
        : <button className="check-ans-button" onClick={props.toggleCheckAnswers}>Check Answers</button>}
        </>
    )
}
export default CheckAnswersButton
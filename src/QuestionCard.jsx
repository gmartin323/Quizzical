import React from "react"
import Answer from "./Answer"

export default function QuestionCard(props) {
    
    const answerElements = props.data.answers.map(answer => {
        return <Answer 
                    key={answer.id}
                    answer={answer}
                    onClick={props.onClick}
                    checkResult={props.checkResult}
                />
    })
    
    return (
        <div className="question-container">
            <h3 className="question">
                {props.data.question.replace(/&#039;/g, "'").replace(/&quot;/g, "''")}
            </h3>
            <div className="answers-container">
                {answerElements}
        </div>
            <hr />
        </div>
    )
}
import React from "react"

export default function IntroPage(props) {
    return (
        <div className="intro-container container">
            <h1>Quizzical</h1>
            <button 
                onClick={props.startQuiz}
                className="btn"
            >Start quiz</button>
        </div>
    )
}
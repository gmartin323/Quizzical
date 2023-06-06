import React from "react"

export default function CheckAnswersButton(props) {
    return (
        <button
            disabled={props.disableBtn}
            className={`${props.disableBtn ? "btn disabled" : "btn"}`}
            onClick={props.checkAnswers}       
        >
            Check answers
        </button>
    )
}
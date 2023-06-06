import React from "react"

export default function Answer(props) {
    
    const styles = {
        backgroundColor:
                !props.checkResult ? 
                    props.answer.selected ? "#D6DBF5" : "white"
                : props.answer.value === props.answer.correctAnswer ? "#94D7A2"
                    : props.answer.selected ? "#F8BCBC" : "white",
                    
        border: props.checkResult ?
                    props.answer.value === props.answer.correctAnswer ? "none"
                        : props.answer.selected ? "none" : "0.8px solid #4D5B9E"
                    : "0.8px solid #4D5B9E"
                ,
        opacity: 
                props.answer.selected ? "1" : 
                props.checkResult ?  "0.5" : "1",
                
        cursor: props.checkResult ? "auto" : "pointer"
    }
    
    
    return (
        <h4 
            className="answer"
            style={styles}
            key={props.answer.id}
            id={props.answer.id}
            onClick={!props.checkResult ? props.onClick : null}
        >
                {props.answer.value}
        </h4>
    )
}
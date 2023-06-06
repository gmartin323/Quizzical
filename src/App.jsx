import React from "react"
import {UseFetch} from "./hooks/useFetch"
import IntroPage from "./IntroPage"
import LoadingSpinner from "./LoadingSpinner"
import QuestionCard from "./QuestionCard"
import CheckAnswersButton from "./CheckAnswersButton"
import questionDataModifier from "./utils/questionDataModifier"

export default function App() {
    
    const [isLoading, setIsLoading] = React.useState(false)
    const [start, setStart] = React.useState(false)
    const [questionsData, setQuestionsData] = React.useState([])
    const [questionCardElements, setQuestionCardElements] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [checkResult, setCheckResult] = React.useState(false)
    const [restart, setRestart] = React.useState(false)
    const url = "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"    
    let {data} = UseFetch(url, restart)
    
    function startQuiz() {
        setStart(true)  
    }
    
    function checkData() {
        return Object.keys(data).length > 0
    }
    
    
    React.useEffect(() => {  
        if(checkData()) {
            setIsLoading(false)
            setQuestionsData(questionDataModifier(data))
        } else {
            setIsLoading(true)
        }        
    }, [data])
    
    function displayQuestions() {
        return questionsData.map(result => {
                return <QuestionCard
                            key={result.id}
                            data={result}
                            id={result.id}
                            onClick={() => handleClick(event, result.id)}
                            checkResult={checkResult} 
                        />
            }
        )    
    }
    
    function handleClick(event, questionId) {
        setQuestionsData(prevQuestionsData => {
            return prevQuestionsData.map(question => {
                if (question.id === questionId) {
                    const selectedAnswer = question.answers.map(answer => {
                        if (answer.id === event.target.id) {
                            return {...answer, selected: !answer.selected}
                        } else {
                            return {...answer, selected: false}
                        }
                    })
                    return {...question, answers: selectedAnswer}
                } else {
                    return question
                }
             })
        })
    }
    
    function checkAnswers() {
        calculateScore()
        setCheckResult(true)
    }
    
        
    const disableBtn = questionsData.some(question => {
                            return !question.answers.some(answer => answer.selected)
                        })
    
    function calculateScore() {
            questionsData.map(question => {
                question.answers.map(answer => {
                    if(answer.selected === true && answer.value === question.correctAnswer) {
                        setScore(prevScore => prevScore + 1)
                        return {...answer, isCorrect: true} 
                    } else {
                        return {...answer, isCorrect: false} 
                    }
                })
            })
            
        }
    
    function playAgain() {
        setIsLoading(true)
        setScore(0)
        setQuestionsData([])
        setCheckResult(false)
        setRestart(!restart)
    }
    
    function displayIntroOrQuestions() {
        if (!start){
            return <IntroPage startQuiz={startQuiz} />
        } else if (isLoading){
            return <LoadingSpinner />
        } else {
            return (
                <div className="container">
                    <div className="questions-container">
                        {displayQuestions()}
                    </div>
                    <div className="bottom-container">
                        {checkResult ? 
                            <div className="score-wrapper">                          
                                <p>Your score is {score}/5</p>
                                <button
                                    className="btn"
                                    onClick={playAgain}
                                >
                                    Play again
                                </button>
                            </div>
                            : 
                            <button
                                disabled={disableBtn}
                                // className="btn disabled"
                                className={`${disableBtn ? "btn disabled" : "btn"}`}
                                onClick={checkAnswers}       
                            >
                                Check answers
                            </button>
                            }
                        
                    </div>
                </div>
            )       
        }
    }
    
    
    return (
        <main>
            {displayIntroOrQuestions()}
        </main>
    )
}
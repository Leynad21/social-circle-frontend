import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import { getQuiz, reset, createQuestion } from '../../features/quiz/quizSlice'

const CreateQuizPage = () => {

    const params = useParams()

    const [questionsArray, setQuestionsArray] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState("")

    const [formData, setFormData] = useState({
        "quiz": params.slug,
        "title": "",
        "method": 0,
        "answers": [
            {
                "answer_text": "",
                "is_right": false
            },
            {
                "answer_text": "",
                "is_right": false
            },
            {
                "answer_text": "",
                "is_right": false
            },
            {
                "answer_text": "",
                "is_right": false
            }
        ]
    })

    const { title, method, answers } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { quiz, message, isError } = useSelector((state) => state.quiz)



    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getQuiz({
            slug: params.slug
        }))

    }, [dispatch, message])


    const handleChange = (e) => setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))

    const handleAnswersChange = (e, index) => {

        answers[index].answer_text = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            answers,
        }))
    }

    const handleSelectChange = (e) => {
        const selectedAnswer = e.target.value;
        setSelectedAnswer(selectedAnswer)

    }

    useEffect(() => {
        if (selectedAnswer !== "") {
            const updatedAnswers = answers.map((answer) => {
                if (answer.answer_text === selectedAnswer) {
                    return {
                        ...answer,
                        is_right: true,
                    }
                }
                return answer
            });

            setFormData((prevFormData) => ({
                ...prevFormData,
                answers: updatedAnswers,
            }))
        }
    }, [selectedAnswer])



    const handleSubmit = (e) => {
        e.preventDefault();

        if (correctAnswers.length > 1) {
            toast.error("Only one answer allowed in Single answer question ")
        } else {

            setQuestionsArray((prevQuestionsArray) => [...prevQuestionsArray, formData])

            // Reset the form data and selected answer
            setFormData({
                "quiz": params.slug,
                title: '',
                method: 0,
                answers: [
                    { answer_text: '', is_right: false },
                    { answer_text: '', is_right: false },
                    { answer_text: '', is_right: false },
                    { answer_text: '', is_right: false },
                ],
            });
            setSelectedAnswer('')
        }

    };

    const handleFinishQuiz = () => {

        questionsArray.forEach((question, index) => {
            dispatch(createQuestion(question))
        })
        toast.success("Quiz created succesfully!")
        navigate("/quiz/me")
    }


    // AUXILIAR COMPUTATIONS

    const atLeastOneAnswerRight = answers.some(answer => answer.is_right === true)

    const correctAnswers = answers
        .filter(answer => answer.is_right === true)
        .map(answer => answer.answer_text)

    const correctAnswersFormatted = correctAnswers.map(answer => answer + '.').join(' ');

    // QUIZ QUESTION COMPONENT

    const QuizQuestion = ({ questionsArray }) => {

        return (
            <>
                {questionsArray.map((question, index) => (
                    <div className=" bg-white w-5/6 max-w-[800px] min-h-[450px] rounded-lg shadow-sm mb-8" key={index}>
                        <div className="text-right bg-blue-400 pt-4 pb-4 pr-4 flex justify-end items-center rounded-lg">
                            <p>Single answer</p>
                            <h1 className="text-4xl text-right ml-4">{index + 1}/{questionsArray.length}</h1>
                        </div>
                        <div className="p-4">
                            <h1 className="text-2xl flex items-center">
                                <span>{index + 1}: </span> {question.title}
                            </h1>
                            <h2 className="text-xl mt-12 mb-4">Answers:</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 mb-8">
                                <li className="list-none border-2 rounded-full p-2">
                                    {question.answers[0].answer_text}
                                </li>
                                <li className="list-none border-2 rounded-full p-2">
                                    {question.answers[1].answer_text}
                                </li>
                                <li className="list-none border-2 rounded-full p-2">
                                    {question.answers[2].answer_text}
                                </li>
                                <li className="list-none border-2 rounded-full p-2">
                                    {question.answers[3].answer_text}
                                </li>
                            </div>
                            <div className="flex justify-between"></div>
                            <h3>Correct answers :
                                {question.answers.map((answer) => {
                                    if (answer.is_right) {
                                        return answer.answer_text
                                    }
                                })}
                            </h3>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div>
            <div className="flex flex-col items-center ">
                <h1 className="text-4xl font-semibold mt-12">Create Quiz</h1>
                <p className="text-xl font-semibold text-gray-600 m-4 mb-8">
                    {quiz.title}
                </p>
                <QuizQuestion questionsArray={questionsArray} />

                {/* QUIZ FORM */}
                <div className=" bg-white w-5/6 max-w-[800px] min-h-[450px] rounded-lg shadow-sm">
                    <form action="">
                        <div className="text-right bg-blue-400 pt-4 pb-4 pr-4 flex justify-end items-center rounded-lg">
                            <p>Single answer</p>
                            <h1 className="text-4xl text-right ml-4">{questionsArray.length + 1}/{questionsArray.length + 1}</h1>
                        </div>
                        <div className="p-4">
                            <h1 className="text-2xl flex items-center">
                                <span>{questionsArray.length !== 0 ? questionsArray.length + 1 : 1} </span>
                                <input
                                    type="text"
                                    placeholder="Type your question"
                                    name="title"
                                    value={title}
                                    onChange={handleChange}
                                    className="input input-bordered w-full ml-2"
                                />
                            </h1>
                            <h2 className="text-xl mt-12 mb-4">Answers:</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 mb-8">
                                <input
                                    id="answer_a"
                                    value={answers[0].answer_text}
                                    onChange={(e) => handleAnswersChange(e, 0)}
                                    className="list-none border-2 rounded-full p-2"
                                    placeholder="Answer A"
                                ></input>
                                <input
                                    id="answer_b"
                                    value={answers[1].answer_text}
                                    onChange={(e) => handleAnswersChange(e, 1)}
                                    className="list-none border-2 rounded-full p-2"
                                    placeholder="Answer B"
                                ></input>
                                <input
                                    id="answer_c"
                                    value={answers[2].answer_text}
                                    onChange={(e) => handleAnswersChange(e, 2)}
                                    className="list-none border-2 rounded-full p-2"
                                    placeholder="Answer C"
                                ></input>
                                <input
                                    id="answer_d"
                                    value={answers[3].answer_text}
                                    onChange={(e) => handleAnswersChange(e, 3)}
                                    className="list-none border-2 rounded-full p-2"
                                    placeholder="Answer D"
                                ></input>
                            </div>
                            <div className="flex justify-between">
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    value={selectedAnswer}
                                    onChange={handleSelectChange}
                                >
                                    <option disabled value="">
                                        Which is the right answer?
                                    </option>
                                    <option value={answers[0].answer_text}>A</option>
                                    <option value={answers[1].answer_text}>B</option>
                                    <option value={answers[2].answer_text}>C</option>
                                    <option value={answers[3].answer_text}>D</option>
                                </select>
                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-active btn-primary justify-end"
                                >
                                    Add Question
                                </button>
                            </div>
                            {atLeastOneAnswerRight && (
                                <h3>Correct answers: {correctAnswersFormatted}</h3>
                            )}
                        </div>
                    </form>
                </div>
                {/* END OF QUIZ FORM */}
                <button onClick={handleFinishQuiz} className="btn btn-secondary max-w-[800px] btn-lg my-6 w-5/6">Finish Quiz</button>
            </div>
        </div>
    )
}

export default CreateQuizPage
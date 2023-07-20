import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify'

const BACKEND_DOMAIN = "https://socialcircleapp.onrender.com"

const QUIZZES_URL = `${BACKEND_DOMAIN}/api/v1/quiz/`


// Get Quizzes

const getQuizzes = async (accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }
    const response = await axios.get(QUIZZES_URL, config)

    return response.data
}

// Get Quiz

const getQuiz = async (quizData, accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }
    const response = await axios.get(QUIZZES_URL + quizData.slug, config)

    return response.data
}

// Delete Quiz

const deleteQuiz = async (quizData, accessToken) => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        };
        const response = await axios.delete(QUIZZES_URL + quizData.slug, config);

        toast.success('Quiz deleted successfully');

        return response.data;
    } catch (error) {
        toast.error('Failed to delete the quiz');
        setInterval(window.location.reload(), 3000)
    }
};

// Create Quiz

const createQuiz = async (quizData, accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    }
    const response = await axios.post(QUIZZES_URL, quizData, config)

    return response.data
}

// Create Question

const createQuestion = async (questionData, accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    }
    const response = await axios.post(QUIZZES_URL + "question/" + questionData.quiz, questionData, config)

    return response.data
}

// Get Play Quiz

const getPlayQuiz = async (quizData, accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    }
    const response = await axios.get(QUIZZES_URL + "play/" + quizData.slug, config)

    return response.data
}



const quizService = { getQuizzes, getQuiz, deleteQuiz, createQuiz, createQuestion, getPlayQuiz }

export default quizService
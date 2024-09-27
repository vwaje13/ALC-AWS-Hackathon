// Quiz.js
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Quiz = () => {
  const { skill } = useParams(); // Extract skill and activity from URL
  const navigate = useNavigate()
  const query = useQuery();
  const email = query.get('email');
  const questions = '';
  axios.post('http://localhost:5000/quizQuestions/', {
    topic: skill,
    email: email
    }).then(response => 
      { 
        const questions = {
          [skill]: {
            questions: response.data.quiz_question,
            choices: response.data.answers,
            correct: response.data.correct_answer
          }
        };
    });
  axios.post('http://localhost:5000/quizQuestions/', {
    //need to get the selected answer and correct answer from frontend
    //answer: 
    //correct_answer: correct
    }).then(response => 
      { 
        const questions = {
          [skill]: {
            //then backend gives a boolean response to whether correct or incorrect
          }
        };
    });
  

  // Example question sets based on skill and activity
  /*const questions = {
    life: {
      quiz: [
        {
          id: 1,
          question: "What is a good time management strategy?",
          choices: ["Setting daily goals", "Procrastination", "Ignoring deadlines", "Multitasking"],
          correct: "Setting daily goals"
        },
      ],
    },
    social: {
      quiz: [
        {
          id: 1,
          question: "What is the key to active listening?",
          choices: ["Nodding only", "Making assumptions", "Asking follow-up questions", "Interrupting frequently"],
          correct: "Asking follow-up questions"
        },
      ],
    },
    academic: {
      quiz: [
        {
          id: 1,
          question: "What is the best way to take effective notes?",
          choices: ["Writing down everything", "Highlighting key points", "Not taking notes", "Only listening"],
          correct: "Highlighting key points"
        },
      ],
    },
  };*/

  const activityQuestions = questions[skill]?.quiz || [];

  const [answers, setAnswers] = useState({}); // Store selected answers

  const handleAnswerChange = (questionId, choice) => {
    setAnswers({
      ...answers,
      [questionId]: choice,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic here to process the answers if needed
    navigate(`/${skill}/quiz/completion`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8 text-center">
      {skill ? `${skill.charAt(0).toUpperCase() + skill.slice(1)} Skills Quiz` : 'Skills Quiz'}
    </h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        {activityQuestions.length > 0 ? (
          <form onSubmit={handleSubmit}>
            {activityQuestions.map((q, index) => (
              <div key={q.id} className="mb-6">
                <p className="text-lg font-bold">Question {index + 1}: {q.question}</p>
                <ul className="space-y-2 mt-2">
                  {q.choices.map((choice, choiceIndex) => (
                    <li key={choiceIndex}>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={choice}
                          checked={answers[q.id] === choice}
                          onChange={() => handleAnswerChange(q.id, choice)}
                          className="form-radio text-blue-600"
                        />
                        <span>{choice}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
              >
               Submit Quiz
              </button>
            </div>
          </form>
        ) : (
          <p>No questions available for this quiz.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
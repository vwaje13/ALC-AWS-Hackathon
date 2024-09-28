import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Quiz = () => {
  const { skill } = useParams(); // Extract skill and activity from URL
  const navigate = useNavigate();
  const query = useQuery();
  const email = query.get('email');
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({}); // Store selected answers

  useEffect(() => {
    console.log("Fetching quiz data for skill:", skill, "and email:", email);
    
    if (skill && email) {  // Ensure that both skill and email are valid
      axios.post('http://localhost:5000/quizQuestions/', {
        topic: skill,
        email: email
      })
      .then(response => {
        console.log("Quiz data received:", response.data);  // Log the response data

        const choicesArray = Object.values(response.data.answers); // Transform answers object into an array
        setQuestions({
          [skill]: {
            quiz: [
              {
                id: 1,
                question: response.data.quiz_question,
                choices: choicesArray,
                correct: response.data.correct_answer
              },
            ],
          },
        });
      })
      .catch(error => {
        console.error('There was an error fetching the quiz questions!', error);
      });
    } else {
      console.error("Skill or email is missing. Cannot fetch quiz data.");
    }
  }, [skill, email]);

  const activityQuestions = questions[skill]?.quiz || []; // Safely access quiz questions

  const handleAnswerChange = (questionId, choice) => {
    setAnswers({
      ...answers,
      [questionId]: choice,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic here to process the answers if needed
    navigate(`/${skill}/quiz/completion?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {skill ? `${skill.charAt(0).toUpperCase() + skill.slice(1)} Skills Quiz` : 'Skills Quiz'}
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        {activityQuestions.length > 0 ? (
          <form onSubmit={handleSubmit}>
            {activityQuestions.map((q) => (
              <div key={q.id} className="mb-6">
                <p className="text-lg font-bold">Question 1: {q.question}</p>
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
// Quiz.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Quiz = () => {
  const { skill } = useParams(); // Extract skill and activity from URL
  
  // Example question sets based on skill and activity
  const questions = {
    life: {
      quiz: [
        {
          id: 1,
          question: "What is a good time management strategy?",
          choices: ["Setting daily goals", "Procrastination", "Ignoring deadlines", "Multitasking"]
        },
        {
          id: 2,
          question: "How can you build self-discipline?",
          choices: ["Rewarding yourself", "Avoiding challenges", "Blaming others", "Procrastinating"]
        },
      ],
    },
    social: {
      quiz: [
        {
          id: 1,
          question: "What is the key to active listening?",
          choices: ["Nodding only", "Making assumptions", "Asking follow-up questions", "Interrupting frequently"]
        },
        {
          id: 2,
          question: "How do you resolve a conflict in a group?",
          choices: ["Ignoring the issue", "Yelling", "Active communication", "Letting it build up"]
        },
      ],
    },
    academic: {
      quiz: [
        {
          id: 1,
          question: "What is the best way to take effective notes?",
          choices: ["Writing down everything", "Highlighting key points", "Not taking notes", "Only listening"]
        },
        {
          id: 2,
          question: "How do you manage study time for exams?",
          choices: ["Cramming last minute", "Consistent daily study", "Skipping study sessions", "Only attending lectures"]
        },
      ],
    },
  };

  const activityQuestions = questions[skill]?.quiz || [];

  const [answers, setAnswers] = useState({}); // Store selected answers

  const handleAnswerChange = (questionId, choice) => {
    setAnswers({
      ...answers,
      [questionId]: choice,
    });
  };
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8 text-center">
      {skill ? `${skill.charAt(0).toUpperCase() + skill.slice(1)} Skills Quiz` : 'Skills Quiz'}
    </h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        {activityQuestions.length > 0 ? (
          <form>
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
              <Link
                to="/dashboard"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Submit Quiz
              </Link>
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
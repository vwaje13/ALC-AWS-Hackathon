// Quiz.js
import React from 'react';
import { Link } from 'react-router-dom';

function Quiz() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Quiz</h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <p className="text-xl mb-4">Welcome to the Life Skills Quiz!</p>

        {/* Example of a quiz question */}
        <div className="mb-6">
          <p className="text-lg font-bold">Question 1: What is the first step in problem-solving?</p>
          <ul className="mt-2">
            <li className="mb-2">
              <label>
                <input type="radio" name="question1" value="a" className="mr-2" />
                Identify the problem
              </label>
            </li>
            <li className="mb-2">
              <label>
                <input type="radio" name="question1" value="b" className="mr-2" />
                Generate solutions
              </label>
            </li>
            <li className="mb-2">
              <label>
                <input type="radio" name="question1" value="c" className="mr-2" />
                Choose the best solution
              </label>
            </li>
            <li className="mb-2">
              <label>
                <input type="radio" name="question1" value="d" className="mr-2" />
                Implement the solution
              </label>
            </li>
          </ul>
        </div>

        {/* Add more questions as needed */}

        <div className="text-center">
          <Link
            to="/lifeskills"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Submit Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
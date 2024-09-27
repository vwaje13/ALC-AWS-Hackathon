// Quiz.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Quiz() {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Life Skills Quiz</h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <p className="text-xl mb-4">Answer the following questions:</p>

        {/* Question 1 */}
        <div className="mb-6">
          <p className="text-lg font-bold">1. What is the first step in problem-solving?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question1"
                  value="Identify the problem"
                  onChange={() => handleAnswerChange('question1', 'Identify the problem')}
                  className="mr-2"
                />
                Identify the problem
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question1"
                  value="Generate solutions"
                  onChange={() => handleAnswerChange('question1', 'Generate solutions')}
                  className="mr-2"
                />
                Generate solutions
              </label>
            </li>
          </ul>
        </div>

        {/* Question 2 */}
        <div className="mb-6">
          <p className="text-lg font-bold">2. What is active listening?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question2"
                  value="Fully concentrating on the speaker"
                  onChange={() => handleAnswerChange('question2', 'Fully concentrating on the speaker')}
                  className="mr-2"
                />
                Fully concentrating on the speaker
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question2"
                  value="Simply hearing words"
                  onChange={() => handleAnswerChange('question2', 'Simply hearing words')}
                  className="mr-2"
                />
                Simply hearing words
              </label>
            </li>
          </ul>
        </div>

        {/* Question 3 */}
        <div className="mb-6">
          <p className="text-lg font-bold">3. What does SMART stand for in goal-setting?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question3"
                  value="Specific, Measurable, Achievable, Relevant, Time-bound"
                  onChange={() => handleAnswerChange('question3', 'Specific, Measurable, Achievable, Relevant, Time-bound')}
                  className="mr-2"
                />
                Specific, Measurable, Achievable, Relevant, Time-bound
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question3"
                  value="Simple, Manageable, Achievable, Realistic, Tangible"
                  onChange={() => handleAnswerChange('question3', 'Simple, Manageable, Achievable, Realistic, Tangible')}
                  className="mr-2"
                />
                Simple, Manageable, Achievable, Realistic, Tangible
              </label>
            </li>
          </ul>
        </div>

        {/* Question 4 */}
        <div className="mb-6">
          <p className="text-lg font-bold">4. How do you prioritize tasks?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question4"
                  value="By urgency and importance"
                  onChange={() => handleAnswerChange('question4', 'By urgency and importance')}
                  className="mr-2"
                />
                By urgency and importance
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question4"
                  value="By deadline only"
                  onChange={() => handleAnswerChange('question4', 'By deadline only')}
                  className="mr-2"
                />
                By deadline only
              </label>
            </li>
          </ul>
        </div>

        {/* Question 5 */}
        <div className="mb-6">
          <p className="text-lg font-bold">5. What is emotional intelligence?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question5"
                  value="Understanding and managing your emotions"
                  onChange={() => handleAnswerChange('question5', 'Understanding and managing your emotions')}
                  className="mr-2"
                />
                Understanding and managing your emotions
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question5"
                  value="Being able to read others' minds"
                  onChange={() => handleAnswerChange('question5', 'Being able to read others\' minds')}
                  className="mr-2"
                />
                Being able to read others' minds
              </label>
            </li>
          </ul>
        </div>

        {/* Question 6 */}
        <div className="mb-6">
          <p className="text-lg font-bold">6. What is time management?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question6"
                  value="Organizing and planning how to divide your time"
                  onChange={() => handleAnswerChange('question6', 'Organizing and planning how to divide your time')}
                  className="mr-2"
                />
                Organizing and planning how to divide your time
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question6"
                  value="Getting things done as fast as possible"
                  onChange={() => handleAnswerChange('question6', 'Getting things done as fast as possible')}
                  className="mr-2"
                />
                Getting things done as fast as possible
              </label>
            </li>
          </ul>
        </div>

        {/* Question 7 */}
        <div className="mb-6">
          <p className="text-lg font-bold">7. What is an example of good communication?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question7"
                  value="Listening actively and responding thoughtfully"
                  onChange={() => handleAnswerChange('question7', 'Listening actively and responding thoughtfully')}
                  className="mr-2"
                />
                Listening actively and responding thoughtfully
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question7"
                  value="Interrupting when you have a better idea"
                  onChange={() => handleAnswerChange('question7', 'Interrupting when you have a better idea')}
                  className="mr-2"
                />
                Interrupting when you have a better idea
              </label>
            </li>
          </ul>
        </div>

        {/* Question 8 */}
        <div className="mb-6">
          <p className="text-lg font-bold">8. What is adaptability?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question8"
                  value="The ability to adjust to new conditions"
                  onChange={() => handleAnswerChange('question8', 'The ability to adjust to new conditions')}
                  className="mr-2"
                />
                The ability to adjust to new conditions
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question8"
                  value="Sticking to a plan no matter what"
                  onChange={() => handleAnswerChange('question8', 'Sticking to a plan no matter what')}
                  className="mr-2"
                />
                Sticking to a plan no matter what
              </label>
            </li>
          </ul>
        </div>

        {/* Question 9 */}
        <div className="mb-6">
          <p className="text-lg font-bold">9. What is the benefit of teamwork?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question9"
                  value="It fosters collaboration and innovation"
                  onChange={() => handleAnswerChange('question9', 'It fosters collaboration and innovation')}
                  className="mr-2"
                />
                It fosters collaboration and innovation
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question9"
                  value="It allows one person to dominate the project"
                  onChange={() => handleAnswerChange('question9', 'It allows one person to dominate the project')}
                  className="mr-2"
                />
                It allows one person to dominate the project
              </label>
            </li>
          </ul>
        </div>

        {/* Question 10 */}
        <div className="mb-6">
          <p className="text-lg font-bold">10. What is the most important aspect of conflict resolution?</p>
          <ul className="mt-2">
            <li>
              <label>
                <input
                  type="radio"
                  name="question10"
                  value="Finding a win-win solution"
                  onChange={() => handleAnswerChange('question10', 'Finding a win-win solution')}
                  className="mr-2"
                />
                Finding a win-win solution
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="question10"
                  value="Making sure you get your way"
                  onChange={() => handleAnswerChange('question10', 'Making sure you get your way')}
                  className="mr-2"
                />
                Making sure you get your way
              </label>
            </li>
          </ul>
        </div>

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
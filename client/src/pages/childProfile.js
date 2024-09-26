import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import profileimg from '../assets/profileimg.svg';

function ImageButton() {
  const imageButton = (src, alt, to) => (
    <Link to={to}>
      <img
        src={src}
        alt={alt}
        className="w-full h-half object-cover"
      />
      <span className="sr-only">{alt}</span>
    </Link>
  );

  return (
    <div>
      {imageButton(logo, 'Go to homepage', '/')} 
    </div>
  );
}

function ChildProfile() {
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    favoriteColor: '',
    hobbies: '',
    learningStyle: '',
    academicStrengths: '',
    academicChallenges: '',
    socialSkills: '',
    communicationStyle: '',
  })

  const sections = [
    {
      title: "Basic Information",
      questions: [
        { type: 'text', name: 'name', label: "What's your child's name?" },
        { type: 'text', name: 'age', label: "How old is your child?" },
        { type: 'radio', name: 'favoriteColor', label: "What's your child's favorite color?", options: ['Red', 'Blue', 'Green', 'Yellow'] },
        { type: 'textarea', name: 'hobbies', label: "What are your child's hobbies?" },
      ]
    },
    {
      title: "Learning Profile",
      questions: [
        { type: 'radio', name: 'learningStyle', label: "What's your child's primary learning style?", options: ['Visual', 'Auditory', 'Kinesthetic'] },
        { type: 'textarea', name: 'academicStrengths', label: "What are your child's academic strengths?" },
        { type: 'textarea', name: 'academicChallenges', label: "What academic areas does your child find challenging?" },
      ]
    },
    {
      title: "Social and Communication",
      questions: [
        { type: 'radio', name: 'socialSkills', label: "How would you describe your child's social skills?", options: ['Excellent', 'Good', 'Needs Improvement'] },
        { type: 'textarea', name: 'communicationStyle', label: "Describe your child's communication style:" },
      ]
    }
  ]

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)  // Here you would typically send this data to your backend
    // Redirect or show a success message
  }

  const handleEnter = () => {
    // Any additional logic, such as form validation or API calls, can be added here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-header-blue p-4">
        <nav className="flex items-center justify-between container mx-auto">
          <div className="flex items-center space-x-3">
            <ImageButton/>
            <p className="text-2xl font-bold text-white">InfinitePath</p>
          </div>
          <div className="flex items-center space-x-6">
            <img src={profileimg} className="h-12 w-12 rounded-full" alt="profileimg" />
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Child Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{sections[currentSection].title}</h2>
            {sections[currentSection].questions.map((question, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={question.name} className="block text-sm font-medium text-gray-700 mb-1">
                  {question.label}
                </label>
                {question.type === 'text' && (
                  <input
                    type="text"
                    id={question.name}
                    name={question.name}
                    value={formData[question.name]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                )}
                {question.type === 'textarea' && (
                  <textarea
                    id={question.name}
                    name={question.name}
                    value={formData[question.name]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows={3}
                  />
                )}
                {question.type === 'radio' && (
                  <div className="mt-2 space-y-2">
                    {question.options.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          id={`${question.name}-${option}`}
                          name={question.name}
                          type="radio"
                          value={option}
                          checked={formData[question.name] === option}
                          onChange={() => handleRadioChange(question.name, option)}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor={`${question.name}-${option}`} className="ml-3 block text-sm font-medium text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
            {currentSection < sections.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
              >
                Next
              </button>
            ) : (
              <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r"
              onClick={handleEnter}  // On button click, this function will be triggered
            >
              Submit
            </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

export default ChildProfile;
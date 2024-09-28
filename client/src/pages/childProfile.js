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
  const [currentSection, setCurrentSection] = useState(0);
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
  });

  const sections = [
    {
      title: "Life Skills",
      questions: [
        { type: 'radio', name: 'independentDressing', label: "How independent is your child in getting dressed?", options: ['Fully independent in getting dressed.', 'Needs help with specific tasks, like zipping or buttoning.', 'Requires full assistance to get dressed.'] },
        { type: 'radio', name: 'restroomUse', label: "Can your child independently use the restroom?", options: ['Uses the restroom independently without assistance.', 'Can use the restroom but requires occasional reminders.', 'Requires full assistance to use the restroom.'] },
        { type: 'radio', name: 'hygieneIndependence', label: "How independent is your child in personal hygiene tasks (e.g., brushing teeth, handwashing)?", options: ['Fully independent in managing personal hygiene tasks.', 'Needs occasional reminders or assistance with hygiene tasks.', 'Requires full assistance with personal hygiene tasks.'] },
        { type: 'radio', name: 'dailyRoutine', label: "How well does your child manage their daily routine (e.g., waking up, getting ready for school)?", options: ['Manages daily routine independently.', 'Needs reminders or assistance to manage daily routine.', 'Requires significant help to manage daily routine.'] },
        { type: 'radio', name: 'routineChanges', label: "How does your child handle changes in routine or schedule?", options: ['Adapts easily to changes in routine or schedule.', 'Needs time to adjust to changes in routine or schedule.', 'Experiences distress or difficulty adapting to changes in routine.'] },
        { type: 'radio', name: 'householdTasks', label: "Can your child perform basic household tasks (e.g., setting the table, sorting laundry)?", options: ['Performs household tasks independently.', 'Sometimes performs tasks but needs reminders or supervision.', 'Requires assistance to perform basic household tasks.'] },
        { type: 'radio', name: 'feedingIndependence', label: "How independent is your child with feeding (e.g., using utensils, pouring drinks)?", options: ['Fully independent with feeding.', 'Needs help with some aspects, like cutting food or pouring drinks.', 'Requires significant assistance with feeding.'] },
        { type: 'radio', name: 'managingBelongings', label: "How responsible is your child with managing personal belongings (e.g., packing a bag, organizing toys)?", options: ['Fully responsible for managing belongings.', 'Needs occasional reminders to manage belongings.', 'Requires full assistance to manage belongings.'] },
        { type: 'radio', name: 'safetyTasks', label: "How well does your child manage safety-related tasks (e.g., locking doors, being cautious in dangerous situations)?", options: ['Manages safety tasks independently.', 'Needs reminders to manage safety tasks.', 'Requires full supervision to manage safety tasks.'] },
        { type: 'radio', name: 'healthRoutines', label: "How well does your child follow basic health-related routines (e.g., taking medication, washing hands)?", options: ['Follows health-related routines independently.', 'Needs reminders to follow health-related routines.', 'Requires assistance to follow health-related routines.'] },
        { type: 'textarea', name: 'lifeSkillExcellence', label: "What life skill (e.g., dressing, feeding, personal hygiene) does your child excel at the most? What areas do they struggle with the most?" },
        { type: 'textarea', name: 'reactionNewEnvironments', label: "How does your child react to new environments (e.g., a new school or visiting a relative’s home)?" },
      ]
    },
    {
      title: "Social Skills",
      questions: [
        { type: 'radio', name: 'engagementWithChildren', label: "How does your child typically engage with other children?", options: ['Actively initiates and engages in play with others.', 'Responds when others engage but rarely initiates play.', 'Prefers to play alone and avoids engaging with peers.'] },
        { type: 'radio', name: 'socialCues', label: "How well does your child understand and respond to social cues (e.g., facial expressions, tone of voice)?", options: ['Easily understands and responds appropriately.', 'Occasionally understands social cues but needs prompts.', 'Struggles to recognize or respond to social cues.'] },
        { type: 'radio', name: 'turnTaking', label: "Does your child take turns and share when playing games or interacting with peers?", options: ['Consistently takes turns and shares.', 'Sometimes takes turns but needs reminders.', 'Struggles with turn-taking and sharing.'] },
        { type: 'radio', name: 'groupActivities', label: "How does your child react to group activities (e.g., playing sports, classroom group work)?", options: ['Enjoys and participates actively.', 'Participates but needs encouragement.', 'Avoids or withdraws from group activities.'] },
        { type: 'radio', name: 'comfortWithUnfamiliarPeople', label: "How comfortable is your child with unfamiliar people?", options: ['Quickly becomes comfortable.', 'Hesitant at first but warms up over time.', 'Avoids or struggles to engage.'] },
        { type: 'radio', name: 'emotionalExpression', label: "Does your child express their emotions appropriately?", options: ['Clearly and consistently expresses emotions.', 'Sometimes expresses emotions but needs prompts.', 'Struggles to express emotions appropriately.'] },
        { type: 'radio', name: 'followingSocialRules', label: "How well does your child follow social rules (e.g., saying “please” and “thank you”)?", options: ['Consistently follows social rules.', 'Occasionally follows rules but needs reminders.', 'Struggles to follow social rules.'] },
        { type: 'radio', name: 'conflictHandling', label: "How does your child handle conflicts with peers?", options: ['Resolves conflicts appropriately.', 'Needs help or reminders to resolve conflicts.', 'Struggles to resolve conflicts.'] },
        { type: 'radio', name: 'feedbackResponse', label: "How does your child respond to feedback or criticism?", options: ['Accepts feedback well and responds appropriately.', 'Sometimes accepts feedback but may get upset or defensive.', 'Struggles to accept feedback.'] },
        { type: 'radio', name: 'helpSeeking', label: "Does your child ask for help when needed in social situations?", options: ['Consistently asks for help.', 'Sometimes asks for help but needs reminders.', 'Rarely asks for help.'] },
        { type: 'textarea', name: 'recentSocialInteraction', label: "Can you describe a recent social interaction where your child excelled? What challenges do they usually face?" },
        { type: 'textarea', name: 'frustrationHandling', label: "How does your child respond when they’re frustrated or upset in social situations?" },
      ]
    },
    {
      title: "Academic Skills",
      questions: [
        { type: 'radio', name: 'basicMath', label: "How well does your child perform basic math tasks?", options: ['Performs independently.', 'Requires occasional help.', 'Struggles significantly and needs support.'] },
        { type: 'radio', name: 'readingComfort', label: "How comfortable is your child with reading age-appropriate material?", options: ['Reads independently and comprehends well.', 'Needs help with some words or comprehension.', 'Faces significant difficulty and requires support.'] },
        { type: 'radio', name: 'writingTasks', label: "How does your child approach writing tasks?", options: ['Writes confidently and independently.', 'Requires assistance with spelling or sentence structure.', 'Finds writing tasks challenging and needs help.'] },
        { type: 'radio', name: 'instructionFollowing', label: "Does your child understand and follow instructions during classroom activities?", options: ['Follows instructions independently.', 'Occasionally needs reminders or help.', 'Requires step-by-step guidance.'] },
        { type: 'radio', name: 'problemSolving', label: "How does your child approach problem-solving activities?", options: ['Completes tasks independently.', 'Attempts but often requires guidance.', 'Avoids or struggles with problem-solving.'] },
        { type: 'radio', name: 'engagementInLearning', label: "How engaged is your child in learning activities?", options: ['Actively participates and completes tasks.', 'Needs encouragement but can complete tasks when motivated.', 'Has difficulty staying focused and completing tasks.'] },
        { type: 'radio', name: 'recognizingShapesColors', label: "How well does your child recognize basic shapes, colors, or numbers?", options: ['Identifies independently.', 'Occasionally needs reminders or assistance.', 'Struggles with recognition.'] },
        { type: 'radio', name: 'tellingTime', label: "How comfortable is your child with telling time and understanding basic measurements?", options: ['Understands without difficulty.', 'Needs help or reminders.', 'Faces challenges with time-telling and measurements.'] },
        { type: 'radio', name: 'memorization', label: "How does your child handle tasks that involve memorization?", options: ['Recalls facts and vocabulary with ease.', 'Requires additional time or strategies.', 'Struggles with memorization and recalling facts.'] },
        { type: 'radio', name: 'comprehensionOfInstructions', label: "How well does your child comprehend spoken instructions?", options: ['Listens attentively and understands well.', 'Occasionally needs reminders.', 'Finds it difficult to comprehend spoken instructions.'] },
        { type: 'textarea', name: 'academicStrengthsChallenges', label: "What academic subjects does your child excel at, and what subjects do they find challenging?" },
        { type: 'textarea', name: 'recentLearningExperience', label: "Can you describe a recent learning experience where your child showed progress? What challenges did they face?" },
      ]
    }
  ];

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  // Here you would typically send this data to your backend
    navigate(`/dashboard/?email=${encodeURIComponent("apple@apple.com")}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-header-blue p-4">
        <nav className="flex items-center justify-between container mx-auto">
          <div className="flex items-center space-x-3">
            <ImageButton />
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
                type="button"
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r"
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
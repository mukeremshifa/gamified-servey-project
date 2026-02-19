import { useState } from "react";
import TopBar from "./components/TopBar";
import RenderQuestion from "./components/RenderQuestion";
import XPFloat from "./components/XPFloat";

function App() {


  const survey = {
  id: "s1",
  title: "Customer Experience Survey",
  questions: [
    {
      id: "q1",
      type: "mcq",
      text: "How satisfied are you with our service?",
      options: [
        { id: "a", label: "Very satisfied", xp: 10 },
        { id: "b", label: "Neutral", xp: 10 },
        { id: "c", label: "Not satisfied", xp: 10 },
      ],
    },
    {
      id: "q2",
      type: "binary",
      text: "Would you recommend us to a friend?",
      options: [
        { id: "yes", label: "Yes", xp: 10 },
        { id: "no", label: "No", xp: 10 },
      ],
    },
    {
      id: "q3",
      type: "rating",
      text: "Rate your overall experience",
      max: 5,
      leftLabel: "Poor",
      rightLabel: "Excellent",
      xp: 15,
    },
  ],
};


const [currentIndex, setCurrentIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [xpFloat, setXpFloat] = useState(null);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = survey.questions[currentIndex];

  const handleAnswer = (answer) => {
  const earnedXp = answer?.xp || currentQuestion.xp || 10;

  setXp((prev) => prev + earnedXp);
  setXpFloat(earnedXp);   // trigger animation
  setAnswered(true);
};


  const handleNext = () => {
    if (currentIndex < survey.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
    } else {
      alert("Survey Completed 🎉");
    }
  };




  return (
    <body className="w-screen h-screen bg-white grid place-items-center">
      <main className="w-[90vw] h-[90vh] bg-gray-50 rounded-lg shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
 <TopBar
        currentQuestion={currentIndex + 1}
        totalQuestions={survey.questions.length}
        xp={xp}
      />
        <div className="w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out">
<RenderQuestion question={currentQuestion} onAnswer={handleAnswer} />
        </div>

          <div className="pb-10 flex justify-end w-full px-10">
        <button
          onClick={handleNext}
          disabled={!answered}
          className={`
            px-8 py-3 rounded-xl font-semibold transition-all
            ${
              answered
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Next
        </button>
      </div>


      {xpFloat && (
  <XPFloat
    amount={xpFloat}
    onDone={() => setXpFloat(null)}
  />
)}


      </main>
    </body>
  );
}

export default App;

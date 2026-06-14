import { useState } from "react";

export default function QuestionCard() {
  const [selected, setSelected] = useState(null);

  const question = {
    id: "q1",
    text: "How satisfied are you with our service?",
    options: [
      { id: "a", label: "Very satisfied" },
      { id: "b", label: "Neutral" },
      { id: "c", label: "Not satisfied" },
    ],
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
        
        {/* Question */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {question.text}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option) => {
            const isSelected = selected === option.id;

            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`
                  w-full text-left px-5 py-4 rounded-xl border
                  transition-all duration-200
                  ${isSelected
                    ? "bg-blue-50 border-blue-500 ring-2 scale-[1.02] ring-blue-200"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"}
                `}
              >
                <span className="text-gray-700 font-medium">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Hint */}
        <div className="mt-6 text-sm text-gray-400">
          Select one option to continue
        </div>
      </div>
    </div>
  );
}

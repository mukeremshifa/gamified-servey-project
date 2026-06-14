import { useState } from "react";

export default function BinaryCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        {question.text}
      </h2>

      <div className="flex gap-6 justify-center">
        {question.options.map((option) => {
          const isSelected = selected === option.id;

          return (
            <button
              key={option.id}
              onClick={() => {
                setSelected(option.id);
                onAnswer(option);
              }}
              className={`
                flex-1 py-6 rounded-xl border text-lg font-semibold transition-all duration-200
                ${isSelected
                  ? "bg-blue-500 text-white scale-105 shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200"}
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

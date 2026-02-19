import { useState } from "react";

export default function RatingCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const scale = Array.from({ length: question.max }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        {question.text}
      </h2>

      <div className="flex justify-between items-center">
        {scale.map((value) => {
          const isSelected = selected === value;

          return (
            <button
              key={value}
              onClick={() => {
                setSelected(value);
                onAnswer(value);
              }}
              className={`
                w-12 h-12 rounded-full border flex items-center justify-center font-semibold
                transition-all duration-200
                ${isSelected
                  ? "bg-blue-500 text-white scale-110 shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"}
              `}
            >
              {value}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-sm text-gray-400 mt-4">
        <span>{question.leftLabel}</span>
        <span>{question.rightLabel}</span>
      </div>
    </div>
  );
}

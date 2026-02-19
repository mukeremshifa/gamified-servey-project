export default function TopBar({
  currentQuestion = 1,
  totalQuestions = 5,
  xp = 0,
}) {
  const progress = (currentQuestion / totalQuestions) * 100;

  // Simple level logic
  const getLevel = (xp) => {
    if (xp < 50) return 1;
    if (xp < 120) return 2;
    if (xp < 200) return 3;
    return 4;
  };

  const level = getLevel(xp);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">

      {/* Level Badge */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold shadow-sm">
          {level}
        </div>
        <span className="text-sm text-gray-600 font-medium">
          Level {level}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 mx-8">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-center">
          Question {currentQuestion} of {totalQuestions}
        </div>
      </div>

      {/* XP Counter */}
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl font-semibold shadow-sm">
          ⚡ {xp} XP
        </div>
      </div>

    </div>
  );
}

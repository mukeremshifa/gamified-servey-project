import BinaryCard from './questions/BinaryCard.jsx';
import MCQCard from './questions/MCQCard.jsx';
import RatingCard from './questions/RatingCard.jsx';
import SliderCard from './questions/SliderCard.jsx';
import TextCard from './questions/TextCard.jsx';

const REGISTRY = {
  mcq: MCQCard,
  binary: BinaryCard,
  rating: RatingCard,
  text: TextCard,
  slider: SliderCard,
};

export default function RenderQuestion({ question, value, onAnswer }) {
  const Component = REGISTRY[question.type];
  if (!Component) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold">Unsupported question type</div>
        <div className="mt-1 text-sm text-slate-300">
          Type <span className="font-mono">{String(question.type)}</span> is not registered.
        </div>
      </div>
    );
  }

  return <Component question={question} value={value} onAnswer={onAnswer} />;
}

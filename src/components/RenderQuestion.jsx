import MCQCard from "./MCQCard";
import BinaryCard from "./BinaryCard";
import RatingCard from "./RatingCard";

export default function QuestionRenderer({ question, onAnswer }) {
  switch (question.type) {
    case "mcq":
      return <MCQCard question={question} onAnswer={onAnswer} />;

    case "binary":
      return <BinaryCard question={question} onAnswer={onAnswer} />;

    case "rating":
      return <RatingCard question={question} onAnswer={onAnswer} />;

    default:
      return <div>Unsupported question type</div>;
  }
}

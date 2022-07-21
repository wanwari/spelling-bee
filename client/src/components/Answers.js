import { useState } from "react";

const Answers = (props) => {
	const [answerBtnText, setAnswerBtnText] = useState("Show Answers");
	const [showAnswers, setShowAnswers] = useState(false);

	const toggleShowAnswers = () => {
		setShowAnswers(!showAnswers);
		if (showAnswers) setAnswerBtnText("Show Answers");
		else setAnswerBtnText("Hide Answers");
	};

	return (
		<div className="w-2/5 md:w-1/4 m-2">
			<button
				onClick={toggleShowAnswers}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				{answerBtnText}
			</button>
			<div className="m-2 overflow-scroll">
				<ul className={showAnswers ? "block" : "hidden"}>
					<div>
						{props.answers.map((answer) => {
							const style = props.wordsFound.includes(answer)
								? "bg-green-200"
								: "bg-red-200";
							return (
								<li key={answer} className={style}>
									{answer}
								</li>
							);
						})}
					</div>
				</ul>
			</div>
		</div>
	);
};

export default Answers;

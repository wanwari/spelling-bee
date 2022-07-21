const ScoringRankings = ({ currentScore, scoringTable }) => {
	const beginner =
		currentScore >= scoringTable.beginner
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	const goodStart =
		currentScore >= scoringTable.goodStart
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	const movingUp =
		currentScore >= scoringTable.movingUp
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	const good =
		currentScore >= scoringTable.good
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	const solid =
		currentScore >= scoringTable.solid
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	const nice =
		currentScore >= scoringTable.nice
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	const great =
		currentScore >= scoringTable.great
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	const amazing =
		currentScore >= scoringTable.amazing
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	const genius =
		currentScore >= scoringTable.genius
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	const queenBee =
		currentScore >= scoringTable.queenBee
			? "bg-green-300 p-2"
			: "bg-red-300 p-2";
	return (
		<div>
			<ul>
				<li className={beginner}>Beginner - {scoringTable.beginner}</li>
				<li className={goodStart}>
					Good Start - {scoringTable.goodStart}
				</li>
				<li className={movingUp}>
					Moving Up - {scoringTable.movingUp}
				</li>
				<li className={good}>Good - {scoringTable.good}</li>
				<li className={solid}>Solid- {scoringTable.solid}</li>
				<li className={nice}>Nice- {scoringTable.nice}</li>
				<li className={great}>Great - {scoringTable.great}</li>
				<li className={amazing}>Amazing - {scoringTable.amazing}</li>
				<li className={genius}>Genius - {scoringTable.genius}</li>
				<li className={queenBee}>Queen Bee- {scoringTable.queenBee}</li>
			</ul>
		</div>
	);
};

export default ScoringRankings;

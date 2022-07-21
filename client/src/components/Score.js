const Score = ({ points, guessResult }) => {
	return (
		<div>
			<p className="mb-2 text-2xl font-bold text-green-500">
				Points: {points}
			</p>
			<p className="mb-2">{guessResult}</p>
		</div>
	);
};

export default Score;

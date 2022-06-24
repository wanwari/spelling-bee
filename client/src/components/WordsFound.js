const WordsFound = ({ wordsFound, answers }) => {
	return (
		<div className="w-2/5 md:w-1/4">
			{wordsFound.length > 0 && (
				<div>
					<p>
						Words Found: {wordsFound.length}/{answers.length}
					</p>

					<div className="h-24 overflow-scroll m-2 p-2 bg-yellow-200">
						<ul>
							{wordsFound.map((word) => (
								<li key={word}>{word}</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default WordsFound;

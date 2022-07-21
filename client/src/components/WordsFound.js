const WordsFound = ({ wordsFound, answers, pangram }) => {
	return (
		<div className="w-4/5 md:w-1/4">
			{wordsFound.length > 0 && (
				<div>
					<p>
						Words Found: {wordsFound.length}/{answers.length}
					</p>

					<div className="h-20 overflow-scroll my-2 p-2 bg-yellow-200">
						<ul>
							{wordsFound.map((word) => {
								if (word === pangram)
									return (
										<li
											key={word}
											className="inline font-bold"
										>
											{word}{" "}
										</li>
									);
								else
									return (
										<li key={word} className="inline">
											{word}{" "}
										</li>
									);
							})}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default WordsFound;

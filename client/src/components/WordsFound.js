const WordsFound = ({ wordsFound, answers }) => {
	let listOfWordsFound = "";
	wordsFound.forEach((word) => {
		if (listOfWordsFound === "") listOfWordsFound = word;
		else listOfWordsFound = listOfWordsFound + ", " + word;
	});

	return (
		<div className="w-2/5 md:w-1/4">
			{wordsFound.length > 0 && (
				<div>
					<p>
						Words Found: {wordsFound.length}/{answers.length}
					</p>

					<div className="h-20 overflow-scroll m-2 p-2 bg-yellow-200">
						{listOfWordsFound}
					</div>
				</div>
			)}
		</div>
	);
};

export default WordsFound;

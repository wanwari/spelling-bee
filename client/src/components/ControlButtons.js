const ControlButtons = ({
	deleteLetter,
	evaluateGuess,
	clearKeyboard,
	shuffleKeyboard,
}) => {
	return (
		<div>
			<div className="my-1">
				<input
					type="button"
					value="Delete"
					onClick={() => deleteLetter()}
					className="px-8 py-3 m-2 bg-red-300 text-black border border-black font-medium text-md uppercase rounded-lg md:hover:bg-red-400 hover:drop-shadow-md cursor-pointer"
				/>
				<input
					type="button"
					value="Enter"
					onClick={() => evaluateGuess()}
					className="px-8 py-3 m-2 bg-green-200 text-black border border-black font-medium text-md uppercase rounded-lg md:hover:bg-green-400 hover:drop-shadow-md cursor-pointer"
				/>
				<input
					type="button"
					value="Shuffle"
					onClick={() => shuffleKeyboard()}
					className="px-8 py-3 m-2 bg-purple-300 text-black border border-black font-medium text-md uppercase rounded-lg md:hover:bg-purple-400 hover:drop-shadow-md cursor-pointer"
				/>
				<input
					type="button"
					value="Clear"
					onClick={() => clearKeyboard()}
					className="px-8 py-3 m-2 bg-orange-200 text-black border border-black font-medium text-md uppercase rounded-lg md:hover:bg-orange-300 hover:drop-shadow-md cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default ControlButtons;

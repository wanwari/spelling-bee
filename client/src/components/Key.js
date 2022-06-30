const Key = ({ letter, keyboardPressed, mainLetter }) => {
	const colour = mainLetter
		? "bg-yellow-300 md:hover:bg-yellow-400"
		: "bg-slate-300 md:hover:bg-slate-400 md:hover:shadow-lg";

	return (
		<input
			key={letter}
			onClick={() => keyboardPressed(letter)}
			type="button"
			value={letter}
			className={
				colour +
				"  w-20 h-20 text-4xl m-1.5 text-black uppercase rounded cursor-pointer"
			}
		/>
	);
};

export default Key;

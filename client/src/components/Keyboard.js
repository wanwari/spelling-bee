import Key from "./Key";

const Keyboard = ({ letters, keyboardPressed }) => {
	return (
		<div className="my-6">
			<div>
				<Key
					letter={letters[1]}
					keyboardPressed={(keyPressed) =>
						keyboardPressed(keyPressed)
					}
					mainLetter={false}
				/>
				<Key
					letter={letters[2]}
					keyboardPressed={(keyPressed) =>
						keyboardPressed(keyPressed)
					}
					mainLetter={false}
				/>
			</div>
			<div>
				<Key
					letter={letters[3]}
					keyboardPressed={(keyPressed) =>
						keyboardPressed(keyPressed)
					}
					mainLetter={false}
				/>
				<Key
					letter={letters[0]}
					keyboardPressed={(keyPressed) =>
						keyboardPressed(keyPressed)
					}
					mainLetter={true}
				/>
				<Key
					letter={letters[4]}
					keyboardPressed={(keyPressed) =>
						keyboardPressed(keyPressed)
					}
					mainLetter={false}
				/>
			</div>
			<div>
				<Key
					letter={letters[5]}
					keyboardPressed={(keyPressed) =>
						keyboardPressed(keyPressed)
					}
					mainLetter={false}
				/>
				<Key
					letter={letters[6]}
					keyboardPressed={(keyPressed) =>
						keyboardPressed(keyPressed)
					}
					mainLetter={false}
				/>
			</div>
		</div>
	);
};

export default Keyboard;

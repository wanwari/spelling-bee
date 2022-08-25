import { useState } from "react";

const Help = ({ hints }) => {
	const [showHelp, setShowHelp] = useState(false);

	const toggleHelp = () => {
		setShowHelp(!showHelp);
	};

	console.log(hints);

	return (
		<div className="justify-self-end">
			<button
				className="bg-white w-8 h-8 rounded-lg mt-2 mr-2"
				onClick={() => toggleHelp()}
			>
				?
			</button>

			{showHelp && (
				<div className="absolute left-0 top-0 w-full h-full bg-blue-100">
					<button
						className="w-8 h-8 rounded-lg float-right bg-white mt-2 mr-2"
						onClick={() => toggleHelp()}
					>
						X
					</button>
					<div>
						<div className="m-8">
							<h1 className="text-3xl clear-both mb-2">
								Todays Hints
							</h1>
							<p>
								First two letters and how many times they occur
							</p>
							{Object.keys(hints).map((hint, index, elements) => {
								console.log(elements);

								if (index + 1 < elements.length) {
									if (
										elements[index].charAt(0) ===
										elements[index + 1].charAt(0)
									) {
										return (
											<span>
												<span className="font-bold">
													{hint}
												</span>
												-{hints[hint]} &nbsp;
											</span>
										);
									} else {
										return (
											<span>
												<span className="font-bold">
													{hint}
												</span>
												-{hints[hint]} &nbsp;
												<br></br>
											</span>
										);
									}
								} else {
									return (
										<span>
											<span className="font-bold">
												{hint}
											</span>
											-{hints[hint]} &nbsp;
										</span>
									);
								}
							})}
						</div>
						<div className="m-8">
							<h1 className="text-3xl clear-both mb-2">
								Create as many words as you can
							</h1>
							<ul>
								<li>
									All words must be at least 4 letters long
								</li>
								<li>
									All words much contain the center letter
								</li>
								<li>Letters can be used more than once</li>
							</ul>
						</div>
						<div className="m-8">
							<h1 className="text-3xl clear-both mb-2">Points</h1>
							<ul>
								<li>4 letter words are worth 1 point</li>
								<li>Each letter over 4 is worth 1 point</li>
								<li>
									The pangram (word that contains every letter
									at least once) is worth 7 extra letters
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Help;

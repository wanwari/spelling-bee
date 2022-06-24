const GuessBar = props => {
    return(
        <div className="mt-6">
            <form onSubmit={ props.evaluateGuess }>
                <input
                    type="text"
                    id="guessBar" 
                    value={ props.guessBarText }
                    placeholder="Type or click"
                    ref={ props.guessInput }
                    onChange={(event) => props.onGuessBarChange(event.target.value)}
                    className="form-control text-2xl p-2 text-gray-700 rounded-lg uppercase border-yellow-300 border-b-2 text-center focus:outline-none"
                />  
            </form>
        </div>
    );

}

export default GuessBar;
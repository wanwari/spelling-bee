const Keyboard = ({ letters, keyboardPressed }) => {

    return(
        <div>
            <h1>Keyboard.js</h1>

            {letters.map((letter, index) => {
                    const colour = (index === 0) ? "bg-yellow-500" : "bg-yellow-400";
                    return <input 
                        key={letter} 
                        onClick={() => keyboardPressed(letter)} 
                        type="button" 
                        value={letter} 
                        className={colour + " px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"}
                    />
            })}
        </div>
    );
}

export default Keyboard;
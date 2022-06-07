const Keyboard = ({ letters }) => {

    const clickButton = letter => {
        console.log(letter);
    }
    return(
        <div>
            <h1>Keyboard.js</h1>

            {letters.map(letter => (
                   <input 
                        key={letter} 
                        onClick={() => clickButton(letter)} 
                        type="button" 
                        value={letter} 
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    />
            ))}
        </div>
    );
}

export default Keyboard;
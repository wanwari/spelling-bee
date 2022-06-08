const Keyboard = ({ letters, keyboardPressed }) => {

    return(
        <div>
            {letters.map((letter, index) => {
                    const colour = (index === 0) ? "bg-yellow-300" : "bg-slate-300";
                    return <input 
                        key={letter} 
                        onClick={() => keyboardPressed(letter)} 
                        type="button" 
                        value={letter} 
                        className={colour + "   px-4 py-3 m-2 text-black text-lg leading-tight uppercase rounded shadow-xl cursor-pointer"}
                    />
            })}
        </div>
    );
}

export default Keyboard;
const Key = ({ letter, keyboardPressed, mainLetter }) => {

    const colour = mainLetter ? "bg-yellow-300 hover:bg-yellow-400" : "bg-slate-300 hover:bg-slate-400 hover:shadow-lg";

    return(
        <input 
            key={ letter } 
            onClick={() => keyboardPressed(letter)} 
            type="button" 
            value={ letter } 
            className={colour + "   px-5 py-4 m-1.5 text-black text-lg leading-tight uppercase rounded cursor-pointer"}
        />
    );
}

export default Key;
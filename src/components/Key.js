const Key = ({ letter, keyboardPressed, mainLetter }) => {

    const colour = mainLetter ? "bg-yellow-300" : "bg-slate-300";

    return(
        <input 
            key={ letter } 
            onClick={() => keyboardPressed(letter)} 
            type="button" 
            value={ letter } 
            className={colour + "   px-4 py-3 m-1 text-black text-lg leading-tight uppercase rounded shadow-xl cursor-pointer"}
        />
    );
}

export default Key;
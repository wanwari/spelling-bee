const Score = ({points, guessResult}) => {
    return(
        <div>
            <p className="mb-2">Points: { points }</p>
            <p className="mb-2">{guessResult}</p>
        </div>
    );
}

export default Score;
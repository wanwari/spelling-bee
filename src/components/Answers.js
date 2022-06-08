const Answers = ({answers, wordsFound}) => {

    console.log(answers);
    console.log(wordsFound);
    return(
        <div>
            {answers.map((answer) => {
                const style = wordsFound.includes(answer) ? "bg-green-200" : "bg-red-200";
                return <li className={style}>{ answer }</li>;
            })}
        </div>
    );
}

export default Answers;
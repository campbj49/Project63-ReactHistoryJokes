import { useState } from "react";
/**Hook that manages score values */
const useScore = () =>{
    const [score, setScore] = useState(0);

    const upVote = ()=> setScore(score + 1);
    const downVote = ()=> setScore(score - 1);

    return [score, upVote, downVote];
}

export default useScore;
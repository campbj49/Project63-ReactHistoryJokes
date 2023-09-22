import React, { Component, useState, useEffect} from "react";
import useScore from "./useScore";
import "./Joke.css";

/** A single joke, along with vote up/down buttons. */

function Joke({id, text, updateScore}){
  const[votes, upVote, downVote] = useScore();
  //effect that attatches the votes state to the parent vote list
  useEffect(function attatchStates(){
    
  }, [])

  

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={evt => {upVote();updateScore(id, votes+1);}}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={evt => {downVote();updateScore(id, votes-1);}}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;

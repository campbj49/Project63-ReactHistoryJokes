import React, { Component, useState, useEffect} from "react";
import useScore from "./useScore";
import "./Joke.css";

/** A single joke, along with vote up/down buttons. */

function Joke({id, text}){
  const[votes, upVote, downVote] = useScore();

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={evt => upVote()}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={evt => downVote()}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}

export default Joke;

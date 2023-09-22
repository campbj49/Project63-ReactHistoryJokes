import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */

function JokeList({numJokesToGet = 5}){
  //refactoring this.state to useState
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //effect for initial page load and new joke button press
  useEffect(function getJokesOnRender(){
    async function getJokes() {
      try {
        // load jokes one at a time, adding not-yet-seen jokes
        let jokes = [];
        let seenJokes = new Set();
  
        while (jokes.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { ...joke } = res.data;
  
          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            jokes.push({ ...joke, votes: 0 });
          } else {
            console.log("duplicate found!");
          }
        }
  
        setJokes(jokes);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    getJokes();
  },[isLoading])

  //onClick function for primary button to trigger re-render
  function generateNewJokes(){
    setIsLoading(true);
    setJokes([]);
  }

  //effect that runs on every render to make sure the list is sorted
  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  useEffect(function sortJokes(){
    sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  },[jokes])

  //function that lets Joke components communicate with the parent
  function updateScore(id, votes){
    let updatedJokes = [];
    for(let joke of [...jokes]){
      if(joke.id ===id) joke.votes = votes;
      updatedJokes.push(joke);
    }
    setJokes(updatedJokes);
  }

  //render options
  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }

  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
      </button>

      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          updateScore = {updateScore}
        />
      ))}
    </div>
  );
  return(
    <div className="JokeList">
      <p>placeholder to make sure nothing has broken yet</p>
    </div>
  )
}

// class JokeList extends Component {
//   static defaultProps = {
//     numJokesToGet: 5
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       jokes: [],
//       isLoading: true
//     };

//     this.generateNewJokes = this.generateNewJokes.bind(this);
//     this.vote = this.vote.bind(this);
//   }

//   /* at mount, get jokes */

//   componentDidMount() {
//     this.getJokes();
//   }

//   /* retrieve jokes from API */

//   async getJokes() {
//     try {
//       // load jokes one at a time, adding not-yet-seen jokes
//       let jokes = [];
//       let seenJokes = new Set();

//       while (jokes.length < this.props.numJokesToGet) {
//         let res = await axios.get("https://icanhazdadjoke.com", {
//           headers: { Accept: "application/json" }
//         });
//         let { ...joke } = res.data;

//         if (!seenJokes.has(joke.id)) {
//           seenJokes.add(joke.id);
//           jokes.push({ ...joke, votes: 0 });
//         } else {
//           console.log("duplicate found!");
//         }
//       }

//       this.setState({ jokes, isLoading: false });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   /* empty joke list, set to loading state, and then call getJokes */

//   generateNewJokes() {
//     this.setState({ isLoading: true});
//     this.getJokes();
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   vote(id, delta) {
//     this.setState(st => ({
//       jokes: st.jokes.map(j =>
//         j.id === id ? { ...j, votes: j.votes + delta } : j
//       )
//     }));
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   render() {
//     let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
//     if (this.state.isLoading) {
//       return (
//         <div className="loading">
//           <i className="fas fa-4x fa-spinner fa-spin" />
//         </div>
//       )
//     }

//     return (
//       <div className="JokeList">
//         <button
//           className="JokeList-getmore"
//           onClick={this.generateNewJokes}
//         >
//           Get New Jokes
//         </button>

//         {sortedJokes.map(j => (
//           <Joke
//             text={j.joke}
//             key={j.id}
//             id={j.id}
//             votes={j.votes}
//             vote={this.vote}
//           />
//         ))}
//       </div>
//     );
//   }
// }

export default JokeList;

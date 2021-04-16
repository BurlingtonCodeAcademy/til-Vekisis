//Imports
import React from "react";
import { useEffect, useState, Link } from "react";

//Function that interacts with the DB to get CRUD functionality
export default function Facts() {
  const [results, setResults] = useState();
  //Fetches the post info from the api
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((factsList) => {
        setResults(factsList);
      });
  });
  // Creates the array and fills it
  let postArray = [];
  results && //Reads if true
    results.forEach((post) => {
      postArray.push(post);
    });

  return (
    <div className="post-container">
        {/* Container for all new facts */}
      <h4 className="facts-container">Posts</h4>
      {postArray.map((post, index) => {
        return (
          <div className="posts">
            <h1 key={index}>{post.id}</h1>
            <u>
              <h2 key={index}>{post.title}</h2>
            </u>
            <h5 key={index}>Written by: {post.author}</h5>
            <p key={index}>{post.fact}</p>
            <p key={index}>{post.date}</p>
          </div>
        );
      })}
    </div>
  );
}

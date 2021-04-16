//Imports
import React from "react";

//Component that renders the homepage
export default function Home() {
  return (
    // Contains the inputs on the homepage
    <div class="home-container">
      <h3>Enter a post</h3>
      {/* Form to send to MongoDB */}
      <form action="/api" method="POST" id="form">
        {/* title */}
        <div id="author-container">
          <input name="title" type="text" placeholder="title" />
          {/* author */}
          <input name="author" type="text" placeholder="Author" />
        </div>
        <div id="fact-container">
        <textarea id="fact" name="fact" placeholder="Submit fact" />
        <input type="submit" />
        </div>
      </form>
    </div>
  );
}

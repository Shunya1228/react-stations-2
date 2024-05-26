import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (threadId) => {
    try {
      const res = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads`
      );
      const resjason = await res.json();
      console.log(resjason);
      setPosts(resjason);
    } catch (e) {
      console.error(e);
    }
    // fetch(`https://railway.bulletinboard.techtrain.dev/threads`)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     console.log(response.json())
    //     return response.json();
    //   })
    //   .then(data => {
    //     if (data && data.posts) {
    //       setPosts(data.posts); // data.posts が配列であることを仮定しています
    //     } else {
    //       throw new Error('No posts found');
    //     }
    //   })
    //   .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <>
      <div>
        <Header />
        <body>
          {posts.map((post) => (
            <p key={post.id}>{post.title}</p>
          ))}
        </body>
      </div>
    </>
  );
}

export default App;

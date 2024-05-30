import React, { useState, useEffect } from "react";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewThread from "./NewThread";
import ThreadDetails from "./ThreadDetails";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const FetchPosts = await fetchPosts();
      setPosts(FetchPosts);
    })();
  }, []);

  const fetchPosts = async (threadId) => {
    try {
      const res = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads`
      );
      const resjason = await res.json();

      return resjason;
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
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                {posts.map((post) => (
                  <p className="thread" key={post.id}>
                    {post.title}
                  </p>
                ))}
              </main>
            }
          />
          <Route path="/threads/new" element={<NewThread />} />
          <Route path="/threads/:thread_id" element={<ThreadDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

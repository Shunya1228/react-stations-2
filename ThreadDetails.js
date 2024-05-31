import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ThreadDetails = () => {
  const { threadid } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://railway.bulletinboard.techtrain.dev/threads/${threadid}/posts`
        );
        const resJson = await res.json();
        if (Array.isArray(resJson)) {
          setPosts(resJson);
        } else if (resJson && Array.isArray(resJson.posts)) {
          setPosts(resJson.posts);
        } else {
          setPosts([]); // デフォルト値として空の配列を設定
        }
      } catch (e) {
        console.error(e);
        setPosts([]); // エラー時も空の配列を設定
      }
    };

    fetchPosts();
  }, [threadid]);

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ThreadDetails;

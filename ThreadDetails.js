import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ThreadDetails = () => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`
        );
        const resJson = await res.json();
        console.log("API Response:", resJson); // デバッグ用
        if (resJson && Array.isArray(resJson.posts)) {
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
  }, [thread_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post: newPostContent,
          }),
        }
      );
      if (res.ok) {
        const newPost = await res.json();
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setNewPostTitle("");
        setNewPostContent("");
      } else {
        console.error("Failed to add post");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>投稿内容</label>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">投稿</button>
      </form>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.post}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ThreadDetails;

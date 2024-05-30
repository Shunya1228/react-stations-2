import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ThreadDetails = () => {
  const { threadId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`);
        const resJson = await res.json();
        setPosts(resJson);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPosts();
  }, [threadId]);

  return (
    <div>
      <h2>Thread Details</h2>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ThreadDetails;

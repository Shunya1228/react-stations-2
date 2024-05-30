import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewThread = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://railway.bulletinboard.techtrain.dev/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        navigate("/"); // 新しいスレッドが作成されたらホームページにリダイレクト
      } else {
        console.error("Failed to create new thread");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2>スレッドを新規作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">作成</button>
      </form>
    </div>
  );
};

export default NewThread;

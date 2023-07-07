import React, { useState } from 'react';

const Instagram = () => {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  const handlePost = (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.file;
    const file = fileInput.files[0];

    if (!file || !file.type.startsWith('image/')) {
      console.log('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;

      const newPost = {
        id: Date.now(),
        image: imageUrl,
        likes: 0,
        comments: [],
      };

      setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    reader.readAsDataURL(file);
    fileInput.value = null; // Reset the file input
  };

  const handleLikePost = (postId) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          const newLikes = post.likes === 0 ? post.likes + 1 : post.likes - 1;

          return {
            ...post,
            likes: newLikes,
          };
        }
        return post;
      });
    });
  };

  const handleLikeComment = (postId, commentIndex) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          const newComments = post.comments.map((comment, index) => {
            if (index === commentIndex) {
              const newLikes =
                comment.likes === 0 ? comment.likes + 1 : comment.likes - 1;

              return {
                ...comment,
                likes: newLikes,
              };
            }
            return comment;
          });

          return {
            ...post,
            comments: newComments,
          };
        }
        return post;
      });
    });
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => {
      return prevPosts.filter((post) => post.id !== postId);
    });
  };

  const handleEditComment = (postId, commentIndex, newText) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          const newComments = post.comments.map((comment, index) => {
            if (index === commentIndex) {
              return {
                ...comment,
                text: newText,
              };
            }
            return comment;
          });

          return {
            ...post,
            comments: newComments,
          };
        }
        return post;
      });
    });
  };

  const handleDeleteComment = (postId, commentIndex) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          const newComments = post.comments.filter(
            (_, index) => index !== commentIndex
          );

          return {
            ...post,
            comments: newComments,
          };
        }
        return post;
      });
    });
  };

  const handleComment = (postId) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { text: commentInput, likes: 0 }],
          };
        }
        return post;
      });
    });
    setCommentInput('');
  };

  return (
    <div>
      <h1>Instagram</h1>
      <form onSubmit={handlePost}>
        <input type="file" name="file" accept="image/*" />
        <button style={{ width: 500 }} type="submit">
          Post
        </button>
      </form>
      {posts.map((post) => (
        <div key={post.id}>
          <img
            style={{ height: 400, width: 500 }}
            src={post.image}
            alt="Post"
          />
          <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
          <button onClick={() => handleLikePost(post.id)}>
            Like ({post.likes})
          </button>
          <div>
            {post.comments.map((comment, index) => (
              <div key={index}>
                <p>{comment.text}</p>
                <button onClick={() => handleLikeComment(post.id, index)}>
                  Like ({comment.likes})
                </button>
                <button
                  onClick={() => handleDeleteComment(post.id, index)}
                  disabled={comment.likes > 0}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    const newText = prompt(
                      'Enter the updated comment:',
                      comment.text
                    );
                    if (newText) {
                      handleEditComment(post.id, index, newText);
                    }
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
            />
            <button onClick={() => handleComment(post.id)}>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Instagram;

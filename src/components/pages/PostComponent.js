// PostComponent.js
import React from 'react';
import Profiles from './Profiles';

const PostComponent = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {/* Pass the postId to the Profiles */}
      <Profiles postId={post.id} />
    </div>
  );
};

export default PostComponent;

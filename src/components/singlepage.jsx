import React from "react";  

const Singlepage = ({ post }) => {

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-white">{post.title}</h2>
            <p className="text-white">{post.content} yoooo</p>
            <p className="text-white">Created by: {post.userId}</p>
            <p className="text-white">Created at: {post.createdAt}</p>
        </div>
    );

}

export default Singlepage;
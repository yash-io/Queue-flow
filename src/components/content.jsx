import React,{useState} from 'react';
import CreatePost from './Create_post';
import PostsList from './posts';

const Content = () => {

  const [createpost, setCreatepost] = useState(false);
  const createPost = () => {
    setCreatepost(!createpost);
  }
  return (
    <div className='min-w-full min-h-screen flex justify-center bg-gradient-to-r from-black via-gray-800 to-black top-0 sticky'>
      <div className="sm:w-1/2 xss:w-full">
        <div className='border-2  sm:border-white xss:border-black p-10 rounded-md'>
          <button onClick={createPost} className='px-4 py-2 rounded-md bg-white'>
            {createpost ? 'Viewposts' : 'Create Post'}
          </button>
        {!createpost ? <PostsList />:<CreatePost/>}
          
        </div>
       
      </div>
    </div>
  );
};

export default Content;
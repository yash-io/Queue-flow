import React,{useState} from 'react';
import CreatePost from './Create_post';
import PostsList from './posts';

const Content = () => {

  const [createpost, setCreatepost] = useState(false);
  const createPost = () => {
    setCreatepost(!createpost);
  }
  return (
    <div className='w-full'>
      <div className="flex justify-center items-center bg-gradient-to-r from-black via-gray-800 to-black min-h-screen min-w-full pt-20">
        <div className='border-2 border-white p-10 rounded-md'>
          <button onClick={createPost} className='px-4 py-2 rounded-md bg-white'>
            {!createpost ? 'Viewposts' : 'Create Post'}
          </button>
        {createpost ? <PostsList />:<CreatePost/>}
          
        </div>
       
      </div>
    </div>
  );
};

export default Content;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../auth/firebase';
import CreatePost from '../posts/Create_post';
import PostsList from '../posts/posts';

const Home = ({ loggedin, setLoggedin, create }) => {
  const [createpost, setCreatepost] = useState(create);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate, setLoggedin]);

  return (
    <div>
      <div className="flex justify-center items-center bg-gray-900 min-h-screen w-full pt-20">
        {!loggedin && <h1 className="text-white">First do login.</h1>}
        {loggedin && (
          <div className="w-full flex justify-center bg-gray-900 top-0 sticky">
            {/* narrow width and expand on smaller screens */}
            <div className="md:w-2/3 xs:w-full w-full ">
              <div className=" w-full p-10 rounded-md">
                {!createpost ? (
                  <PostsList />
                ) : (
                  <CreatePost createpost={createpost} setCreatepost={setCreatepost} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import React,{useEffect,useState} from 'react'; 
import { useNavigate} from 'react-router-dom';
import { auth } from '../auth/firebase';
import CreatePost from '../posts/Create_post';
import PostsList from '../posts/posts';
const Home = ({ loggedin,setLoggedin,create }) => { 
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
        // Clean up the listener on component unmount
        return () => unsubscribe();
      }, [navigate, setLoggedin]);
         
    return (
        <div>
            <div className="flex justify-center items-center bg-gray-900 min-h-screen min-w-full pt-20 ">
                {!loggedin && <h1 className="text-white">First do login.</h1>}
                {loggedin &&   
                 <div className='min-w-full min-h-screen flex justify-center bg-gray-900 top-0 sticky'>
                    <div className="sm:w-1/2 xss:w-full">
                      <div className='border-2  sm:border-white xss:border-0 xss:border-black p-10 rounded-md'>
                        
                      {!createpost ? <PostsList />:<CreatePost createpost={createpost} setCreatepost={setCreatepost} />}     
                      </div>
                    
                    </div>
                  </div>}            
            </div>
        </div>
    );
 }


export default Home;
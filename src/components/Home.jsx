import React from 'react'; 
import Navbar from './Navbar';
import { useNavigate} from 'react-router-dom';
import { auth } from '../auth/firebase';
const Home = ({ loggedin,setLoggedin }) => { 
    const navigate = useNavigate();
    window.onload = function () {
        const user = auth.currentUser;
        if (user) {
            navigate('/home');
        }
        else {
            navigate('/login');
        }
    };
         
    return (
        <div>
            <Navbar loggedin={loggedin} setLoggedin={setLoggedin} />
            <div className="flex justify-center items-center bg-gradient-to-r from-black via-gray-800 to-black flex min-h-screen min-w-full pt-20 ">
                {!loggedin && <h1 className="text-white">First do login.</h1>}
                {loggedin && <h1 className='text-white'>Welcome to the Home page</h1>}
            </div>
        </div>
    );
 }


export default Home;
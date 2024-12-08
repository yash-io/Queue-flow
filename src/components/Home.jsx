import React from 'react'; 
import Content from './content';
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
            <div className="flex justify-center items-center bg-gradient-to-r from-black via-gray-800 to-black flex min-h-screen min-w-full pt-20 ">
                {!loggedin && <h1 className="text-white">First do login.</h1>}
                {loggedin &&    <Content/>}

             
            </div>
        </div>
    );
 }


export default Home;
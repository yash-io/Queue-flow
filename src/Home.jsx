import React from 'react'; 
import Navbar from './Navbar';

const Home = ({ loggedin,setLoggedin }) => {    
    return (
        <div>
            <Navbar loggedin={loggedin} setLoggedin={setLoggedin} />
            <div className="bg-gradient-to-r from-black via-gray-800 to-black flex min-h-screen min-w-full pt-16">
                {!loggedin && <h1 className="text-white">First do login</h1>}
                {loggedin && <h1 className='text-white'>Welcome to the Home page</h1>}
            </div>
        </div>
    );
}

export default Home;
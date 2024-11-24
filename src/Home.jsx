import React from 'react'; 
import Navbar from './Navbar';

const Home = ({loggedin,setLoggedin}) => {    

    return (
        <div >
            <div>
                <Navbar loggedin={loggedin} setLoggedin={setLoggedin} />
            </div>
            <div className='bg-gradient-to-r from-blue-500 to-purple-600 flex min-h-screen min-w-full pt-16'>
            {!loggedin && <h1 className="text-red-600"> first do login </h1>}
            {loggedin && <h1>Welcome to the Home page</h1>}
            </div>
            
        </div>
    )
}   

export default Home;
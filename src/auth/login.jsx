import React ,{useState,useEffect} from 'react'; 
import { useNavigate,Link} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import Navbar from '../Navbar';
const Login = ({loggedin,setLoggedin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const auth =getAuth();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setLoggedin(true);
            console.log("Logged in successfully");  

 // Save login state to session storage to prevent loss on refresh and long-term storage
            localStorage.setItem('loggedin', loggedin);
          navigate('/');
        } catch (error) {
          console.error("Error logging in:", error);
          alert("Invalid credentials");
        }

      };

    return (
        <div>
            <div>
                <Navbar ></Navbar>
            </div>
            <div className="flex justify-center items-center max-w-full bg-black min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
                <form onSubmit={handleLogin} className="p-8 m-10 border-2 rounded-md w-full xs:max-w-sm bg-gray-300">
                <h2 className="text-3xl font-medium mb-6 text-center">Login</h2>
                    <label htmlFor="username" className='block mb-2 font-medium text-gray-700'>
                        Enter UserId :
                    </label>
                    <input type="text" name="username" id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border-2 border-gray-300 rounded-md w-full " required/>
                    <label htmlFor="password " className='block mb-2 font-medium text-gray-700'>
                        Enter Password :   
                    </label>
                    <input type="password" name="password" id="password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-2 border-2 border-gray-300 rounded-md w-full" required/>
                    <button type='submit' className='px-2 py-4 w-full bg-blue-900 text-white rounded-md mb-4'>
                        Submit
                    </button>
                <Link to='/signup'>
                <h3 className='text-center font-bold text-blue-500'>Not a user. Click here to Sign-up</h3>
                </Link>
                        
                </form>
            </div>
        </div>
    )
}
export default Login;

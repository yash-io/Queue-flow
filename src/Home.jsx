

const Home = ({loggedin}) => {    
    return (
        <div>
            {!loggedin && <h1 className="text-red-600"> first do login </h1>}
            {loggedin && <h1>Welcome to the Home page</h1>}
        </div>
    )
}   

export default Home;
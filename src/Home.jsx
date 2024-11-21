

const Home = ({loggedin}) => {    
    return (
        <div>
            {!loggedin && <h1 className="text-red-600"> first do login </h1>}
            <h1>Home</h1>
        </div>
    )
}   

export default Home;
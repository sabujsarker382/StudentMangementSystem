import { Link } from "react-router-dom"; 

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-center">
          Student Management System
        </h1>
        <div>
          <Link to="/signin" className="ml-10 p-4">
            Signin
          </Link>{" "}
         
          <Link to="/signup">Signup</Link> 
        </div>
      </nav>
    </header>
  );
};

export default Header;

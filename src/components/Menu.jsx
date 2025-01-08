import { Link } from "react-router-dom";

const Menu = ({ user, onLogout }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user.name} logged in<button onClick={onLogout}>log out</button>
      </div>
    </div>
  );
};

export default Menu;

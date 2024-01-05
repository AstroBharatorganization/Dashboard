// style
import "./navbar.style.scss";
// Libraries
import { BsFillBellFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="guru.png" alt="" />
        <span>Astro Bharat</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="app.svg" alt="" className="icon" />
        <img src="expand.svg" alt="" className="icon" />
        <div className="notification">
          <BsFillBellFill />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
            className="icon"
          />
          <span>Anshul</span>
        </div>
        <AiFillSetting />
      </div>
    </div>
  );
};

export default Navbar;

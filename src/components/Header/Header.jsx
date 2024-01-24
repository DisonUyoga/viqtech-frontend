import React, { useRef, useEffect } from "react";
import "./header.css";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { totalQuantity } from "../../redux/slices/cartSlice";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import "./index.scss";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const nav__link = [
  {
    path: ".",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const total = useSelector(totalQuantity);
  const navigate = useNavigate();
  const profileActionsRef = useRef(null);
  const { currentUser } = useAuth();
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList?.add("sticky__header");
      } else {
        headerRef.current?.classList?.remove("sticky__header");
      }
    });
  };
  const whatsappInfo = {
    phoneNumber: "+254702122421",
    // chatMessage:"Hi, this is Comfort Furnitures how can I help",
    showPopup: true,
    accountName: "disonobudho233",
    placeholder: "Type a message...",
    // avatar:<img src={userIcon} width="40px" alt="userIcon"/>
  };
  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const navigateToCart = (nav) => {
    navigate(nav);
  };
  const toggleProfileActions = () =>
    profileActionsRef.current.classList.toggle("show__profileActions");

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("logged out");
        navigate(".");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo logo__animate">
              <img className="animate__image" src={logo} alt="logo" />
              <div>
                <h1 onClick={() => navigateToCart("/")}>Viq Tech Solutions</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li key={index} className="nav__item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              {/* function name does not bare literal meaning */}
              <span
                className="fav__icon"
                onClick={() => navigateToCart("/contact")}
              >
                <i className="ri-mail-send-fill"></i>
              </span>

              <span
                className="cart__icon"
                onClick={() => navigateToCart("/cart")}
              >
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{total}</span>
              </span>
              <Link to="https://www.instagram.com/viqtech_ke">
                <span className="cart__icon">
                  <i className="ri-instagram-line"></i>
                </span>
              </Link>
              <FloatingWhatsApp {...whatsappInfo} />
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser?.photoURL ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />

                <div
                  className="profile__actions"
                  ref={profileActionsRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div
                      className="d-flex align-items-center flex-column
             justify-content-center"
                    >
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

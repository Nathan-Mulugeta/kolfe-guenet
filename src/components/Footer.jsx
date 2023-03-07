import { FaTelegramPlane } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
  const footerYear = new Date().getFullYear();
  const handleNavLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer footer-center bg-gray-800 p-10 text-normal">
      <div className="grid grid-flow-col gap-4">
        <NavLink
          to="/"
          spy={true}
          smooth={true}
          duration={500}
          className="link-hover link"
          onClick={handleNavLinkClick}
        >
          Home
        </NavLink>
        <NavLink to="heaven-gate" className="link-hover link">
          Heaven's Gate
        </NavLink>
        <NavLink className="link-hover link">Jobs</NavLink>
        <NavLink className="link-hover link">Press kit</NavLink>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a className="cursor-pointer" href="/" rel="noreferrer">
            <FaTelegramPlane
              style={{
                width: "24",
                height: "24",
              }}
            />
          </a>
          <a
            className="cursor-pointer"
            href="https://www.youtube.com/@kgc223"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a
            className="cursor-pointer"
            href="https://www.facebook.com/kolfe.g.church?mibextid=ZbWKwL"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div>
        <p>
          Copyright © {footerYear} - All right reserved by Kolfe Guenet Church
        </p>
      </div>
    </footer>
  );
}

export default Footer;

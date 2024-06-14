import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
  return (
    <footer className='text-center text-lg-start text-muted mt-5'>
      <section>
        <div className='container'>
          <div className='row w-100'>
            <div className='col'>
              <FontAwesomeIcon icon={faFacebook} className='me-4' />
              <FontAwesomeIcon icon={faInstagram} className='me-4' />
              <FontAwesomeIcon icon={faYoutube} className='me-4' />
              <a href='#'>
                <p>Audio Description</p>
              </a>
              <a href='#'>
                <p>Investor Relations</p>
              </a>
              <a href='#'>
                <p>Legal Notes</p>
              </a>
              <a href='#'>
                <p>Advert Choices</p>
              </a>
              <span>© 1997-2024 Netflix, Inc.‎</span>
            </div>
            <div className='col'>
              <a href='#'>
                <p>Help Centre</p>
              </a>
              <a href='#'>
                <p>Jobs</p>
              </a>
              <a href='#'>
                <p>Cookie Preferences</p>
              </a>
            </div>
            <div className='col'>
              <a href='#'>
                <p>Gift Cards</p>
              </a>
              <a href='#'>
                <p>Terms of Use</p>
              </a>
              <a href='#'>
                <p>Corporate Information</p>
              </a>
            </div>
            <div className='col'>
              <a href='#'>
                <p>Media Centre</p>
              </a>
              <a href='#'>
                <p>Privacy</p>
              </a>
              <a href='#'>
                <p>Contact Us</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div
        className='text-center p-4'
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      ></div>
    </footer>
  );
};

export default Footer;

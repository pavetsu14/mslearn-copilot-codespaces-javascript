/**
 * Home component
 *
 * The section at the top of the page to display image of your
 * choice, name and title that describes your career focus.
 */

import React from "react";
import arrowSvg from "../images/down-arrow.svg";
import PropTypes from "prop-types";

/**
 * Home background image
 *
 * Below is a sample image. Upload the image of your choice into the "images"
 * directory and import here for use. Then, set imageAltText to string that 
 * represents what you see in that image.
 *
 *
 * Need an image? Check out https://unsplash.com to download a photo you
 * freely use on your site.
 */
import image from "../images/woman-with-tablet.jpg";

const imageAltText = "Adult female in office setting leaning against a glass wall while holding a platinum Microsoft Surface Pro 7 in tablet mode preparing to write with Microsoft Surface Pen";

const Home = ({ name, title }) => {
  return (
    <section id="home" className="min-height">
      <img className="background" src={image} alt="" />
      <div style={{ position: "absolute", top: "2rem", left: "2rem", width: "24rem" }}>
        <h1>{name}</h1>
        <h2>{title}</h2>

        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="prompt">Enter text to send to /generate</label>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <input id="prompt" name="prompt" placeholder="Type something" style={{ flex: 1 }} />
            <button id="sendBtn">Send</button>
          </div>
          <div id="result" style={{ marginTop: "0.75rem", padding: "0.5rem", background: "rgba(255,255,255,0.8)" }}>
            Result will appear here
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "3rem", left: "50%" }}>
        <img src={arrowSvg} style={{ height: "3rem", width: "3rem" }} alt={imageAltText} />
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const sendBtn = document.getElementById('sendBtn');
          const input = document.getElementById('prompt');
          const result = document.getElementById('result');

          async function send() {
            const text = input.value || '';
            const apiUrl = (window.location.protocol || 'http:') + '//' + window.location.hostname + ':3000/generate';
            try {
              const resp = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
              });
              const data = await resp.json();
              result.textContent = JSON.stringify(data, null, 2);
            } catch (err) {
              result.textContent = 'Error: ' + err.message;
            }
          }

          sendBtn.addEventListener('click', send);
          input.addEventListener('keydown', function(e){ if(e.key === 'Enter') send(); });
        })();
      ` }} />
    </section>
  );
};

Home.defaultProps = {
  name: "",
  title: "",
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Home;

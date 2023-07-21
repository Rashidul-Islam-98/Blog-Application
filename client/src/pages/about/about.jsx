import React from 'react';
import './about.css';
import myPic from "../../images/about.jpg";

function About() {
  return (
    <div className="about-me">
      <h1 className='about-heading'>About Me</h1>
      <img
        src={myPic}
        alt="Profile"
        className="profile-image"
      />
      <p>
        Hi, I'm John Doe! Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nulla ac lacus sed justo aliquet maximus. Sed sagittis
        sollicitudin arcu, vel tincidunt ipsum semper at. Duis suscipit
        vulputate dolor, non lobortis nisl iaculis a.
      </p>
      <p>
        I have a passion for web development and enjoy creating user-friendly
        and visually appealing websites. I specialize in front-end development
        using modern technologies like React, JavaScript, and CSS.
      </p>
      <p>
        When I'm not coding, you can find me exploring new hiking trails or
        reading a good book. Feel free to get in touch with me if you have any
        questions or would like to collaborate!
      </p>
    </div>
  );
}

export default About;

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { about } from "../../portfolio";
import "./About.css";
// import {useTypewriter , Curcor} from "react-simple-typewriter"
import { useTypewriter, Cursor } from "react-simple-typewriter";
import TypeWriterEffect from 'react-typewriter-effect';

const About = () => {
  const { photo, name, role, description, resume, social } = about;

  const {text}  = useTypewriter({
    words : ['Developer' , 'Designer','Photographer'],
    loop: {},
  });
  return (
    <div id="about" className="about center">
      {photo && <img height="200px" alt="Avatar placeholder" src={photo} />}
      {name && (
        <h1>
          Hi, I am <span className="about__name">{name}.</span> I am
          
        </h1>
      )}


{role && (
  <h2 className="about__role">
   <TypeWriterEffect
   className="about__name"
       
        startDelay={1000}
        cursorColor="#3F3D56"
        multiText={[
          
          'A Software Engineer',
          'A Problem Solver',
          'A Full Stack Developer',
        ]}
        multiTextDelay={1000}
        typeSpeed={50}
      />
  </h2>
)}

      <p className="about__desc">{description && description}</p>

      <div className="about__contact center">
        {resume && (
          <a download href={"Vishvendra-Tomar-resume.pdf"}>
            <span type="button" className="btn btn--outline">
              View Resume
            </span>
          </a>
        )}
        
          
        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label="github"
                className="link link--icon"
              >
                <GitHubIcon />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label="linkedin"
                className="link link--icon"
              >
                <LinkedInIcon />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default About;

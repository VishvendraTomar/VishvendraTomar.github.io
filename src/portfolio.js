import trendio from "./components/Access/trendio.png";
import medi from "./components/Access/medie.png";
import travel from "./components/Access/travel_tourism.png"
import profilepic from "./components/Access/profilepic.jpg"

const header = {
  homepage: "https://vishvendratomar.github.io/",
  title: "Vishvendra.",
};

const about = {
  photo: profilepic,
  name: "Vishvendra Tomar",
  role: "Full stack developer",
  description:
    "A Fullstack Web Developer, who builds Web Applications that leads to the success of the overall product.",
  resume:
    "https://drive.google.com/file/d/12Nbm4QYqRVgki63LtJ_jTswcTkjKckrX/view?usp=sharing",
  social: {
    linkedin: "https://www.linkedin.com/in/vishvendra-tomar/",
    github: "https://github.com/VishvendraTomar",
  },
};


const projects = [
  {
    name: "Trendio  ",
    description: `Trendio is a web application that offers a wide range of men and women's clothing and accessories. `,
    stack: ["React.js", "HTML","CSS","Chakra UI","Material UI Icons","Renderer"],
    sourceCode: "https://github.com/VishvendraTomar/handy-string-7765?tab=readme-ov-file",
    livePreview: "https://651c286aa4b175366a4b5e5d--lively-alpaca-0e97c3.netlify.app/",
    image: trendio
  },
  {
   name: 'MediPulse',
   description: `About
  MediPulse is a doctor consultation and appointment booking website.`,
   stack: ["react", "redux", "javascript", "css", "html", "json", "material-ui", "render", "chakra-ui"],
   sourceCode: 'https://github.com/mohdaamil120/MediPulse-Hospital',
   livePreview: 'https://vermillion-rabanadas-e9ac50.netlify.app/',
   image:medi
  },
  
  {
    name: 'Travel Tourism',
    description: `About
Travel tourism is designed to be user-friendly and easy to navigate and understand the details of the products available.`,
    stack: ["HTML","CSS","javascript","bootstrap"],
    sourceCode: 'https://github.com/VishvendraTomar/spiritual-school-8644',
    livePreview: 'https://spiritual-school-8644-travel-tour.netlify.app/',
    image:travel
   },
];

const skills = [
  {
    name: "HTML",
    imageUrl: "https://www.svgrepo.com/show/353884/html-5.svg",
  },
  {
    name: "CSS",
    imageUrl: "https://www.svgrepo.com/show/452185/css-3.svg",
  },
  {
    name: "JavaScript",
    imageUrl: "https://www.svgrepo.com/show/373705/js-official.svg",
  },
  {
    name: "TypeScript",
    imageUrl: "https://www.svgrepo.com/show/443502/brand-typescript.svg",
  },
  {
    name: "MongoDB",
    imageUrl: "https://www.svgrepo.com/show/331488/mongodb.svg",
  },
  {
    name: "Express",
    imageUrl: "https://www.svgrepo.com/show/330398/express.svg",
  },
  {
    name: "React",
    imageUrl: "https://www.svgrepo.com/show/452092/react.svg",
  },
  { name: "Redux", imageUrl: "https://www.svgrepo.com/show/452093/redux.svg" },
  {
    name: "Node Js",
    imageUrl: "https://www.svgrepo.com/show/354119/nodejs-icon.svg",
  },
  
  {
    name: "Git",
    imageUrl: "https://www.svgrepo.com/show/452210/git.svg",
  },
  {
    name: "postgresql",
    imageUrl: "https://www.svgrepo.com/show/439268/postgresql.svg",
  },
  {
    name: "Vercel",
    imageUrl: "https://www.svgrepo.com/show/327408/logo-vercel.svg",
  },
  {
    name: "Netlify",
    imageUrl: "https://www.svgrepo.com/show/376339/netlify.svg",
  },
];

const contact = {
  email: "vishvendratomar29@gmail.com",
};

export { header, about, projects, skills, contact };

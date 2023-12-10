import React from "react";
import GitHubCalendar from "react-github-calendar";
import "./Github.css";

const Github = () => {
  return (
    <div className="section github">
      <h2 className="section__title">My Github statistics</h2>
      <div>
        <img
          height="155em"
          src="https://github-readme-stats.vercel.app/api?username=VishvendraTomar&show_icons=true"
          alt="VishvendraTomar"
        />
        <img
          height="155em"
          src="https://github-readme-stats.vercel.app/api/top-langs?username=VishvendraTomar&show_icons=true"
          alt="VishvendraTomar"
        />
        <img
          height="155em"
          src="https://github-readme-streak-stats.herokuapp.com/?user=VishvendraTomar&"
          alt="VishvendraTomar"
        />
      </div>
      <GitHubCalendar className="calendar" username="VishvendraTomar" />
    </div>
  );
};

export default Github;

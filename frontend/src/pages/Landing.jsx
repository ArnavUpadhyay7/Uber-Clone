import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover h-screen pt-8 flex flex-col justify-between w-full">
        <img className="w-16 ml-5" src="https://www.edigitalagency.com.au/wp-content/uploads/Uber-logo-white-png-900x313.png" alt="Uber-logo" />
        <div className="py-4 pb-6 px-4">
          <h2 className="text-3xl text-white text-center font-semibold">Get Started with Uber </h2>
          <Link to="/login" className="inline-block text-center w-full text-xl bg-yellow-400 font-semibold text-black py-3 rounded-lg mt-4">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

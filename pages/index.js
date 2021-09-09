import React from "react";
import HomeIntro from "../src/components/homeIntro";
import HomeEvents from "../src/components/homeEvents";
import Header from "../src/components/header";
import Posts from "../src/components/posts";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <div>
      <Header color="#333" />
      <HomeIntro />
      <HomeEvents />
      <Posts />
    </div>
  );
};

export default Home;

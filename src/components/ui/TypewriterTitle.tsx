"use client";
import React from "react";
import Typewriter from "typewriter-effect";
import GraphemeSplitter from 'grapheme-splitter';

type Props = {};
const stringSplitter = (string:string)=> {
    const splitter = new GraphemeSplitter();
    return splitter.splitGraphemes(string);
  };
const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
        stringSplitter
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("🚀 Supercharged Productivity.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🤖 AI-Powered Insights.")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
import React from "react";

const greetings = {
  en: "Howdy",
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  it: "Ciao",
  hi: "नमस्ते",
  ja: "こんにちは",
  zh: "你好",
  ru: "Привет",
};

const Language = ({ name = "Guest", language = "en" }) => {
  const greeting = greetings[language] || greetings["en"];
  return (
    <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
      {greeting}, {name}
    </p>
  );
};

export default Language;

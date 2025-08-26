import React from "react";

const greetings = {
  en: "Howdy", // English
  es: "Hola", // Spanish
  fr: "Bonjour", // French
  de: "Hallo", // German
  it: "Ciao", // Italian
  hi: "Namaste", // Hindi (using romanized, more familiar to English speakers)
  ja: "こんにちは", // Japanese (still native script, very recognizable)
  zh: "Ni Hao", // Chinese (romanized greeting)
  ru: "Privet",
};

const Language = ({ name = "Guest" }) => {
  // Pick a random greeting from the greetings object
  const languages = Object.keys(greetings);
  const randomLang = languages[Math.floor(Math.random() * languages.length)];
  const greeting = greetings[randomLang];

  return (
    <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
      {greeting}, {name}
    </p>
  );
};

export default Language;

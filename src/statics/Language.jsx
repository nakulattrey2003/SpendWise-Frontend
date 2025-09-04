import React from "react";

const greetings = {
  en: ["Howdy", "Hey", "What's up?", "Yo", "Hiya", "Sup", "Heya", "Wassup"],
  es: ["Hola", "Qué tal", "Ey", "Buenas", "Qué onda"],
  fr: ["Bonjour", "Salut", "Coucou", "Yo"],
  de: ["Hallo", "Hey", "Na", "Was geht?"],
  it: ["Ciao", "Ehi", "Salve", "Bella lì"],
  hi: ["Namaste", "Hi", "Kya haal hai", "Yo bhai", "Kaise ho"],
  ja: ["こんにちは", "やあ", "おっす"],
  zh: ["Ni Hao", "Nǐ hǎo", "Hāi", "Zǎo ān"],
  ru: ["Privet", "Zdravstvuy", "Ey", "Kak dela?"],
};

const Language = ({ name = "Guest" }) => {
  // Pick a random language
  const languages = Object.keys(greetings);
  const randomLang = languages[Math.floor(Math.random() * languages.length)];

  // Pick a random greeting from that language
  const greetingsList = greetings[randomLang];
  const greeting =
    greetingsList[Math.floor(Math.random() * greetingsList.length)];

  return (
    <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
      {greeting}, {name}
    </p>
  );
};

export default Language;

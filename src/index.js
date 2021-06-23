import "./styles.css";

import mapper from "./mapper";

const textAreaEmoji = document.getElementById("emoji");
const textAreaText = document.getElementById("text");
const buttonT2E = document.getElementById("translateText");
const buttonE2T = document.getElementById("translateEmoji");

// Handle click button [Text to Emoji]
buttonT2E.addEventListener("click", () => {
  textAreaEmoji.value = "";
  const textAreaValue = textAreaText.value.toLowerCase();
  const result = textAreaValue
    .split("")
    .map((char) => mapper[char])
    .join("");

  textAreaEmoji.value = result;
});

// Handle click button [Emoji to Text]
buttonE2T.addEventListener("click", () => {
  textAreaText.value = "";
  const textAreaValue = textAreaEmoji.value;
  let value = textAreaValue;
  Object.values(mapper).forEach((emoji, index) => {
    const character = Object.keys(mapper)[index];
    value = value.replaceAll(emoji, character);
  });

  textAreaText.value = value;
});

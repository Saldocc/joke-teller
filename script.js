const audioElement = document.querySelector("#audio");
const button = document.querySelector("#button");
const laughAudio = document.querySelector("#laugh");

function toggleButton() {
  button.disabled = !button.disabled;
}

function laugh() {
  laughAudio.play();
}

//String to voice function
function tellMe(joke) {
  VoiceRSS.speech({
    key: "1b7af9e59d16487e9345f32e071a5e7a",
    src: joke,
    hl: "en-us",
    v: "John",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes From Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log("Error:", error);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", laugh);
laughAudio.addEventListener("ended", toggleButton);

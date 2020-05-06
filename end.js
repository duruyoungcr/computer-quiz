const finalScore = document.getElementById("finalScore");
const username = document.getElementById("username");
const form = document.getElementById("form");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
const message = document.getElementById("message");
const recentScore = JSON.parse(localStorage.getItem("recentScore"));

finalScore.innerText = recentScore || 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function saveHighscore() {
  const score = {
    name: username.value,
    score: recentScore,
  };
  if (score.name !== "") {
    highscores.push(score);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    form.reset();
    finalScore.classList.add("hidden");
    form.classList.add("hidden");
    message.classList.remove("hidden");
  }
}

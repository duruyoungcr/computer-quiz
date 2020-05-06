const highscoreList = document.getElementById("highscoreList");

if (!localStorage.getItem("highscores")) {
  highscoreList.innerHTML += `<h2>No high scores yet !</h2>`;
} else {
  const highscores = JSON.parse(
    localStorage.getItem("highscores")
  ).sort((a, b) => (b.score > a.score ? 1 : -1));
  highscores.forEach((score) => {
    highscoreList.innerHTML += `<h2>${score.name} - ${score.score}</h2>`;
  });
}

function reset() {
  localStorage.removeItem("highscores");
  highscoreList.innerHTML = `<h2>No high scores yet !</h2>`;
}

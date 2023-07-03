const timer = 40000; // 40sec
function handleReplay() {
  location.reload();
}

function createReplayButton() {
  const replayButton = document.createElement("button");
  replayButton.textContent = "もう一度見る";
  replayButton.onclick = handleReplay;

  const el = document.querySelector<HTMLButtonElement>("#replay-button");

  if (!el) {
    throw new Error("Can not find the element");
  }

  el.appendChild(replayButton);
}

setTimeout(createReplayButton, timer);

export {};

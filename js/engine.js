// Valkyr Tactical — game engine. No story content lives here, only logic.
(function () {
  "use strict";

  const SAVE_KEY = "valkyr_save";

  const DEFAULT_STATE = {
    currentScene: STORY.start,
    bondedWith: null,
    approach: null,
    sparedEnemy: null,
    trustedCaptain: null,
    wentRogue: false,
    morale: 0,
    kestrelAlive: true,
    vexAlive: true
  };

  let state = null;

  const els = {
    title: document.getElementById("title-screen"),
    game: document.getElementById("game-screen"),
    continueBtn: document.getElementById("btn-continue"),
    beginBtn: document.getElementById("btn-begin"),
    restartBtn: document.getElementById("btn-restart"),
    sceneImage: document.getElementById("scene-image"),
    sceneImageWrap: document.getElementById("scene-image-wrap"),
    sceneTitle: document.getElementById("scene-title"),
    sceneText: document.getElementById("scene-text"),
    choices: document.getElementById("choices"),
    endingBadge: document.getElementById("ending-badge")
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.currentScene) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage unavailable (e.g. private mode) — game still works, just won't persist
    }
  }

  function clearSave() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {}
  }

  function applyEffects(effects, s) {
    if (!effects) return;
    const resolved = typeof effects === "function" ? effects(s) : effects;
    Object.assign(s, resolved);
  }

  function resolveText(scene, s) {
    return typeof scene.text === "function" ? scene.text(s) : scene.text;
  }

  function setImage(scene) {
    if (!scene.image) {
      els.sceneImageWrap.classList.add("no-image");
      els.sceneImage.removeAttribute("src");
      return;
    }
    els.sceneImageWrap.classList.remove("no-image");
    els.sceneImage.onerror = function () {
      els.sceneImageWrap.classList.add("no-image");
      els.sceneImage.onerror = null;
      els.sceneImage.removeAttribute("src");
    };
    els.sceneImage.src = "images/" + scene.image;
  }

  function render() {
    const scene = STORY.scenes[state.currentScene];
    if (!scene) return;

    setImage(scene);
    els.sceneTitle.textContent = scene.title || "";
    els.sceneText.textContent = resolveText(scene, state);
    els.choices.innerHTML = "";

    if (scene.ending) {
      els.endingBadge.hidden = false;
      els.restartBtn.hidden = false;
    } else {
      els.endingBadge.hidden = true;
      els.restartBtn.hidden = true;
      scene.choices.forEach(function (choice) {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.type = "button";
        btn.textContent = choice.label;
        btn.addEventListener("click", function () {
          selectChoice(choice);
        });
        els.choices.appendChild(btn);
      });
    }
  }

  function selectChoice(choice) {
    applyEffects(choice.effects, state);
    goToScene(choice.next);
  }

  function goToScene(id) {
    state.currentScene = id;
    const scene = STORY.scenes[id];
    if (scene && scene.effects) {
      applyEffects(scene.effects, state);
    }
    saveState();
    render();
    window.scrollTo(0, 0);
    els.game.scrollTop = 0;
  }

  function newGame() {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    saveState();
    showGame();
    render();
  }

  function restart() {
    clearSave();
    newGame();
  }

  function showGame() {
    els.title.hidden = true;
    els.game.hidden = false;
  }

  function showTitle() {
    els.title.hidden = false;
    els.game.hidden = true;
  }

  function init() {
    const saved = loadState();
    if (saved) {
      els.continueBtn.hidden = false;
    }
    els.beginBtn.addEventListener("click", newGame);
    els.continueBtn.addEventListener("click", function () {
      state = saved;
      showGame();
      render();
    });
    els.restartBtn.addEventListener("click", restart);
    showTitle();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

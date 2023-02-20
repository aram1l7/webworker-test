// worker.js

importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");

let isPaused = false;
let state = null;

const api = {
  async doSomething(currentState) {
    state = currentState || { i: 0 };

    while (state.i < 10) {
      if (isPaused) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        console.log(state.i);
        state.i++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return "Done!";
  },

  async pause() {
    isPaused = true;
    return state;
  },

  async resume(newState) {
    isPaused = false;
    state = newState || state;
  },
};

Comlink.expose(api);

// main.js

const worker = new Worker("worker.js");
const workerApi = Comlink.wrap(worker);

let isPaused = false;
let state = null;

async function runWorker() {
  if (isPaused) {
    isPaused = false;
    await workerApi.resume(state);
  } else {
    // Call a function in the worker
    const result = await workerApi.doSomething(state);

    // Use the result
    console.log(result);
  }
}

function pauseWorker() {
  isPaused = true;
  workerApi.pause().then((newState) => {
    state = newState;
  });
}

document.getElementById("start-button").addEventListener("click", runWorker);
document.getElementById("pause-button").addEventListener("click", pauseWorker);
document.getElementById("resume-button").addEventListener("click", runWorker);

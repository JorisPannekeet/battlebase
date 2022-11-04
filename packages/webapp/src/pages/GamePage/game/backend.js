const apiUrl =
  "https://gamedata.betty.app/api/runtime/0c3b5088fa0147eda7d5eecd58348f7e";

/**
 * Saves a "game" object into a remote database.
 * @param {object} game
 * @returns {Promise}
 * @body [gamedata,nickname,wallet_address,score]
 */
export function postRun(game, nickname, wallet_address, score) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    operationName: null,
    query: "mutation {action(id: $id, input: $input)}",
    variables: {
      id: "81b7c25e133249c4b4783392812a8eaf",
      input: {
        gamedata: game,
        wallet_address: wallet_address,
        nickname: nickname,
        score: score,
      },
    },
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  return fetch(apiUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

/**
 * Fetches a list of runs from the remote database.
 * @returns {Promise<[]>} list of game runs
 */
export async function getRuns() {
  let data;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    operationName: null,
    query:
      "{\n  allRuns {\n    results {\n      id\n      nickname\n      gamedata\n      walletAddress\n      score\n    }\n  }\n}\n",
    variables: {},
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  fetch(apiUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      data = result;
    })
    .catch((error) => console.log("error", error));
  return data;
}

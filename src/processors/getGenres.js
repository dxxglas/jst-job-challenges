import request from "request";

export function getGenres(URI) {
  // authorization
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.REACT_APP_CLIENT_ID +
            ":" +
            process.env.REACT_APP_CLIENT_SECRET
        ).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/playlists/${URI}/tracks`,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };
      // get elements
      request.get(options, function (error, response, body) {
        console.log(body.items);
      });
    }
  });
}

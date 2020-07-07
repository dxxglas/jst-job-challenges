import request from "request";

export const accessSpotify = async (URI) => {
  var aux = [];

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

  await post1(URI, authOptions, aux);
  await post2(authOptions, aux);
};

async function post1(URI, authOptions, aux) {
  try {
    await request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var getPlaylist = {
          url: `https://api.spotify.com/v1/playlists/${URI}/tracks`,
          headers: {
            Authorization: "Bearer " + token,
          },
          json: true,
        };
        // get elements
        request.get(getPlaylist, function (error, response, body) {
          body.items.forEach((element, index, array) => {
            aux.push(element.track.album.id);
          });
        });
      }
    });
  } catch (err) {
    console.log("Erro:", err);
  }
}

async function post2(authOptions, aux) {
  try {
    await request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        var token = body.access_token;
        // get elements
        console.log(aux);
        var auxAlbuns = aux.join("%");
        var getGenreAlbum = {
          url: `https://api.spotify.com/v1/albums?ids=${auxAlbuns}`,
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          json: true,
        };

        request.get(getGenreAlbum, function (error, response, body) {
          console.log(response);
        });
      }
    });
  } catch (err) {
    console.log("Erro:", err);
  }
}

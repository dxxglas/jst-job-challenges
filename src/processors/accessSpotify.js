import axios from "axios";
import qs from "qs";

export var accessSpotify = async (URI) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  var dataTrack;
  var dataArtists = [];
  var idArtists = [];
  var genres = [];
  var playlistName;

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: "client_credentials",
  };

  try {
    await axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        headers
      )
      .then(async function (resPost) {
        const resGetTrack = await axios({
          method: "GET",
          url: `https://api.spotify.com/v1/playlists/${URI}/tracks`,
          headers: {
            Authorization: "Bearer " + resPost.data.access_token,
          },
          json: true,
        });
        dataTrack = resGetTrack;
      });
  } catch (error) {
    console.log(error);
  }

  dataTrack.data.items.forEach((element, index, array) => {
    dataArtists.push(element.track.artists);
  });

  for (var i = 0; i < dataArtists.length; i++) {
    for (var b = 0; b < dataArtists[i].length; b++) {
      idArtists.push(dataArtists[i][b].id);
    }
  }

  for (var a = 0; a < idArtists.length; a++) {
    var idArtist = idArtists[a];
    try {
      await axios
        .post(
          "https://accounts.spotify.com/api/token",
          qs.stringify(data),
          headers
        )
        .then(async function (resPostSec) {
          if (idArtist !== undefined) {
            const resGetArtist = await axios({
              method: "GET",
              url: `https://api.spotify.com/v1/artists/${idArtist}`,
              headers: {
                Authorization: "Bearer " + resPostSec.data.access_token,
              },
              json: true,
            });
            var genreArtist = resGetArtist.data.genres;
            if (genreArtist.length > 0) {
              genreArtist.forEach((element) => {
                genres.push(element);
              });
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  function group(arr) {
    var p = {};
    arr.forEach(function (x) {
      p[x] = (p[x] || 0) + 1;
    });
    return Object.keys(p).map(function (x) {
      return {
        genre: x,
        count: p[x],
      };
    });
  }

  try {
    await axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        headers
      )
      .then(async function (resPostThird) {
        const resGetPlay = await axios({
          method: "GET",
          url: `https://api.spotify.com/v1/playlists/${URI}`,
          headers: {
            Authorization: "Bearer " + resPostThird.data.access_token,
          },
          json: true,
        });
        playlistName = resGetPlay.data.name;
      });
  } catch (error) {
    console.log(error);
  }

  return [group(genres), playlistName];
};

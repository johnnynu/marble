import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";

import SpotifyGetTopSongs from "./Components/SpotifyGetTopSongs";

/* https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09 */

const CLIENT_ID = "d9ec563b15fb4063af945d494b5c8efc";
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI_AFTER_LOGIN = "http://localhost:3000";

const SPACE_DELIMITER = "%20";
const SCOPES = ["user-top-read"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getTokenFromSpotifyAuth = (hash) => {
	const stringAfterHash = hash.substring(1);
	const paramsInUrl = stringAfterHash.split("&");
	const paramsSeperate = paramsInUrl.reduce((acc, cur) => {
		console.log(cur);
		const [key, value] = cur.split("=");
		acc[key] = value;
		return acc;
	}, {});

	return paramsSeperate;
};

function App() {
	useEffect(() => {
		if (window.location.hash) {
			const { access_token, expires_in, token_type } = getTokenFromSpotifyAuth(
				window.location.hash
			);
			localStorage.clear();
			localStorage.setItem("accessToken", access_token);
			localStorage.setItem("tokenType", token_type);
			localStorage.setItem("expiresIn", expires_in);
		}
	}, []);

	const handleLogin = () => {
		window.location = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
	};
	return (
		<div>
			<Button onClick={handleLogin} colorScheme="whatsapp" ms="50%">
				Log in to Spotify
			</Button>
			<SpotifyGetTopSongs />
		</div>
	);
}

export default App;

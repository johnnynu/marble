import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

import SpotifyGetTopSongs from "./Components/SpotifyGetTopSongs";
import Hero from "./Components/Hero";
import Features from "./Components/Features";

/* https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09 */

const CLIENT_ID = "d9ec563b15fb4063af945d494b5c8efc";
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI_AFTER_LOGIN = "http://localhost:3000";

const SPACE_DELIMITER = "%20";
const SCOPES = ["user-top-read"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

function App() {
	const [authSuccess, setAuthSuccess] = useState(false);

	useEffect(() => {
		if (window.location.hash) {
			setAuthSuccess(true);
		}
	}, [authSuccess]);

	const handleLogin = () => {
		window.location = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
	};
	return (
		<div>
			<>
				{authSuccess ? (
					<SpotifyGetTopSongs />
				) : (
					<>
						<Hero />
						<Features />
					</>
				)}
			</>
		</div>
	);
}

export default App;

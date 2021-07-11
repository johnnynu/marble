import React, { useState, useEffect } from "react";
import axios from "axios";

import {
	Button,
	OrderedList,
	ListItem,
	Box,
	Image,
	Stack,
} from "@chakra-ui/react";

const TOP_SONGS_ENDPOINT =
	"https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10";

const SpotifyGetTop = () => {
	const [token, setToken] = useState("");
	const [data, setData] = useState({});

	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			setToken(localStorage.getItem("accessToken"));
		}
	}, []);

	const handleGetTopSongs = () => {
		axios
			.get(TOP_SONGS_ENDPOINT, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Button colorScheme="whatsapp" ms="10%" onClick={handleGetTopSongs}>
				Get Top Songs
			</Button>
			<Stack direction="column" ms="10%" spacing={1}>
				{data?.items
					? data.items.map((item, idx) => (
							<Box p={4} key={idx}>
								{`${idx + 1}. ${item.name}`}
								<Image
									boxSize="200px"
									src={item.album.images[1].url}
									objectFit="cover"
								/>
							</Box>
					  ))
					: null}
			</Stack>
		</>
	);
};

export default SpotifyGetTop;

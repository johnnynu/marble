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

const SpotifyGetTopSongs = () => {
	const [token, setToken] = useState("");
	const [data, setData] = useState({});
	const [time, setTime] = useState("medium");

	let TOP_SONGS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=${time}_term&limit=10`;

	const hashparam = window.location.hash
		.substring(1)
		.split("&")
		.reduce(function (initial, item) {
			if (item) {
				var parts = item.split("=");
				initial[parts[0]] = decodeURIComponent(parts[1]);
			}
			return initial;
		}, {});

	const getTopSongs = async (token) => {
		const settings = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};
		const response = await fetch(TOP_SONGS_ENDPOINT, settings);
		const data = await response.json();
		return data;
	};

	const handleAllTimeSongs = () => {
		setTime("long");
	};

	const handleCurrentSongs = () => {
		setTime("short");
	};

	const handle6MonthsSonga = () => {
		setTime("medium");
	};

	/*const handleGetTopSongs = () => {
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
	};*/

	/*useEffect(() => {
		/*if (localStorage.getItem("accessToken")) {
			setToken(localStorage.getItem("accessToken"));
		}
		setToken(accessToken);
	}, []);*/

	useEffect(() => {
		setToken(hashparam.access_token);
	}, []);

	useEffect(() => {
		async function fetchData() {
			const newData = await getTopSongs(token);
			setData(newData);
		}
		fetchData();
	}, [token, time]);

	/*useEffect(async () => {
		const newData = await getTopSongs(token);
		setData(newData);
	}, [time]);*/

	return (
		<>
			<Button colorScheme="whatsapp" ms="10%" onClick={handleAllTimeSongs}>
				Get Top Songs of All Time
			</Button>
			<Button colorScheme="whatsapp" ms="15%" onClick={handleCurrentSongs}>
				Get Current Top Songs
			</Button>
			<Button colorScheme="whatsapp" ms="20%" onClick={handle6MonthsSonga}>
				Get Top Songs from 6 Months Ago
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

export default SpotifyGetTopSongs;

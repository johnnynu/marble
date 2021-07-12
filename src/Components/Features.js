import { Box, SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { Feature } from "./Feature";
import { BsMusicNoteList, BsPeopleFill } from "react-icons/bs";
import { GiExtraTime } from "react-icons/gi";

const Features = () => (
	<Box
		as="section"
		maxW="5xl"
		mx="auto"
		py="12"
		px={{
			base: "6",
			md: "8",
		}}
	>
		<SimpleGrid
			columns={{
				base: 1,
				md: 3,
			}}
			spacingX="10"
			spacingY={{
				base: "8",
				md: "14",
			}}
		>
			<Feature
				title="View your top artists and songs"
				icon={<BsMusicNoteList />}
			>
				See who your top 10 artists and songs are!
			</Feature>
			<Feature title="Choose a time period" icon={<GiExtraTime />}>
				Choose from different time intervals to see your top 10 songs and
				artists from now to the past!
			</Feature>
			<Feature title="Share with your friends" icon={<BsPeopleFill />}>
				Show your friends your top 10 list!
			</Feature>
		</SimpleGrid>
	</Box>
);

export default Features;

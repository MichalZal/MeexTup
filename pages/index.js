import { MongoClient } from "mongodb";
import React, { useState } from "react";
import Head from 'next/head'

import MeetupList from "../components/meetups/MeetupList";


const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>Meextup </title>
				<meta name="description" content='meetup website created with nextjs' />
				<meta name="keywords" content="nextjs meetups"/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

export const getStaticProps = async () => {
	const client = await MongoClient.connect(
		"mongodb+srv://Miszka:123@cluster0.clrcle8.mongodb.net/?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find().toArray();

	client.close();
	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
};

export default HomePage;

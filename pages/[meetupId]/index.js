import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head'

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupId = (props) => {
	return (
		<Fragment>
			<Head>
				<title>Meextup</title>
				<meta name="description" content={props.meetupData.description} />
				<link rel="icon" type="image/x-icon" href={props.meetupData.image} />
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				id={props.meetupData.id}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</Fragment>
	);
};

export const getStaticPaths = async () => {
	const client = await MongoClient.connect(
		"mongodb+srv://Miszka:123@cluster0.clrcle8.mongodb.net/?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	return {
		fallback: true,
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
};

export const getStaticProps = async (context) => {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		"mongodb+srv://Miszka:123@cluster0.clrcle8.mongodb.net/?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupsCollection = db.collection("meetups");

	const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description
			},
		},
	};
};

export default MeetupId;

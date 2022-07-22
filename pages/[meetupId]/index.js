import React, { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head'

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupId = (props) => {
	return (
		<Fragment>
			<Head>
				<title>Meextup</title>
				<meta name="description" content={props.meetupData.description ? props.meetupData.description : ""} />
				<link rel="icon" type="image/x-icon" href={props.meetupData.image ? props.meetupData.image : ''} />
			</Head>
			<MeetupDetail
				image={props.meetupData.image ? props.meetupData.image : 'image'}
				id={props.meetupData.id ? props.meetupData.id : 'id'}
				title={props.meetupData.title ? props.meetupData.title : 'title'}
				address={props.meetupData.address ? props.meetupData.address : 'addres	'}
				description={props.meetupData.description ? props.meetupData.description : 'description'}
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
				title: selectedMeetup.title ? selectedMeetup.title : 'title',
				address: selectedMeetup.addres ? selectedMeetup.address : 'address',
				image: selectedMeetup.image ? selectedMeetup.image : 'image',
				description: selectedMeetup.description ? selectedMeetup.description : 'description'
			},
		},
	};
};

export default MeetupId;

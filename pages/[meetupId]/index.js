import MeetupDetail from "../../components/meetups/meetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetuData.title}</title>
        <meta name="description" content={props.meetuData.description} />
      </Head>
      <MeetupDetail
        title={props.meetuData.title}
        image={props.meetuData.image}
        address={props.meetuData.address}
        description={props.meetuData.description}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://aman:tRIorAzsa3kKIB61@cluster0.8254iar.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meeupsCollection = db.collection("meetups");
  const meetups = await meeupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://aman:tRIorAzsa3kKIB61@cluster0.8254iar.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meeupsCollection = db.collection("meetups");
  const selectedMeetup = await meeupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetuData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;

//our-domain/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
function NewMeetUpPage() {
  const router = useRouter();
  async function addmeetupHandler(enterdMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enterdMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add New React Meetups</title>
        <meta
          name="description"
          content="add your own meetup and create amazing networking oppotunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addmeetupHandler} />
    </Fragment>
  );
}
export default NewMeetUpPage;

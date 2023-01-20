import Head from "next/head";
import Footer from "../src/foooter/Footer";
import Introduction_component from "../src/introduction_component/Introduction_component";
import Registration_component from "../src/registration_component/Registration_component";

export default function Home() {
  const text = {
    title: `Learn to code by watching others`,
    description: `See how experienced developers solve problems in real-time. Watching
  scripted tutorials is great, but understanding how developers think
  is invaluable.`,
    trialDay: 7,
    subCost: 20,
  };

  return (
    <>
      <Head>
        <title>Frontend Mentor | Intro component with sign up form</title>
        <meta
          name="description"
          content="Intro component with sign up form create next app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./images/favicon-32x32.png"
        />
      </Head>
      <main>
        <Introduction_component
          title={text.title}
          description={text.description}
        />
        <Registration_component
          trialDay={text.trialDay}
          subCost={text.subCost}
        />
      </main>
      <Footer />
    </>
  );
}

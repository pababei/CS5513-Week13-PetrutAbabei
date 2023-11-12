// Next.js will always look for index file
import Link from "next/link";
import Layout from "../components/layout";
import { getSortedContactList, getSortedList } from "../lib/data";

// define getStaticProps()
export async function getStaticProps() {
  const allData = await getSortedList();
  const allContactData = await getSortedContactList();
  return {
    props: { allData, allContactData },
  };
}

export default function Home({ allData, allContactData }) {
  return (
    <Layout>
      <h1>Wordpress Headless App Demo</h1>
      <section>
        <h2>Posts</h2>
        <div className="list-group">
          {allData.map(({ id, title }) => (
            <Link
              key={id}
              href={`/posts/${id}`}
              className="list-group-item list-group-item-action"
            >
              {title}
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2>Contacts</h2>
        <div className="list-group">
          {allContactData.map(({ id, title }) => (
            <Link
              key={id}
              href={`/contacts/${id}`}
              className="list-group-item list-group-item-action"
            >
              {title}
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

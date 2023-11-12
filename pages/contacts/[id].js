import Layout from "../../components/layout";
import { getContactIds, getContactData } from "../../lib/data";

export async function getStaticProps({ params }) {
  const itemData = await getContactData(params.id);
  return {
    props: {
      itemData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getContactIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Entry({ itemData }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title">{itemData.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            First Name: {itemData.contact_data.first_name}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Last Name: {itemData.contact_data.last_name}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Email: {itemData.contact_data.email}
          </h6>
        </div>
      </article>
    </Layout>
  );
}

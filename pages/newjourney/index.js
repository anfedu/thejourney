import dynamic from "next/dynamic";
import Layout from "../../components/layout";

const NewJourney = dynamic(() => import("../../components/newjourney"), {
  ssr: false,
});

export default function () {
  return (
    <Layout>
      <NewJourney />
    </Layout>
  );
}

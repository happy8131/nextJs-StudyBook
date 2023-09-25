import { Layout } from "../components/layout";
import axios from "axios";
import StudyItem from "../components/studys/studyItem";

const Projects = ({ studys }: any) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-5 mb-10 px-6">
        <h1 className="text-4xl font-bold sm:text-6xl">
          개발자 스터디 : {studys?.results.length}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 py-10 m-6 gap-8">
          {studys.results.map((item: any) => (
            <StudyItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const options = {
    method: "POST",
    url: `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NOTION_SECRETS}`,
    },
    data: { page_size: 100 },
  };
  let studys;
  await axios
    .request(options)
    .then(function (response) {
      const resData = response.data;
      // const studyId = resData.results.map((item) => item.id);

      studys = resData;
    })
    .catch(function (error) {
      console.error(error);
    });

  return {
    props: { studys },
  };
};

export default Projects;

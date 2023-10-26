import { Layout } from "../components/layout";
import axios from "axios";
import StudyItem from "../components/studys/studyItem";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TfiArrowCircleUp } from "react-icons/tfi";

const lodash = require("lodash");

const Projects = ({ studys }: any) => {
  const [studyData, setStudyData] = useState(studys.results.slice(0, 10));
  const [page, setPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const len = studys.results.length - page;

    const handleScroll = async () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 90
      ) {
        if (len > 0) {
          setLoading(true);
          const copy = lodash.cloneDeep(studys.results);
          setStudyData(studyData.concat(copy.slice(page, page + 10)));
          setPage(page + 10);
          setLoading(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const MoveToTop = () => {
    // top:0 >> 맨위로  behavior:smooth 부드럽게 이동할수 있게 설정하는 속성
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-5 mb-10 px-6">
        <h1 className="text-4xl font-bold sm:text-6xl">
          개발자 스터디 : {studyData.length}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 py-10 m-6 gap-8">
          {studyData.map((item: any) => (
            <StudyItem key={item.id} data={item} />
          ))}
        </div>
        {loading && (
          <div className="h-full flex justify-center text-xl font-bold">
            <AiOutlineLoading3Quarters
              className="rounded-t-lg mt-9 ml-3 animate-spin"
              size={30}
            />
          </div>
        )}
        {!loading && (
          <div className="h-full flex justify-center text-lg font-normal">
            <TfiArrowCircleUp
              onClick={MoveToTop}
              className="cursor-pointer transform transition duration-500 hover:scale-125 hover:shadow-xl shadow-xl"
              size="30"
            />
          </div>
        )}
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

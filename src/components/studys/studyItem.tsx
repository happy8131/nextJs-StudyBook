import Image from "next/image";
import Link from "next/link";

const StudyItem = ({ data }: any) => {
  const studyTitle = data.properties?.name.title[0].plain_text;
  const blogLink = data.properties.blog.rich_text[0].plain_text;
  const description = data.properties.description.rich_text[0].plain_text;
  const tag = data.properties?.tag.multi_select;
  const imgSrc = data.cover.file.url || data.cover.external.url;
  const detail = data.public_url;

  return (
    <div className="project-card">
      <Image
        className="rounded-xl"
        src={imgSrc}
        alt="cover image"
        width="100%"
        height="60%"
        layout="responsive"
        objectFit="cover"
        quality={100}
      />
      <div className="p-4 flex flex-col ">
        <h1 className="text-2xl font-bold">{studyTitle}</h1>
        <h3 className="mt-4 text-xl">{description?.slice(0, 20)}...</h3>
        <a href={detail} target="_blank">
          설명 자세히
        </a>
        <a href={blogLink} target="_blank">
          참고 블로그
        </a>
        <div className="flex items-start mt-2">
          {tag.map((item: any, idx: number) => (
            <h1 key={idx} className="px-2 py-1 mr-2 rounded-md bg-sky-200 w-30">
              {item.name}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyItem;

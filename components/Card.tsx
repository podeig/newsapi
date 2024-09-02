import { format } from "date-fns";
import Link from "next/link";

type Props = {
  article: Article;
  className: string;
};

export default function Card({ article, className }: Props) {
  return (
    <Link
      href={article.url}
      scroll={false}
      className="lg:w-1/3 w-full relative bg-transparent top-0 hover:bg-yellow-50 hover:-top-[15px] transition-all duration-200 bg-opacity-50 hover:scale-103 cursor-pointer"
      target="_black"
      type="button"
    >
      <div className={`${className}`}>
        <div className="flex flex-col h-full">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              width={400}
              className="mx-auto image-old oldImage border-[20px] border-white"
            />
          )}
          <time className="px-2 text-sm mt-4 font-bold">
            {format(article.publishedAt, "dd.MM.yyyy HH:MM")}
          </time>
          <h2 className="lg:text-xl p-2 font-semibold">{article.title}</h2>
        </div>
      </div>
    </Link>
  );
}

"use client";

import Card from "@/components/Card";
import { Button, Spinner } from "@radix-ui/themes";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type Article = {
  source: {
    id: number;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [noMoreArticles, setNoMoreArticles] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const fetchArticles = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api?page=${page}`);
      if (response) {
        setLoading(false);
        const data = await response.json();
        if (data.articles.length === 0) {
          setNoMoreArticles(true);
        }
        setArticles([...articles, ...data.articles]);
      }
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const onNavigate = (url: string) => {
    console.log("URL:", url);
  };

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!loading && !articles.length) {
    return <div>Ingen artikkler funnet</div>;
  }

  return (
    <div className="flex gap-0 flex-row flex-wrap w-full py-4">
      {articles?.map((article: Article, key: number) => (
        <Card
          key={key}
          className="lg:w-1/3 w-full border-l border-gray-200 p-6"
        >
          <div
            className="flex flex-col h-full"
            onClick={() => onNavigate(article.url)}
          >
            {article.urlToImage && (
              // eslint-disable-next-line @next/next/no-img-element
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
        </Card>
      ))}
      <div className="flex justify-center p-10 w-full">
        {articles.length === 0 ? (
          <Spinner size="3" />
        ) : noMoreArticles ? (
          <div className="font-bold">No more articles to load</div>
        ) : (
          <Button
            onClick={() => setPage(page + 1)}
            variant="soft"
            size="4"
            style={{ cursor: "pointer" }}
          >
            {loading && <Spinner />}
            More articles
          </Button>
        )}
      </div>
    </div>
  );
}

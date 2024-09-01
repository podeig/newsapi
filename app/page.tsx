"use client";

import Card from "@/components/Card";
import Image from "next/image";
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
  const [error, setError] = useState<string>();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api");
      if (response) {
        setLoading(false);
        const data = await response.json();
        setArticles(data.articles);
      }
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!articles.length) {
    return <div>Ingen artikkler funnet</div>;
  }

  // let posts = await data.json();
  return (
    <div className="flex gap-0 flex-row flex-wrap w-full py-4">
      {articles?.map((article: Article, key: number) => (
        <Card key={key} className="w-1/3 border-l border-gray-200 p-6">
          <div className="flex flex-col h-full">
            {article.urlToImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.urlToImage}
                alt={article.title}
                width={400}
                className="mx-auto image-old oldImage border-[20px] border-white"
              />
            )}
            <h2 className="text-xl p-2">{article.title}</h2>
          </div>
        </Card>
      ))}
    </div>
  );
}

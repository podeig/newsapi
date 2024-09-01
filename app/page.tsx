"use client";

import { useEffect, useState } from "react";

type Article = {
  source: {
    id: number;
    name: string;
  };
  title: string;
  content: string;
  author: string;
  date: Date;
  category: string;
};

export default function Page() {
  // let data = await fetch(
  //   "https://newsapi.org/v2/everything?q=apple&from=2024-08-31&to=2024-08-31&pageSize=5&sortBy=publishedAt&apiKey=d212c0de8e27483991f2c8c533d8f39d"
  // );
  // let posts = await data.json();
  // console.log("posts->", posts.articles);
  // let data = await fetch("http://localhost:3000/api/");
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>();

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api");
      if (response) {
        const data = await response.json();
        setArticles(data.articles);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!articles?.length) {
    return <div>Loading...</div>;
  }
  // let posts = await data.json();
  return (
    <ul>
      {articles?.map((article: Article, key: number) => (
        <li key={key}>
          {key + 1}. {article.title}
        </li>
      ))}
    </ul>
  );
}

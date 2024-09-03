"use client";

import Article from "@/components/Article";
import { Button, Spinner } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Search from "@/components/Search";
import { PAGE_SIZE } from "@/utils/config";
import SelectDomain from "@/components/SelectDomain";

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [noMoreArticles, setNoMoreArticles] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const timer = useRef<any>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputQuery, setInputQuery] = useState<string>("");
  const [domain, setDomain] = useState<string>("techcrunch.com");

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api?page=${page}&query=${searchQuery}&domain=${domain}`
      );
      if (response) {
        setLoading(false);
        const data = await response.json();
        if (!data.articles || data.articles?.length < PAGE_SIZE) {
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
    fetchArticles();
  }, [page, searchQuery, domain]);

  const resetPage = () => {
    setArticles([]);
    setPage(1);
    setNoMoreArticles(false);
  };

  const onChangeSearch = (query: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      resetPage();
      setSearchQuery(query);
    }, 500);
    setInputQuery(query);
  };

  const onChangeDomain = (domain: string) => {
    setDomain(domain);
    resetPage();
  };

  return (
    <>
      <div className="p-5 lg:p-6 flex flex-col w-full sticky top-0 bg-white bg-opacity-95 z-50">
        <Image
          src="/images/logo-newsapi.svg"
          alt="Logo NewsAPI"
          width={180}
          height={100}
          className="border-2 mx-auto rounded-lg w-[100px] lg:w-[180px]"
        />
        <div className="flex justify-center mt-4">
          <Search
            query={inputQuery}
            onChange={(query) => onChangeSearch(query)}
            className="mr-1"
          />
          <SelectDomain
            domain={domain}
            onChange={(selectedDomain: string) =>
              onChangeDomain(selectedDomain)
            }
          />
        </div>
      </div>
      <div className="flex gap-0 flex-row flex-wrap w-full py-4">
        {articles?.map((article: Article) => (
          <Article
            article={article}
            key={article.url}
            className="border-gray-200 p-6"
          />
        ))}
        <div className="flex justify-center p-10 w-full">
          {loading && <Spinner size="3" />}

          {!loading && !articles.length && <div>🤷‍♂️ No articles found</div>}

          {!loading && !noMoreArticles && (
            <Button
              onClick={() => setPage(page + 1)}
              variant="soft"
              size="4"
              style={{ cursor: "pointer" }}
            >
              More articles
            </Button>
          )}

          {error && (
            <div className="text-red-300 p-10">An error occurred: {error}</div>
          )}
        </div>
      </div>
    </>
  );
}

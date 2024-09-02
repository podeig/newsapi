"use client";

import Card from "@/components/Card";
import { Button, Select, ChevronDownIcon, Spinner } from "@radix-ui/themes";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Search from "@/components/Search";
import { PAGE_SIZE } from "@/utils/config";

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

  const fetchArticles = async (
    page: number,
    searchQuery: string,
    domain: string
  ) => {
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
    fetchArticles(page, searchQuery, domain);
  }, [page, searchQuery, domain]);

  const onNavigate = (url: string) => {
    console.log("URL:", url);
  };

  if (error) {
    return <div>{error.toString()}</div>;
  }

  const resetSearch = () => {
    setArticles([]);
    setPage(1);
    setNoMoreArticles(false);
  };

  const onChange = (query: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      resetSearch();
      setSearchQuery(query);
    }, 500);
    setInputQuery(query);
  };

  const onChangeDomain = (domain: string) => {
    setDomain(domain);
    resetSearch();
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
            onChange={(query) => onChange(query)}
            className="mr-1"
          />
          <Select.Root
            value={domain}
            onValueChange={(selectedDomain) => onChangeDomain(selectedDomain)}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Web sites</Select.Label>
                <Select.Item value="techcrunch.com">techcrunch.com</Select.Item>
                <Select.Item value="nbcnews.com">nbcnews.com</Select.Item>
                <Select.Item value="bbc.co.uk">bbc.co.uk</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
      <div className="flex gap-0 flex-row flex-wrap w-full py-4">
        {articles?.map((article: Article, key: number) => (
          <Link
            key={key}
            href={article.url}
            scroll={false}
            className="lg:w-1/3 w-full relative bg-transparent top-0 hover:bg-yellow-50 hover:-top-[15px] transition-all duration-200 bg-opacity-50 hover:scale-103 cursor-pointer"
            target="_black"
            type="button"
          >
            <Card className=" border-gray-200 p-6">
              <div
                className="flex flex-col h-full"
                onClick={() => onNavigate(article.url)}
              >
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
                <h2 className="lg:text-xl p-2 font-semibold">
                  {article.title}
                </h2>
              </div>
            </Card>
          </Link>
        ))}
        <div className="flex justify-center p-10 w-full">
          {!loading && !articles.length && <div>Ingen artikkler funnet</div>}
          {loading && <Spinner size="3" />}
          {!loading && !noMoreArticles && (
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
    </>
  );
}

import Image from "next/image";
import React, { useEffect, useContext } from "react";
import Layout from "@/components/Layout";
import CategoryLabel from "@/components/CategoryLabel";
import PreviousPage from "@/components/PreviousPage";
import { DisplayedContext } from "@/context/DisplayedContext";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import Head from "next/head";

export default function PostPage({ post }) {
  const router = useRouter();

  const { setMenuCategories, setAside } = useContext(DisplayedContext);
  useEffect(() => {
    setMenuCategories(false);
    setAside(false);
  });

  return (
    <Layout>
      <div className="w-full px-6 py-0 bg-white lg:mt-6 sm:py-1 md:py-2 lg:py-4">
        <Head>
          <title>{post.title}</title>
          <meta
            name="description"
            content={`The purpose of the post is to look at important issues and intellectual thoughts related to them in the category of ${post.category} explored by ${post.author}}`}
          ></meta>
        </Head>
        <div className="flex items-center justify-between mt-4 ">
          <h1 className="mb-4 text-3xl font-extrabold sm:text-5xl lg:text-6xl lg:mb-7">
            {post.title}
          </h1>
        </div>

        <div className="flex lg:my-0 ">
          Inspired by&nbsp;<span className="font-bold">{post.author}</span>
        </div>
        <div className="relative flex mb-2 lg:mb-6">
          <PreviousPage />
          <span className="mr-1 text-gray-400">
            {new Date(post.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </span>
          <CategoryLabel>{post.category}</CategoryLabel>
        </div>

        {post.image && (
          <div className="">
            <Image
              alt={post.alt}
              src={post.image.url}
              width="1500"
              height="900"
            />
          </div>
        )}
        <ReactMarkdown className="prose max-w-none">
          {post.content}
        </ReactMarkdown>
        {/* Previous Page*/}
        <button
          onClick={() => router.back()}
          className="block w-full py-4 mt-4 text-xl font-bold text-center text-green-500 transition duration-500 border-t border-gray-200 select-none sm:text-2xl lg:border-t-2 md:my-5 ease lg:hover:text-gray-100 lg:hover:bg-gray-900 focus:outline-none"
        >
          Go Back
        </button>
        <div className="priv-bottom-border"></div>
      </div>
    </Layout>
  );
}

import React, { useEffect, useContext } from "react";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
import CategoryList from "@/components/CategoryList";
import { POST_PER_PAGE } from "@/config/index";
import { DisplayedContext } from "@/context/DisplayedContext";
import { API_URL } from "@/config/index";
import Head from "next/head";

export default function HomePage({ posts, numPages, currentPage, categories }) {
  const { aside, setMenuCategories } = useContext(DisplayedContext);

  useEffect(() => {
    setMenuCategories(true);
  });

  return (
    <Layout>
      <div className="lg:flex">
        <Head>
          <title>
            {currentPage === 1 ? "Recent" : "Former"} Posts - Page {currentPage}{" "}
            of {numPages}
          </title>
          <meta
            name="description"
            content={
              "Find a lot of great posts that allow you to broaden their knowledge about the society, science, psychology, worldviews, atheism, human nature and much more."
            }
          ></meta>
        </Head>
        {/*List of categories*/}
        <aside
          className={`${
            !aside ? "hidden" : ""
          } h-full sticky top-12 md:top-16 lg:top-24 lg:w-1/6 transition duration-500 ease `}
        >
          <CategoryList categories={categories} />
        </aside>
        {/* end of list */}
        <div
          className={`${
            !aside ? "lg:w-6/6" : "lg:w-5/6"
          } bg-colour-111 transition duration-500 ease `}
        >
          <h1 className="hidden p-5 px-6 text-xl font-semibold text-gray-400 md:block lg:text-2xl">
            {currentPage === 1 ? "The Latest" : "Archives"}
          </h1>

          <div className="grid md:grid-cols-1 lg:grid-cols-1">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <div className="px-4 md:px-6">
            <Pagination currentPage={currentPage} numPages={numPages} />
            <div className="priv-bottom-border"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();
  const numPages = Math.ceil(posts.length / POST_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);

  const res = await fetch(`${API_URL}/posts?_sort=date:DESC`);
  const posts = await res.json();
  // GET CATEGORIES
  const categories = posts.map((post) => post.category);
  const uniqueCategories = [...new Set(categories)];

  const numPages = Math.ceil(posts.length / POST_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POST_PER_PAGE,
    (pageIndex + 1) * POST_PER_PAGE
  );
  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
    revalidate: 180,
  };
}

import Link from 'next/link';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import React, { useEffect, useContext } from 'react';
import { DisplayedContext } from '@/context/DisplayedContext';
import ExtraSpace from '@/components/ExtraSpace';
import ExtraSpaceAside from '@/components/ExtraSpaceAside';
import { API_URL } from '@/config/index';
import Head from 'next/head';

export default function HomePage({ posts }) {
  const { setMenuCategories, setAside } = useContext(DisplayedContext);
  useEffect(() => {
    setMenuCategories(false);
    setAside(false);
  });

  let extra;
  const limiter = posts.map((post, index) => {
    if (post.class === 'extra') {
      !extra ? (extra = <ExtraSpace key={index} post={post} />) : null;
    }
  });

  return (
    <Layout>
      {/* START EXTRA SPACE */}
      <div className="grid col-span-2 lg:hidden ">
        {extra}
        <Head>
          <title>MindsSpace Blog - Home Page</title>
          <meta
            name="description"
            content={
              'Blog talks about the critical assimilation of high and low culture that expand your knowledge about the society, science, psychology, worldviews, human nature'
            }
          ></meta>
        </Head>
        <div className="px-4 pt-6 md:px-6">
          <div className="lg:hidden priv-bottom-border"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 px-4 lg:grid-cols-3 bg-colour-111 md:px-6">
        <div className="grid hidden col-span-2 lg:block">{extra}</div>
        <div className="flex flex-col min-h-0 px-3 divide-y-2 divide-y divide-gray-200 lg:pt-6 lg:px-6">
          {posts            
            .map(
              (post, index) =>
                post.class === 'extras' && (
                  <ExtraSpaceAside key={index} post={post} />
                ),
            )}
        </div>
      </div>
      {/* END EXTRA SPACE */}

      <div className="bg-colour-111">
        <div className="pt-3 px-7 md:px-9">
          <div className="lg:hidden priv-bottom-border-bold"></div>
        </div>
        <h1 className="px-4 pt-3 pb-2 text-xl font-semibold text-gray-400 lg:text-2xl lg:py-4 lg:pt-8 md:px-6">
          The Latest
        </h1>
        {/* <h2>OHH Home Page</h2> */}
        <div className="text-gray-800">
          {posts.map(
            post => post.class === 'post' && <Post key={post.id} post={post} />,
          )}         
        </div>
        <div className="px-4 mt-1 md:px-6 md:-mt-4">
          <Link href="/blog">
            <a className="block w-full py-4 my-0 text-xl font-bold text-center text-green-500 border-t border-gray-200 sm:text-2xl lg:border-t-2 md:my-5 lg:transition lg:duration-500 lg:ease lg:select-none lg:hover:text-gray-100 lg:hover:bg-gray-900 focus:outline-none">
              Load More
            </a>
          </Link>
          <div className="priv-bottom-border"></div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/posts?_sort=date:DESC&_limit=10000`);
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 180,
  };
}

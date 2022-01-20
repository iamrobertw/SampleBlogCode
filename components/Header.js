import Link from 'next/link';
import Image from 'next/image';
import React, { useContext } from 'react';
import { DisplayedContext } from '@/context/DisplayedContext';
import Search from './Search';

export default function Header() {
  const { aside, setAside, menuCategories, search, setSearch } =
    useContext(DisplayedContext);
  const site = !menuCategories ? '/blog' : '/';

  return (
    <header className="sticky top-0 z-50 w-full text-gray-100 bg-gray-900">
      <div className="container flex flex-row flex-wrap items-center p-2 mx-auto md:p-3">
        <div className="hidden sm:block">
          <Link href="/">
            <a className="flex items-center justify-start ml-1 mr-2 font-medium title-font sm:ml-3 sm:mr-3 md:mb-0">
              <Image src="/images/logo.png" width={40} height={40} alt="logo" />
              <span className="hidden ml-2 text-xl sm:block">MindsSpace</span>
            </a>
          </Link>
        </div>
        <div className="sm:hidden">
          <Link href="/">
            <a className="flex ml-1 mr-2 font-medium tify-start z-oitems-center title-font sm:ml-3 sm:mr-3 md:mb-0">
              <Image
                src="/images/logo-small.png"
                width={32}
                height={32}
                alt="logo-small"
              />
            </a>
          </Link>
        </div>
        <nav className="flex flex-wrap justify-end ml-auto text-sm md:text-base">
          <Search />
          <a
            onClick={() => setAside(!aside)}
            className={`${
              !menuCategories ? 'hidden' : ''
            } mx-2 sm:mx-5 cursor-pointer uppercase text-orange-555 lg:hover:text-green-400 duration-200`}
          >
            {`${!aside ? 'Category' : 'Close Category'}`}
          </a>
          <a
            onClick={() => setSearch(!search)}
            className={`mx-2 cursor-pointer uppercase lg:hover:text-green-400 ${
              menuCategories && 'hidden'
            } ${search && 'hidden lg:block'}`}
          >
            {`${!search ? 'Search' : 'Close Search'}`}
          </a>
          <Link href={site}>
            <a
              onClick={() => {
                !menuCategories && setSearch(false);
              }}
              className="mx-2 uppercase duration-200 cursor-pointer sm:mx-5 lg:hover:text-green-400"
            >
              {!menuCategories ? 'Blog' : 'Home'}
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}

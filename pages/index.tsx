import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "../libs/client/useUser";
import Head from "next/head";
import { Product } from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import { useInfiniteScroll } from "@libs/client/useInfiniteScroll";
import { useEffect } from "react";
import eggTart from "../public/5.jpeg";
import Image from "next/image";

export interface ProductWithFavCount extends Product {
  _count: { favs: number };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithFavCount[];
  pages: number;
}

const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
  if (pageIndex === 0) return `/api/products?page=1`;
  if (pageIndex + 1 > previousPageData.pages) return null;
  return `/api/products?page=${pageIndex + 1}`;
};

const Home: NextPage = () => {
  const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey);
  const products = data ? data.flatMap((item) => item.products) : [];
  const page = useInfiniteScroll();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  const { user, isLoading } = useUser();

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col mb-5 space-y-5">
        <Head>
          <title>Home</title>
        </Head>
        {data ? (
          products?.map((product) => (
            <Item
              id={product?.id}
              title={product?.name}
              price={product?.price}
              hearts={product?._count.favs}
              key={product?.id}
              image={product?.image}
            />
          ))
        ) : (
          <span className="block text-center">로딩중...</span>
        )}
        <FloatingButton href="/products/upload">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
        <Image src={eggTart} placeholder="blur" alt="eggTart" quality={75} />
      </div>
    </Layout>
  );
};

export default Home;

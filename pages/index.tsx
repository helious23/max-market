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
import client from "@libs/server/client";
import useSWR, { SWRConfig } from "swr";

export interface ProductWithFavCount extends Product {
  _count: { favs: number };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithFavCount[];
  pages: number;
}

const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
  if (previousPageData && !previousPageData.products.length) return null; // reached the end
  return `/api/products?page=${pageIndex + 1}`;
};

const Home: NextPage = () => {
  const { data } = useSWR<ProductsResponse>("/api/products");

  // const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey);
  // console.log(data);

  // const products = data ? data.flatMap((item) => item.products) : [];

  // const page = useInfiniteScroll();
  // useEffect(() => {
  //   setSize(page);
  // }, [setSize, page]);

  const { user, isLoading } = useUser();

  return (
    <Layout title="홈" seoTitle="Home" hasTabBar>
      <div className="flex flex-col mb-5 space-y-5">
        {data?.products?.map((product) => (
          <Item
            id={product?.id}
            title={product?.name}
            price={product?.price}
            hearts={product?._count?.favs || 0}
            key={product?.id}
            image={product?.image}
          />
        ))}
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
      </div>
    </Layout>
  );
};

const Page: NextPage<{ products: ProductWithFavCount[] }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
            page: 1,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  console.log("SSR");
  const products = await client.product.findMany({});

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Page;

import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "../libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";

export interface ProductWithFavCount extends Product {
  _count: { favs: number };
}

interface IProductsResponse {
  ok: boolean;
  products: ProductWithFavCount[];
}

const Home: NextPage = () => {
  const { data } = useSWR<IProductsResponse>("/api/products");
  const { user, isLoading } = useUser();
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col mb-5 space-y-5">
        <Head>
          <title>Home</title>
        </Head>
        {data ? (
          data?.products?.map((product) => (
            <Item
              id={product.id}
              title={product.name}
              price={product.price}
              hearts={product._count.favs}
              key={product.id}
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
      </div>
    </Layout>
  );
};

export default Home;

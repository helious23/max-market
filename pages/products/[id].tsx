import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Product, User } from "@prisma/client";
import Link from "next/link";
import Head from "next/head";

interface ProductWithUser extends Product {
  user: User;
}

interface IItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<IItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  return (
    <Layout title={data?.product.name || "상세 정보"} canGoBack>
      <Head>
        <title>{data?.product.name || "상세 정보"}</title>
      </Head>
      <div className="px-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <Link href={`/users/profiles/${data?.product.user.id}`}>
            <a className="flex items-center py-3 space-x-3 border-t border-b cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {data?.product.user.name}
                </p>
                <div className="text-xs font-medium text-gray-500">
                  프로필 보기 &rarr;
                </div>
              </div>
            </a>
          </Link>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product.name}
            </h1>
            <span className="block mt-3 text-3xl text-gray-900">
              {data?.product.price.toLocaleString()} 원
            </span>
            <p className="my-6 text-base text-gray-700">
              {data?.product.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button text="판매자와 대화하기" large />
              <button className="flex items-center justify-center p-3 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                <svg
                  className="w-6 h-6 "
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">연관 상품</h2>
          <div className="grid grid-cols-2 gap-4 my-8">
            {data?.relatedProducts?.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <a>
                  <div className="w-full h-56 mb-4 bg-slate-300" />
                  <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                  <span className="text-sm font-medium text-gray-900">
                    {product.price.toLocaleString()} 원
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;

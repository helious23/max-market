import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { Product, User } from "@prisma/client";
import Link from "next/link";
import Head from "next/head";
import useMutation from "../../libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import { makeImageUrl } from "../../libs/client/utils";
import Image from "next/image";

interface ProductWithUser extends Product {
  user: User;
}

interface IItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<IItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav, { loading: favLoading }] = useMutation(
    `/api/products/${router.query.id}/fav`
  );

  const onFavClick = () => {
    if (!favLoading) toggleFav({});
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false); // 다른 component 의 cache 를 수정
    // mutate("/api/users/me") // 단순 refetch
  };

  return (
    <Layout seoTitle={data?.product?.name || "상세 정보"} canGoBack>
      <div className="px-4">
        <div className="mb-8">
          {data?.product?.image ? (
            <div className="relative h-96">
              <Image
                src={makeImageUrl(data.product.image, "product")}
                className="object-cover bg-slate-300"
                alt="product"
                layout="fill"
                priority={true}
              />
            </div>
          ) : (
            <div className="h-96 bg-slate-300" />
          )}
          <Link href={`/users/profiles/${data?.product?.user?.id}`}>
            <a className="flex items-center py-3 space-x-3 border-t border-b cursor-pointer">
              {data?.product?.user?.avatar ? (
                <Image
                  src={makeImageUrl(data.product.user.avatar, "avatar")}
                  className="w-12 h-12 rounded-full bg-slate-300"
                  width={48}
                  height={48}
                  alt="avatar"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-300" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {data?.product?.user?.name}
                </p>
                <div className="text-xs font-medium text-gray-500">
                  프로필 보기 &rarr;
                </div>
              </div>
            </a>
          </Link>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="block mt-3 text-3xl text-gray-900">
              {data?.product?.price?.toLocaleString()} 원
            </span>
            <p className="my-6 text-base text-gray-700">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button loading={false} text="판매자와 대화하기" large />
              <button
                onClick={onFavClick}
                className={cls(
                  "flex items-center justify-center rounded-md p-3 hover:bg-gray-100 focus:outline-none",
                  data?.isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400  hover:text-gray-500 "
                )}
              >
                {data?.isLiked ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                )}
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

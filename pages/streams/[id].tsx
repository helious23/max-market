import { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";

interface StreamResponse {
  ok: boolean;
  stream: Stream;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );

  return (
    <Layout title={data?.stream?.name || "라이브"} canGoBack>
      {data ? (
        <div className="px-4 space-y-4">
          <div className="w-full rounded-md shadow-sm aspect-video bg-slate-300" />
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data.stream?.name}
            </h1>
            <span className="block mt-3 text-2xl text-gray-900">
              {data.stream?.price?.toLocaleString()} 원
            </span>
            <p className="my-6 text-gray-700 ">{data.stream?.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">라이브 채팅</h2>
            <div className="h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16 scrollbar-hide">
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
              <Message message="Hi how much are you selling them for?" />
              <Message message="I want ￦20,000" reversed />
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-0 py-2 bg-white">
            <div className="relative flex items-center w-full max-w-md mx-auto">
              <input
                type="text"
                className="w-full pr-12 border-gray-300 rounded-full shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center px-3 text-sm text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span className="block text-center">로딩중...</span>
      )}
    </Layout>
  );
};

export default StreamDetail;

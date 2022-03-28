import { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "../../components/floating-button";
import Layout from "../../components/layout";

const Stream: NextPage = () => {
  return (
    <Layout title="라이브" hasTabBar>
      <div className="pb-12 space-y-4 divide-y-2">
        {[1, 1, 1, 1, 1].map((_, i) => (
          <div className="px-4 pt-4" key={i}>
            <Link href={`/streams/${i}`}>
              <a>
                <div className="w-full rounded-md shadow-sm aspect-video bg-slate-300" />
                <h3 className="mt-2 text-lg text-gray-700">
                  락토핏 유산균 6개월분 한달에 9,900원!
                </h3>
              </a>
            </Link>
          </div>
        ))}
        <FloatingButton href="/streams/create">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Stream;

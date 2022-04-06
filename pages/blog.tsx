import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface Post {
  title: string;
  date: string;
  category: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="Blog" seoTitle="Blog" canGoBack>
      <h1 className="mt-5 mb-10 text-lg font-semibold text-center">
        Latest Posts
      </h1>
      <ul>
        {posts?.map((post, index) => (
          <div key={index} className="mb-5">
            <span className="text-lg text-orange-500">{post.title}</span>
            <div>
              <span>
                {post.date} / {post.category}
              </span>
            </div>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    return matter(content).data;
  });

  return {
    props: {
      posts,
    },
  };
}

export default Blog;

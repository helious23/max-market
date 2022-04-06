import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage, GetStaticProps } from "next";
import Link from "next/link";

interface Post {
  slug: string;
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
            <Link href={`/blog/${post.slug}`}>
              <a>
                <span className="text-lg text-orange-500">{post.title}</span>
                <div>
                  <span>
                    {post.date} / {post.category}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const posts = readdirSync("posts").map((file) => {
    const content = readFileSync(`posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Blog;

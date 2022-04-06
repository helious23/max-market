import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkHtml from "remark-html";

const Post: NextPage<{ post: string }> = ({ post }) => {
  return <div>{post}</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  const files = readdirSync("posts").map((file) => {
    const [name, _] = file.split(".");
    return { params: { slug: name } };
  });

  return {
    paths: files,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content } = matter.read(`posts/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    props: {
      post: value,
    },
  };
};

export default Post;

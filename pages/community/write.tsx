import { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";

const Write: NextPage = () => {
  return (
    <Layout title="질문하기" canGoBack>
      <form className="space-y-4 px-4">
        <TextArea required placeholder="질문을 남겨주세요!" />
        <Button text="질문하기" />
      </form>
    </Layout>
  );
};

export default Write;

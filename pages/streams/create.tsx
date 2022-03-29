import { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import Button from "@components/button";

const Create: NextPage = () => {
  return (
    <Layout title="라이브 만들기" canGoBack>
      <div className="px-4 space-y-5">
        <Input
          label="라이브 제목"
          name="title"
          placeholder="라이브 방송 제목을 입력하세요"
          type="text"
        />
        <Input
          label="가격"
          name="price"
          kind="price"
          placeholder="10,000"
          type="number"
        />
        <TextArea
          label="설명"
          name="description"
          placeholder="설명을 입력하세요"
          required
        />
        <Button text="라이브 시작하기" />
      </div>
    </Layout>
  );
};

export default Create;

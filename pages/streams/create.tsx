import { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import Button from "@components/button";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";

interface ICreateStreamFormProps {
  name: string;
  price: string;
  description: string;
}

interface CreateStreamResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const [createStream, { loading, data }] =
    useMutation<CreateStreamResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<ICreateStreamFormProps>();
  const router = useRouter();
  const onValid = (form: ICreateStreamFormProps) => {
    if (loading) return;
    createStream(form);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout seoTitle="라이브 만들기" title="라이브 만들기" canGoBack>
      <form className="px-4 space-y-5" onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("name", { required: true })}
          label="라이브 제목"
          name="title"
          placeholder="라이브 방송 제목을 입력하세요"
          type="text"
          required
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          label="가격"
          name="price"
          kind="price"
          placeholder="10,000"
          type="number"
          required
        />
        <TextArea
          label="설명"
          name="description"
          placeholder="설명을 입력하세요"
          register={register("description", { required: true })}
          required
        />
        <Button loading={loading} text="라이브 시작하기" />
      </form>
    </Layout>
  );
};

export default Create;

import { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "../../libs/client/useMutation";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IFormProps {
  question: string;
}

interface IPostResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { register, handleSubmit } = useForm<IFormProps>();
  const [uploadPost, { data, loading }] =
    useMutation<IPostResponse>("/api/posts");
  const router = useRouter();

  const onValid = (validData: IFormProps) => {
    if (loading) return;
    uploadPost(validData);
  };

  useEffect(() => {
    if (data && data?.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="질문하기" canGoBack>
      <form className="px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register("question", { required: true })}
          required
          placeholder="질문을 남겨주세요!"
        />
        <Button text={loading ? "업로드중..." : "질문하기"} />
      </form>
    </Layout>
  );
};

export default Write;

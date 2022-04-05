import { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream, Message as MessageType, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "../../libs/client/useUser";
import { useEffect, useState } from "react";

interface MessageWithUser {
  user: {
    avatar?: string;
    id: number;
  };
  id: number;
  message: string;
}

interface StreamWithMessages extends Stream {
  messages: MessageWithUser[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}

interface IMessageFormProps {
  message: string;
}

interface MessageResponse {
  ok: boolean;
  message: MessageType;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<IMessageFormProps>();
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );

  const [sendMessage, { loading, data: sendMessageData }] =
    useMutation<MessageResponse>(`/api/streams/${router.query.id}/messages`);

  const toggleStreamingInfo = () => {
    setOpen((prev) => !prev);
  };

  const onValid = (form: IMessageFormProps) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: prev.stream.messages.length + 1,
                message: form.message,
                user: { ...user },
              },
            ],
          },
        } as any),
      false
    );
    // sendMessage(form);
  };

  useEffect(() => {
    async function fetchData() {
      const lifecycle = await (
        await fetch(
          `https://videodelivery.net/${data?.stream.cloudflareId}/lifecycle`
        )
      ).json();
      console.log(lifecycle);
      setVideoId(lifecycle.videoUID);
    }
    fetchData();
  }, [data]);

  return (
    <Layout title={data?.stream?.name || "라이브"} canGoBack>
      {data ? (
        <div className="px-4 space-y-4">
          <iframe
            className="w-full rounded-md shadow-sm aspect-video"
            src={`https://iframe.videodelivery.net/${data?.stream?.cloudflareId}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={true}
          ></iframe>

          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data.stream?.name}
            </h1>
            <span className="block mt-3 text-2xl text-gray-900">
              {data.stream?.price?.toLocaleString()} 원
            </span>
            <p className="my-6 text-gray-700 ">{data.stream?.description}</p>
            {data?.stream?.userId === user?.id ? (
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={toggleStreamingInfo}
                  className="text-orange-500"
                >
                  스트리밍 URL 및 Key 보기
                </button>
                {open ? (
                  <div className="flex flex-col p-5 my-5 space-y-3 overflow-scroll border border-orange-500 rounded-md scrollbar-hide">
                    <span>스트리밍 정보</span>
                    <span>
                      <span> URL : </span>
                      <span className="block text-sm">
                        {data.stream.cloudflareUrl}
                      </span>
                    </span>
                    <span>
                      <span> Key : </span>
                      <span className="block text-xs">
                        {data.stream.cloudflareKey}
                      </span>
                    </span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">라이브 채팅</h2>
            <div className="h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16 scrollbar-hide">
              {data?.stream?.messages?.map((message) => (
                <Message
                  message={message.message}
                  reversed={message.user.id === user?.id}
                  key={`Message:${message.id}`}
                />
              ))}
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-0 py-2 bg-white">
            <form
              className="relative flex items-center w-full max-w-md mx-auto"
              onSubmit={handleSubmit(onValid)}
            >
              <input
                type="text"
                {...register("message", { required: true })}
                className="w-full pr-12 border-gray-300 rounded-full shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center px-3 text-sm text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <span className="block text-center">로딩중...</span>
      )}
    </Layout>
  );
};

export default StreamDetail;

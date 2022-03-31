import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cls } from "@libs/client/utils";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";

interface IFormProps {
  email?: string;
  phone?: string;
}

interface ITokenFormProps {
  token: string;
}

interface IMutationResult {
  ok: boolean;
}

export default function Enter() {
  const [enter, { loading, data, error }] =
    useMutation<IMutationResult>("/api/users/enter");

  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<IMutationResult>("/api/users/confirm");

  const { register, handleSubmit, reset } = useForm<IFormProps>();

  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<ITokenFormProps>();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };

  const onValid = (validForm: IFormProps) => {
    enter(validForm);
  };

  const onTokenValid = (validForm: ITokenFormProps) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };

  const router = useRouter();

  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [tokenData, router]);

  return (
    <Layout title="로그인" canGoBack>
      <div className="w-full px-4 mt-8">
        <div className="mx-10">
          <h3 className="text-4xl font-bold ">안녕하세요!</h3>
          <h2 className="mt-4 text-xl font-semibold ">만나서 반가워요 :)</h2>
        </div>
        <div className="mt-8">
          <AnimatePresence>
            {data?.ok && (
              <motion.div layoutId="token">
                <form
                  className="flex flex-col mt-5 space-y-4"
                  onSubmit={tokenHandleSubmit(onTokenValid)}
                >
                  <div className="mt-1">
                    <Input
                      register={tokenRegister("token", { required: true })}
                      label="일회용 비밀번호"
                      name="token"
                      placeholder="일회용 비밀번호"
                      required
                      type="number"
                    />
                  </div>
                  <Button
                    text={
                      tokenLoading ? "로딩중..." : "일회용 비밀번호 입력하기"
                    }
                  />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!data?.ok && (
              <motion.div layoutId="token">
                <div className="relative grid w-full grid-cols-2 gap-16 border-b">
                  <AnimatePresence>
                    <button
                      className={cls(
                        "pb-4 font-medium transition-colors",
                        method === "email" ? "text-orange-400" : "text-gray-300"
                      )}
                      onClick={onEmailClick}
                    >
                      이메일로 로그인
                    </button>
                    {method === "email" && (
                      <motion.div
                        key={"email"}
                        className={
                          "absolute top-10 left-0 w-6/12 border-b-2 border-orange-500 text-orange-400"
                        }
                        layoutId="login"
                      />
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    <button
                      className={cls(
                        "pb-4 font-medium transition-colors",
                        method === "phone" ? "text-orange-400" : "text-gray-300"
                      )}
                      onClick={onPhoneClick}
                    >
                      휴대전화로 로그인
                    </button>
                    {method === "phone" && (
                      <motion.div
                        key={"phone"}
                        className={
                          "absolute top-10 right-0 w-6/12 border-b-2 border-orange-500 text-orange-400"
                        }
                        layoutId="login"
                      />
                    )}
                  </AnimatePresence>
                </div>
                <form
                  className="flex flex-col mt-5 space-y-4"
                  onSubmit={handleSubmit(onValid)}
                >
                  <div className="mt-1">
                    {method === "email" ? (
                      <Input
                        register={register("email", { required: true })}
                        label="이메일"
                        name="email"
                        placeholder="이메일"
                        required
                        type="email"
                      />
                    ) : (
                      <Input
                        register={register("phone", { required: true })}
                        kind="phone"
                        label="휴대전화 번호"
                        name="phone"
                        placeholder="휴대전화 번호"
                        type="number"
                        required
                      />
                    )}
                  </div>
                  <Button
                    text={
                      loading
                        ? "로딩중..."
                        : method === "email"
                        ? "로그인 링크 받기"
                        : "일회용 비밀번호 받기"
                    }
                  />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-8 ">
            <div className="relative">
              <div className="absolute w-full border-t border-gray-300" />
              <div className="relative text-center -top-3">
                <span className="px-4 text-sm text-gray-500 bg-white">
                  또는
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:border-transparent hover:bg-orange-500 hover:text-white">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 transition-colors bg-white border border-gray-300 rounded-md shadow-sm hover:border-transparent hover:bg-orange-500 hover:text-white">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

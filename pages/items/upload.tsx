import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";

const Upload: NextPage = () => {
  return (
    <Layout title="업로드" canGoBack>
      <div className="px-4 space-y-5">
        <div>
          <label className="flex items-center justify-center w-full h-48 text-gray-600 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-orange-500 hover:text-orange-500">
            <svg
              className="w-12 h-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <div className="space-y-5">
          <Input
            label="이름"
            name="name"
            placeholder="물건의 이름을 입력하세요"
            required
          />
        </div>
        <div className="space-y-5">
          <Input
            label="가격"
            name="price"
            kind="price"
            placeholder="10,000"
            type="number"
            required
          />
        </div>
        <TextArea
          label="설명"
          name="description"
          placeholder="설명을 입력하세요"
          required
        />
        <Button text="물건 올리기" />
      </div>
    </Layout>
  );
};

export default Upload;
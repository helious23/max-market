import { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";

const EditProfile: NextPage = () => {
  return (
    <Layout title="프로필 수정" canGoBack>
      <div className="space-y-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full bg-slate-300" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
          >
            변경하기
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <Input
            label="이메일 주소"
            name="email"
            placeholder="이메일"
            type="email"
          />
        </div>
        <div className="space-y-1">
          <Input
            label="휴대전화 번호"
            name="phone"
            kind="phone"
            type="number"
            placeholder="휴대전화 번호"
          />
        </div>
        <Button text="프로필 업데이트" />
      </div>
    </Layout>
  );
};

export default EditProfile;

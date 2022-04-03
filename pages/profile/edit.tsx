import { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import useUser from "../../libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "../../libs/client/useMutation";

interface EditProfileForm {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const [editProfile, { loading, data }] =
    useMutation<EditProfileResponse>(`/api/users/me`);
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<EditProfileForm>();

  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  const onValid = ({ email, phone, name, avatar }: EditProfileForm) => {
    console.log(avatar);

    // if (loading) return;
    // if (email === "" && phone === "" && name === "") {
    //   return setError("formErrors", {
    //     message: "이메일, 휴대전화 번호 중 하나를 입력하세요",
    //   });
    // }
    // editProfile({ email, phone, name });
    // alert("프로필이 수정되었습니다.");
  };

  useEffect(() => {
    if (data && !data.ok) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  const watchEmail = watch("email");
  const watchPhone = watch("phone");

  useEffect(() => {
    if (watchEmail || watchPhone) {
      clearErrors("formErrors");
    }
  }, [watch, clearErrors, watchEmail, watchPhone]);

  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout title="프로필 수정" canGoBack>
      <form className="px-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="rounded-full h-14 w-14 bg-slate-300"
            />
          ) : (
            <div className="rounded-full h-14 w-14 bg-slate-300"></div>
          )}
          <label
            htmlFor="picture"
            className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer"
          >
            변경하기
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

        <Input
          label="이름"
          name="name"
          placeholder={"이름"}
          type="text"
          register={register("name")}
          required={false}
        />

        <Input
          label="이메일 주소"
          name="email"
          placeholder={"이메일"}
          type="email"
          register={register("email")}
          required={false}
        />

        <Input
          label="휴대전화 번호"
          name="phone"
          kind="phone"
          type="number"
          placeholder="휴대전화 번호"
          register={register("phone")}
          required={false}
        />

        {errors.formErrors ? (
          <span className="block my-2 font-medium text-center text-red-500">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button loading={loading} text="프로필 업데이트" />
      </form>
    </Layout>
  );
};

export default EditProfile;

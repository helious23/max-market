import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { User } from "@prisma/client";

interface IUserResponse {
  ok: boolean;
  user: User;
}

export default function useUser() {
  const { data, error } = useSWR<IUserResponse>("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      console.log(data);
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.user, isLoading: !data && !error };
}

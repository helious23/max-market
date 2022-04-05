import { Sale, User } from "@prisma/client";
import useSWR from "swr";
import { ProductWithFavCount } from "../pages/index";
import Item from "@components/item";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface Record extends Sale {
  id: number;
  user: User;
  product: ProductWithFavCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);

  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          image={record.product.image}
          id={record.product.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
          key={record.id}
        />
      ))}
    </>
  ) : null;
}

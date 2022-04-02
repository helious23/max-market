import { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Bought: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col pb-5 space-y-5">
        <ProductList kind="purchases" />
      </div>
    </Layout>
  );
};

export default Bought;

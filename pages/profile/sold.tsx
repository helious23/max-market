import { NextPage } from "next";
import Layout from "@components/layout";
import Item from "@components/item";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout seoTitle="판매내역" title="판매내역" canGoBack>
      <div className="flex flex-col pb-5 space-y-5">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;

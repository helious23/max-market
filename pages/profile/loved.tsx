import { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Loved: NextPage = () => {
  return (
    <Layout seoTitle="관심목록" title="관심목록" canGoBack>
      <div className="flex flex-col pb-5 space-y-5">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;

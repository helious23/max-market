import { NextPage } from "next";
import Layout from "../../components/layout";
import Item from "../../components/item";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col pb-5 space-y-5">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            id={i}
            title={"New iPhone 14"}
            price={100000}
            comments={3}
            hearts={5}
            key={i}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;

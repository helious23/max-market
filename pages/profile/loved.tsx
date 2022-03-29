import { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 pb-5">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            id={i}
            title={"New iPhone 14"}
            price={10000}
            comments={3}
            hearts={5}
            key={i}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Loved;

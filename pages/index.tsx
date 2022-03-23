import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="grid min-h-screen gap-10 px-16 py-20 place-content-center bg-slate-400 md:grid-cols-2 xl:grid-cols-4">
      <div className="flex flex-col justify-between p-6 bg-white shadow-xl dark:bg-black rounded-3xl">
        <span className="text-3xl font-semibold dark:text-white">
          Select Item
        </span>
        <ul>
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between ">
              <span className="my-2 text-slate-500">Grey Chair</span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
        </ul>
        <div className="flex justify-between pt-2 mt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$90</span>
        </div>
        <button className="flex justify-center w-2/4 py-3 mx-auto mt-5 text-white bg-blue-500 rounded-lg hover:bg-teal-500 hover:text-black active:bg-rose-400 focus:bg-slate-700 dark:bg-black dark:border dark:border-white dark:hover:bg-white dark:hover:text-black">
          Checkout
        </button>
      </div>
      <div className="overflow-hidden bg-white shadow-xl rounded-3xl group">
        <div className="p-6 bg-blue-500 pb-14 xl:pb-32 ">
          <span className="text-2xl text-white">Profile</span>
        </div>
        <div className="relative p-6 bg-white rounded-3xl -top-5">
          <div className="relative flex items-end justify-between -top-16">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="w-24 h-24 transition-colors bg-gray-400 rounded-full group-hover:bg-red-300 " />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$2,310</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-10 -mb-5">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">New York, USA</span>
          </div>
        </div>
      </div>
      <div className="p-10 bg-white shadow-xl rounded-3xl">
        <div className="flex items-center justify-between mb-5">
          <span>⬅</span>
          <div className="space-x-3">
            <span>⭐️4.9</span>
            <span className="p-2 rounded-md shadow-xl">💖</span>
          </div>
        </div>
        <div className="mb-5 h-72 bg-zinc-400" />
        <div className="flex flex-col">
          <span className="text-xl font-medium">Swoon Lounge</span>
          <span className="text-xs">Chair</span>
          <div className="flex items-center justify-between mt-3 mb-5">
            <div className="space-x-2">
              <button className="w-5 h-5 transition bg-yellow-500 rounded-full focus:ring-2 ring-offset-1 ring-yellow-500"></button>
              <button className="w-5 h-5 transition bg-indigo-500 rounded-full focus:ring-2 ring-offset-1 ring-indigo-500"></button>
              <button className="w-5 h-5 transition bg-teal-500 rounded-full focus:ring-2 ring-offset-1 ring-teal-500"></button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center justify-center w-8 text-xl text-gray-500 bg-blue-200 aspect-square rounded-xl">
                -
              </button>
              <span>1</span>
              <button className="flex items-center justify-center w-8 text-xl text-gray-500 bg-blue-200 aspect-square rounded-xl">
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-medium"> $450 </span>
            <button className="px-8 py-2 text-sm text-center text-white bg-blue-500 rounded-lg">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <form className="flex flex-col p-5 space-y-2 ">
        <input
          type="text"
          required
          placeholder="Username"
          className="px-2 py-2 border border-gray-400 rounded-xl peer"
        />
        <span className="peer-valid:hidden">사용자 이름을 입력해주세요</span>
        <input type="submit" value="Login" className="bg-white" />
      </form>
      <details className="select-none">
        <summary className="">What is my fav. food?</summary>
        <span>Chicken salad with salsa source</span>
      </details>
      <ul className="list-decimal marker:text-red-500">
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
      </ul>
      <form>
        <input
          type="file"
          className=" file:hover:text-purple-400 file:hover:bg-white file:hover:border-2 file:hover:border-purple-400 file:transition-colors file:cursor-pointer file:border-0 file:rounded-lg file:bg-purple-400 file:px-3 file:py-2 file:text-white"
        />
      </form>
      <div className="first-letter:text-7xl first-line:uppercase">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        cumque nam beatae veniam ad numquam, cupiditate id repudiandae molestias
        possimus. Dolorem provident tempora eligendi cupiditate reiciendis
        officiis architecto veniam molestiae.
      </div>
    </div>
  );
};

export default Home;

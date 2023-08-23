import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
  const [toggled, setToggled] = useState<boolean>(false);

  useEffect(() => {
    console.log(toggled);
  }, [toggled]);

  return (
    <div className="overflow-hidden relative">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: toggled ? 0 : "100%" }}
        className="fixed w-full min-h-screen z-10 px-20 bg-opacity-20 flex justify-center items-center bg-fifth"
        onClick={() => {
          setToggled(!toggled);
        }}
      >
        <div className="">
          <div className="text-white text-[1.25rem] grid grid-rows-4 grid-cols-2 gap-4 lg:text-xl">
            <Link
              className="flex flex-col col-span-2 p-4 bg-second rounded-lg z-20 "
              to="/joyo"
            >
              <ruby>
                重要漢字 <rt>じゅうようかんじ</rt>
              </ruby>
              Essential Kanjis
            </Link>
            <Link
              className="flex flex-col p-4 bg-second rounded-lg z-20 "
              to="/grade-6"
            >
              Grade 6
            </Link>
            <Link
              className="flex flex-col p-4 bg-second rounded-lg z-20 "
              to="/grade-5"
            >
              Grade 5
            </Link>
            <Link
              className="flex flex-col p-4 bg-second rounded-lg z-20 "
              to="/grade-4"
            >
              Grade 4
            </Link>
            <Link
              className="flex flex-col p-4 bg-second rounded-lg z-20 "
              to="/grade-3"
            >
              Grade 3
            </Link>
            <Link
              className="flex flex-col p-4 bg-second rounded-lg z-20 "
              to="/grade-2"
            >
              Grade 2
            </Link>
            <Link
              className="flex flex-col p-4 bg-second rounded-lg z-20 "
              to="/grade-1"
            >
              Grade 1
            </Link>
          </div>
        </div>
      </motion.div>
      <div className="relative container flex flex-col justify-center items-center min-w-full min-h-screen py-8 bg-first font-motoya ">
        <div className="fixed top-[2rem] w-full py-4 mb-8 -mt-8  bg-third flex justify-between px-6 text-white">
          <div className="static left-4 top-4  text-4xl hover:pointer-events-auto ">
            <button
              onClick={() => {
                setToggled(!toggled);
              }}
            >
              <BsMenuButtonWideFill />
            </button>
          </div>
          <div className="text-3xl">
            <p>漢字辞典</p>
          </div>
          <div className="text-xl ">リズキ</div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;

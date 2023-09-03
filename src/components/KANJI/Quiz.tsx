import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchLocalKanji } from "../AXIOS/Api";

import "swiper/css";

const Quiz = () => {
  const [openedKanjis] = useState<string[]>(fetchLocalKanji());
  const getRandomNumber = (max: number) => {
    return Math.round(Math.random() * max);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center ">
      <Swiper>
        {openedKanjis.map((e: string, i: number) => {
          return (
            <SwiperSlide className="w-full h-full flex flex-col justify-center items-center text-white text-2xl">
              <h1>hello world{e } {i}{getRandomNumber(10)}</h1>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Quiz;

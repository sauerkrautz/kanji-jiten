import { useEffect, useState } from "react";
import { fetchLocalKanji } from "../AXIOS/Api";
import Kanji from "./Kanji";

const OpenedKanjis = () => {
  const [openedKanjis, setOpenedKanjis] = useState<string[]>([]);

  useEffect(() => {
    const kanjis = fetchLocalKanji("opened");
    console.log(kanjis);
    const removeDucplicate = (kanji: any) => {
      for (let i = 0; i < kanji.length - 1; i++) {
        for (let j = i + 1; j < kanji.length; j++) {
          if (kanji[i] === kanji[j]) {
            // console.log({ i, j, firstKanji: kanji[i], secondKanji: kanji[j] });
            kanji.splice(j, 1);
          } else {
            continue;
          }
        }
      }

      return kanji;
    };
    if (kanjis) {
      const noDuplicate = removeDucplicate(kanjis.opened);
      localStorage.setItem(
        "opened",
        JSON.stringify({ ...kanjis, opened: noDuplicate })
      );
      setOpenedKanjis(() => {
        return noDuplicate;
      });
    } else {
      return;
    }
  }, []);

  if (openedKanjis !== null || openedKanjis !== undefined) {
    return (
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-8 w-full px-8">
        {fetchLocalKanji("opened")
          ? openedKanjis?.map((e: any) => {
              return <Kanji kanji={e} />;
            })
          : "loading..."}
      </div>
    );
  } else {
    return (
      <div className="text-white text-2xl px-8 lg:px-12">
        Click the icon on the top left corner, choose the grade of the kanji,
        click on the kanji, and the ones you've clicked and also guessed
        correctly in the quiz will appear here!
      </div>
    );
  }
};

export default OpenedKanjis;

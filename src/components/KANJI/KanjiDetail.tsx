import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { fetchKanji, fetchLocalKanji, fetchWord } from "../AXIOS/Api";

const KanjiDetail = () => {
  const { kanji } = useParams();
  const [oneKanji, setOneKanji] = useState<IndividualKanjiDetail>();
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const kanjis = fetchLocalKanji(`${kanji}`);
    if (kanjis !== null || kanjis !== undefined) {
      setOneKanji(kanjis);
    } else {
      return;
    }
  }, []);

  const kanjiQuery = useQuery({
    queryKey: ["kanjis, kanji"],
    queryFn: () => {
      const localKanji = fetchLocalKanji(kanji);
      if (localKanji === null || localKanji === undefined) {
        console.table({ kanjiDetail: "fetching" });
        return fetchKanji(`/${kanji}`);
      } else {
        console.table({ kanjiDetail: "not fetching" });
        setOneKanji(localKanji);
        return;
      }
    },
    onSuccess(data: any) {
      console.table(data);
      if (data) {
        localStorage.setItem(`${kanji}`, JSON.stringify(data));
        setOneKanji(data);
      } else {
        return;
      }
    },
  });

  const wordQuery = useQuery({
    queryKey: ["word", "words"],
    queryFn: () => {
      const localKanjis = fetchLocalKanji(`${kanji}`);
      if (localKanjis?.words === null || localKanjis?.words === undefined) {
        return fetchWord(`${kanji}`);
      } else {
        return;
      }
    },
    onSuccess(data) {
      if ((data && oneKanji !== null) || oneKanji !== undefined) {
        localStorage.setItem(
          `${kanji}`,
          JSON.stringify({ ...oneKanji, words: data })
        );
        setWords(data);
      } else {
        return;
      }
      console.table(data);
    },
  });

  if (kanjiQuery.isLoading || wordQuery.isLoading) return <p>Loading...</p>;

  if (kanjiQuery.error || wordQuery.error) return <p>error</p>;

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-center gap-8 px-20 text-white  ">
      <div className="text-black">
        <p className="lg:text-[12rem] text-[8rem] bg-yellow-500 border-4 border-yellow-600 rounded-lg  ">
          {oneKanji?.kanji}
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="mt-4 flex flex-wrap lg:gap-4 gap-2 justify-between">
          <div className="text-xl">Meanings: </div>
          {oneKanji?.meanings.map((e) => {
            return (
              <div className="lg:p-2 p-1 border-sixth self-end shadow-lg bg-fifth text-black rounded-lg">
                {e}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap lg:gap-4 gap-2 justify-between">
          <p className="text-xl">Kunyomi: </p>
          {oneKanji?.kun_readings.map((e) => {
            return (
              <p className="lg:p-2 p-1 border-sixth shadow-lg bg-fifth text-black rounded-lg">
                {e}
              </p>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap lg:gap-4 gap-2 justify-between">
          <p className="text-xl">Onyomi: </p>
          {oneKanji?.on_readings.map((e) => {
            return (
              <p className="lg:p-2 p-1 border-sixth shadow-lg bg-fifth text-black rounded-lg">
                {e}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KanjiDetail;

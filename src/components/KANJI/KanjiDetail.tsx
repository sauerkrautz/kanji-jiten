import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { fetchKanji, fetchLocalKanji, fetchWord } from "../AXIOS/Api";

const KanjiDetail = () => {
  const { kanji } = useParams();
  const [oneKanji, setOneKanji] = useState<IndividualKanjiDetail>();
  const [words, setWords] = useState<string[]>([]);
  const [localKanji] = useState(fetchLocalKanji(kanji));

  useEffect(() => {
    if (localKanji !== undefined && localKanji?.words !== undefined) {
      setOneKanji(localKanji);
      setWords(localKanji?.words);
    } else {
      return;
    }
  }, []);

  const kanjiQuery = useQuery({
    queryKey: ["kanjis, kanji"],
    queryFn: () => {
      // const localKanji = fetchLocalKanji(kanji);
      if (localKanji?.kanji === null || localKanji?.kanji === undefined) {
        console.table({ kanjiDetail: "fetching" });
        return fetchKanji(`/${kanji}`);
      } else {
        console.table({ kanjiDetail: "not fetching" });
        setOneKanji(localKanji);
        return;
      }
    },
    enabled: localKanji?.kanji ? false : true,
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
      // const localKanjis = fetchLocalKanji(`${kanji}`);
      if (localKanji?.words === null || localKanji?.words === undefined) {
        return fetchWord(`${kanji}`);
      } else {
        setWords(localKanji.words);
        return;
      }
    },
    enabled: localKanji?.words ? false : true,
    onSuccess(data) {
      if (data) {
        localStorage.setItem(
          `${kanji}`,
          JSON.stringify({ ...oneKanji, words: data })
        );
        setWords(data);
      } else {
        return;
      }
      console.table(data.meanings);
    },
  });

  if (kanjiQuery.isLoading || wordQuery.isLoading) return <p>Loading...</p>;

  if (kanjiQuery.error || wordQuery.error) return <p>error</p>;

  return (
    <div className="min-w-full min-h-screen flex flex-col  justify-center items-center gap-8 px-8 md:px-12 lg:px-20 text-white  ">
      <div className="text-black">
        <p className="lg:text-[12rem] text-[8rem] mt-16 bg-yellow-500 border-4 border-yellow-600 rounded-lg  ">
          {oneKanji?.kanji}
        </p>
      </div>
      <div className="flex w-full flex-col gap-8">
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
        <div className="my-4 text-2xl rounded-lg text-black text-center bg-fifth">
          words
        </div>
        <div className="mt-4 flex flex-wrap lg:gap-4 gap-2 justify-between">
          <div className="w-full flex justify-between">
            <p className="text-xl">Written: </p>
            <p className="text-xl">Meanings: </p>
          </div>
          {words.map((kanji: any) => {
            return (
              <div className="w-full flex justify-between gap-2">
                <div className="lg:p-2 p-1 border-sixth shadow-lg bg-fifth text-black rounded-lg">
                  {kanji.variants.map((e: any) => {
                    return (
                      <p>
                        <ruby>
                          {e.written} <rt>{e.pronounced}</rt>
                        </ruby>
                        {/* (
                        {e.meanings.map((e: any) => {
                          return <p>{e.glosses.map((e: any) => e)}</p>;
                        })}
                        ) */}
                      </p>
                    );
                  })}
                </div>
                <div>
                  {kanji.meanings.map((meaning: any) => {
                    return meaning.glosses.map((mean: string) => {
                      return <p className="text-white">{mean}</p>;
                    });
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KanjiDetail;

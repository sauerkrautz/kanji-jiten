import { UseQueryResult, useQuery } from "react-query";
import { fetchKanji, fetchLocalKanji } from "../AXIOS/Api";
import { useEffect, useState } from "react";
import Kanji from "./Kanji";
import SearchBar from "../UI/SearchBar";

const Kanjis = () => {
  const [kanjis, setKanjis] = useState<string[] | null>(null);

  useEffect(() => {
    const kanjis = fetchLocalKanji();
    if (kanjis != null || kanjis != undefined) {
      setKanjis(kanjis);
    } else {
      return;
    }
  }, []);

  const { isLoading, error }: UseQueryResult<any> = useQuery({
    queryKey: ["kanjis", "kanji"],
    queryFn: () => {
      const kanji = fetchLocalKanji();
      if (kanji === null || kanji === undefined) {
        console.table({ status: "kanjis being fetched" });
        return fetchKanji("joyo");
      } else {
        console.table({ status: "kanjis not being fetched" });
        setKanjis(kanji);
        return;
      }
    },
    enabled: fetchLocalKanji() ? false : true,
    onSuccess(data: any) {
      if (data) {
        localStorage.setItem("joyo", JSON.stringify(data));
        setKanjis(data);
      } else {
        return;
      }
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>error</h1>;

  return (
    <>
      <SearchBar />
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-8 w-full px-8">
        {kanjis?.map((kanji: string) => {
          return <Kanji kanji={kanji} key={kanji} />;
        })}
      </div>
    </>
  );
};

export default Kanjis;

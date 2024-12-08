import { Link } from "react-router-dom";

const Kanji = ({ kanji }: any) => {
  //   const [details, setDetails] = useState<IndividualKanjiDetail>();

  //   useEffect(() => {
  //     const localKanjis = fetchLocalKanji(`${kanji}`);
  //     if (localKanjis !== null || localKanjis !== undefined) {
  //       setDetails(localKanjis);
  //     } else {
  //       return;
  //     }
  //   }, []);

  return (
    <>
      <Link to={`/kanji/${kanji}`}>
        <div className="text-4xl flex justify-evenly items-center text-white rounded-lg shadow-lg bg-second p-4 md:p-8 text-center ">
          <p>{kanji}</p>
          {/* <div>
            {details?.meanings.map((e) => {
              return <p>{e}</p>;
            })}
          </div> */}
        </div>
      </Link>
    </>
  );
};

export default Kanji;

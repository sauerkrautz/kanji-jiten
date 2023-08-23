import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ input, setInput }: any) => {
  //   const [input1, setInput1] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-center mb-[4rem]">
      <form
        onSubmit={(e) => {
          if (input.length > 1) {
            return;
          } else {
            navigate(`/kanji/${input}`);
            e.preventDefault();
            setInput("");
          }
        }}
      >
        <input
          type="text"
          className="px-4 py-2 rounded-md bg-second text-white "
          onChange={handleInput}
          value={input}
        />
      </form>
    </div>
  );
};

export default SearchBar;

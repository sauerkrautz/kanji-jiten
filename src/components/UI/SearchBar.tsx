import { ChangeEvent, useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState<string>();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => (prev = e.target.value));
  };

  return (
    <div className="w-full flex items-center justify-center mb-[4rem]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setInput("");
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

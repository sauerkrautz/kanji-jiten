// import { ChangeEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SearchBar = ({ input, setInput }: any) => {
//   const [input1, setInput1] = useState<string>("");

//   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
//     setInput1(e.target.value);
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="w-full flex items-center justify-center mb-[4rem]">
//       <form
//         onSubmit={(e) => {
//           if (input1.length > 1) {
//             return;
//           } else {
//             navigate(`/kanji/${input1}`);
//             e.preventDefault();
//             setInput1("");
//           }
//         }}
//       >
//         <input
//           type="text"
//           className="px-4 py-2 rounded-md bg-second text-white "
//           onChange={handleInput}
//           value={input1}
//         />
//       </form>
//     </div>
//   );
// };

// export default SearchBar;

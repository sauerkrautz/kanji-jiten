import { Outlet } from "react-router-dom";
import Kanjis from "./components/KANJI/Kanjis";
import SearchBar from "./components/UI/SearchBar";

function App() {
  return (
    <>
      <div className="container flex flex-col justify-center items-center min-w-full min-h-screen py-8 bg-first ">
        <Outlet />
      </div>
    </>
  );
}

export default App;

import axios from "axios";

const Kanji = axios.create({ baseURL: "https://kanjiapi.dev/v1/kanji" });
const Word = axios.create({ baseURL: "https://kanjiapi.dev/v1/words" });
const Reading = axios.create({
  baseURL: "https://kanjiapi.dev/v1/reading",
});

const fetchLocalKanji = (key?: string) => {
  const fetched: any = localStorage.getItem(`${key ? key : "joyo"}`);
  if (fetched != null || undefined) {
    const kanjis = JSON.parse(fetched);
    return kanjis;
  } else {
    return null;
  }
};

const fetchKanji = async (character: string) => {
  try {
    const data = await Kanji.get(`${character ? character : "joyo"}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};

const fetchWord = async (word: string) => {
  try {
    const data = await Word.get(`${word ? word : "jooyoo"}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};

const fetchReading = async (reading: string) => {
  try {
    const data = await Reading.get(`${reading ? reading : "jooyoo"}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};

export { fetchKanji, fetchWord, fetchReading, fetchLocalKanji };

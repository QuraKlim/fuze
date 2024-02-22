import axios from "axios";

export async function fetchJokes(searchValue: string) {
  return await axios.get(
    `https://api.chucknorris.io/jokes/search?query=${searchValue}&limit=10`
  );
}

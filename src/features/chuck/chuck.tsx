import { ChangeEvent, MouseEvent, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchJokesByValue } from "./chuckSlice";
import Loader from "../../public/images/approved.png";
import styles from "./chuck.module.css";
import { toDate } from "../../helper/dateFunction";
import { debounce } from "../../helper/debounce";

export function ChuckNorrisJokes() {
  const { jokes, status } = useAppSelector((store) => store.chuck);
  const dispatch = useAppDispatch();

  const searchInput = useRef<HTMLInputElement>(null);

  const requestJokesByValue = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target && target.value.length >= 3) {
      dispatch(fetchJokesByValue(target.value));
    }
  }, 700);

  const clearInput = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (searchInput.current) {
      searchInput.current.value = "";
    }
  };

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  return (
    <section className="container">
      <div className={styles.content}>
        <div className={styles.search_wrapper}>
          <input
            ref={searchInput}
            placeholder="Search jokes"
            onChange={requestJokesByValue}
            className={styles.search + " bold-text regular-text"}
          />
          <div className={styles.input_footer}>
            {jokes && status === "idle" ? (
              <p className={styles.search_total + " smaller-text"}>
                Found jokes: {jokes.length}
              </p>
            ) : null}
            <button className={styles.clear_button} onClick={clearInput}>
              Clear input
            </button>
          </div>
        </div>

        <img
          src={Loader}
          loading="eager"
          alt="chuck-loading"
          className={(status === "loading" ? " " : "hidden ") + styles.loader}
        />

        {status === "failed" && (
          <h1>Something goes wrong, please, try again later</h1>
        )}

        {status === "idle" && jokes ? (
          <div className={styles.jokes}>
            {jokes?.map((i) => (
              <a
                className={styles.joke}
                href={i.url}
                target="_blank"
                rel="noreferrer"
              >
                <p>{i.value}</p>
                <div className={styles.joke_footer}>
                  <p className="little-text light-text">{i.id}</p>
                  <p className="little-text light-text">
                    {toDate(i.created_at)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

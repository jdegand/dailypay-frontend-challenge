import { useState, useEffect } from "react";
import "./App.css";
import Modal from "./components/Modal";

import { Movies, Item } from "./interfaces";

function App() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const [ballot, setBallot] = useState<any>({
    "best-picture": undefined,
    "best-director": undefined,
    "best-actor": undefined,
    "best-actress": undefined,
    "best-supporting-actor": undefined,
    "best-supporting-actress": undefined,
    "best-visual-effects": undefined,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/api/getBallotData");
      const movies = await response.json();

      setMovies(movies.items);
    }
    fetchData();
  }, []);

  const handleClick = (event: any) => {
    const newObj = { ...ballot };
    newObj[event.target.dataset.category] = event.target.value;
    setBallot(newObj);
  };

  const handleSubmit = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <main>
      <header>
        <h1>AWARDS 2021</h1>
      </header>
      <div>
        {movies?.map((category, index) => {
          return (
            <section key={category.id}>
              <div className="category-title-div">
                <h1 data-testid={`category-${index}`}>{category.title}</h1>
              </div>
              <div className="nominees-grid">
                {category.items?.map((item: Item) => {
                  return (
                    <div
                      key={item.id}
                      className={
                        ballot[
                          category.title.split(" ").join("-").toLowerCase()
                        ] === item.title.split(" ").join("-").toLowerCase() ||
                        item.title
                          .split(" ")
                          .join("-")
                          .toLowerCase()
                          .includes(
                            ballot[
                              category.title.split(" ").join("-").toLowerCase()
                            ]
                          )
                          ? "item-card selected"
                          : "item-card"
                      }
                    >
                      <h2>{item.title}</h2>
                      <div className="img-div">
                        <img src={item.photoUrL} alt="" />
                      </div>
                      <button
                        data-testid={`button-${category.id}-${item.id}`}
                        type="button"
                        data-category={category.id}
                        value={item.id}
                        onClick={handleClick}
                      >
                        Select
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      <div className="submit-button-div">
        <button
          data-testid="submit-button"
          className="submit-button"
          type="button"
          disabled={
            Object.values(ballot).filter((property) => !Boolean(property))
              .length !== 0
          }
          onClick={handleSubmit}
        >
          Submit Ballot
        </button>
      </div>
      {openModal ? (
        <Modal
          ballot={ballot}
          setBallot={setBallot}
          setOpenModal={setOpenModal}
        />
      ) : null}
    </main>
  );
}

export default App;

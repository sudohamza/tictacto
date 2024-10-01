import { useEffect, useState } from "react";
import "./App.css";
import Block from "./Block";

function App() {
  const [blocks, setBlocks] = useState<Array<number>>();
  const [playerOnePlaces, setPlayerOne] = useState(Array<number>);
  const [playerTwoPlaces, setPlayerTwo] = useState(Array<number>);
  const [turn, setTurn] = useState("p-one" || "p-two");
  const winPatterns = ["123", "456", "789", "147", "258", "369", "159", "357"];
  useEffect(() => {
    let playerOnePattern = playerOnePlaces
      .sort((a, b) => a - b)
      .join("")
      .toString();
    let playerTwoPattern = playerTwoPlaces
      .sort((a, b) => a - b)
      .join("")
      .toString();

    let isPlayerOneWin = winPatterns.some((pattern) =>
      playerOnePattern.includes(pattern)
    );
    let isPlayerTwoWin = winPatterns.some((pattern) =>
      playerTwoPattern.includes(pattern)
    );

    if (isPlayerOneWin) {
      setTimeout(() => {
        alert("Player Green Wins");
        window.location.reload();
      }, 500);
    } else if (isPlayerTwoWin) {
      setTimeout(() => {
        alert("Player Red Wins");
        window.location.reload();
      }, 500);
    }
  }, [playerOnePlaces, playerTwoPlaces]);
  useEffect(() => {
    setBlocks([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }, []);

  const handleClick = (event: any) => {
    const classes = event.currentTarget.className;
    if (classes.includes("p-one") || classes.includes("p-two")) return;
    if (turn === "p-one") {
      event.currentTarget.className += " p-one";
      let currentPlace = event.currentTarget.getAttribute("data-id");
      setPlayerOne([...playerOnePlaces, currentPlace]);
      setTurn("p-two");
    } else if (turn === "p-two") {
      event.currentTarget.className += " p-two";
      let currentPlace = event.currentTarget.getAttribute("data-id");
      setPlayerTwo([...playerTwoPlaces, currentPlace]);
      setTurn("p-one");
    }
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="grid">
            {blocks?.map((_, index) => (
              <Block dataId={index + 1} onClick={handleClick} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import RenderList from "./components/RenderList";
import RenderGameInfo from "./components/RenderGameInfo";
import RenderGameOver from "./components/RenderGameOver";
import shuffleArray from "./components/utils";

function App() {
    // data fetch
    const [warframes, setWarframes] = useState([]);

    useEffect(() => {
        fetch("src/data/warframes.json")
            .then((response) => response.json())
            .then((data) => {
                setWarframes(data);
            })
            .catch((error) => {
                console.error("Error fetching JSON:", error);
            });
    }, []);

    // warframe initial list render
    const [warframesRenderList, setWarframesRenderList] = useState([]);
    const [indexes, setIndexes] = useState(new Set());

    useEffect(() => {
        const values = Object.values(warframes);
        if (values.length === 0) return;

        // generate random 10 indexes to get from json
        while (indexes.size < 12) {
            const randomIndex = Math.floor(Math.random() * values.length);
            setIndexes(indexes.add(randomIndex));
        }
        setWarframesRenderList([...indexes].map((i) => values[i]));
    }, [warframes, indexes]);

    // click logic
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedWarframes, setClickedWarframes] = useState(new Set());
    const [clickedWarframeName, setClickedWarframeName] = useState("");
    const [wrongClick, setWrongClick] = useState(false);
    let newScore;

    function handleClickOnWarframe(warframeName) {
        if (clickedWarframes.has(warframeName)) {
            setScore(0);
            setClickedWarframes(new Set());
            setClickedWarframeName(warframeName);
            setWrongClick(true);
        } else {
            newScore = score + 1;
            setScore(newScore);

            if (newScore > bestScore) {
                setBestScore(newScore);
            }
            setWrongClick(false);
            const updatedClicked = new Set(clickedWarframes);
            updatedClicked.add(warframeName);
            setClickedWarframes(updatedClicked);
        }

        if (newScore == 10) setIsGameOver(true);

        // shuffle cards
        setWarframesRenderList((prev) => shuffleArray(prev));
    }

    // game over logic
    const [isGameOver, setIsGameOver] = useState(false);

    function handleGameOver() {
        setScore(0);
        setBestScore(0);
        setClickedWarframes(new Set());
        setWrongClick(false);
        setIndexes(new Set());
        setIsGameOver(false);
    }

    if (isGameOver) {
        return <RenderGameOver onClick={handleGameOver} />;
    }

    function regenerateList() {
        setScore(0);
        setBestScore(0);
        setClickedWarframes(new Set());
        setWrongClick(false);
        setIndexes(new Set());
    }

    // main render
    return (
        <>
            <RenderGameInfo
                score={score}
                bestScore={bestScore}
                regenerateList={regenerateList}
            />
            <RenderList
                warframesList={warframesRenderList}
                handleClick={handleClickOnWarframe}
                wrongClick={wrongClick}
                clickedWarframeName={clickedWarframeName}
            />
        </>
    );
}

export default App;

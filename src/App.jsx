import { useState, useEffect } from "react";
import "./App.css";
import RenderList from "./components/RenderList";
import RenderGameInfo from "./components/RenderGameInfo";
import shuffleSet from "./components/utils";
import RenderGameOver from "./components/RenderGameOver";

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

    // click logic
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedWarframes, setClickedWarframes] = useState(new Set());
    const [clicked, setClicked] = useState(false);
    const [wrongClick, setWrongClick] = useState(false);
    let newScore;

    function handleClickOnWarframe(e) {
        if (clickedWarframes.has(e.currentTarget.id)) {
            setScore(0);
            setClickedWarframes(new Set());
            setWrongClick(true);
        } else {
            newScore = score + 1;
            setScore(newScore);

            if (newScore > bestScore) {
                setBestScore(newScore);
            }
            setWrongClick(false);
            const updatedClicked = new Set(clickedWarframes);
            updatedClicked.add(e.currentTarget.id);
            setClickedWarframes(updatedClicked);
        }
        setClicked(true);

        // console.log(clickedWarframes);

        if (newScore == 10) setIsGameOver(true);
    }

    // warframe initial list render
    const [warframesRenderList, setWarframesRenderList] = useState([]);
    const [indexes, setIndexes] = useState(new Set());

    useEffect(() => {
        const values = Object.values(warframes);
        if (values.length === 0) return;

        // generate random 10 indexes to get from json
        while (indexes.size < 10) {
            const randomIndex = Math.floor(Math.random() * values.length);
            setIndexes(indexes.add(randomIndex));
        }
        setWarframesRenderList([...indexes].map((i) => values[i]));
    }, [warframes, indexes]);

    // shuffle warframes
    useEffect(() => {
        const values = Object.values(warframes);
        const newIndexes = shuffleSet(indexes);
        setWarframesRenderList([...newIndexes].map((i) => values[i]));
        setClicked(false);
    }, [clicked, indexes, warframes]);

    // game over logic
    const [isGameOver, setIsGameOver] = useState(false);

    function handleGameOver() {
        setScore(0);
        setBestScore(0);
        setClickedWarframes(new Set());
        setClicked(false);
        setWrongClick(false);
        setIndexes(new Set());
        setIsGameOver(false);
    }

    if (isGameOver) {
        return <RenderGameOver onClick={handleGameOver} />;
    }

    // main render
    return (
        <>
            <RenderGameInfo
                score={score}
                bestScore={bestScore}
                wrongClick={wrongClick}
            />
            <RenderList
                warframesList={warframesRenderList}
                handleClick={handleClickOnWarframe}
            />
        </>
    );
}

export default App;

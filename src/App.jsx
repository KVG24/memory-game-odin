import { useState, useEffect } from "react";
import "./App.css";
import RenderList from "./components/RenderList";
import RenderGameInfo from "./components/RenderGameInfo";
import shuffleSet from "./components/shuffleSet";

function App() {
    // click logic
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedWarframes, setClickedWarframes] = useState(new Set());
    const [clicked, setClicked] = useState(false);

    function handleClickOnWarframe(e) {
        if (clickedWarframes.has(e.currentTarget.id)) {
            setScore(0);
            setClickedWarframes(new Set());
        } else {
            const newScore = score + 1;
            setScore(newScore);

            if (newScore > bestScore) {
                setBestScore(newScore);
            }

            const updatedClicked = new Set(clickedWarframes);
            updatedClicked.add(e.currentTarget.id);
            setClickedWarframes(updatedClicked);
        }
        setClicked(true);
        // console.log(clickedWarframes);
    }

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

    // warframe initial list building
    const [warframesList, setWarframesList] = useState([]);
    const [indexes, setIndexes] = useState(new Set());

    useEffect(() => {
        const values = Object.values(warframes);
        if (values.length === 0) return;

        while (indexes.size < 10) {
            const randomIndex = Math.floor(Math.random() * values.length);
            setIndexes(indexes.add(randomIndex));
        }
        setWarframesList([...indexes].map((i) => values[i]));
    }, [warframes, indexes]);

    // shuffle warframes
    useEffect(() => {
        const values = Object.values(warframes);
        const newIndexes = shuffleSet(indexes);
        setWarframesList([...newIndexes].map((i) => values[i]));
        setClicked(false);
    }, [clicked, indexes, warframes]);

    return (
        <>
            <RenderGameInfo score={score} bestScore={bestScore} />
            <RenderList
                warframesList={warframesList}
                handleClick={handleClickOnWarframe}
            />
        </>
    );
}

export default App;

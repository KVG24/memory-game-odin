import { useState, useEffect, useMemo } from "react";
import "./App.css";
import RenderList from "./components/RenderList";
import RenderGameInfo from "./components/RenderGameInfo";

function App() {
    const [warframes, setWarframes] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedWarframes, setClickedWarframes] = useState(new Set());

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

        // console.log(clickedWarframes);
    }

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

    const memoizedWarframes = useMemo(() => warframes, [warframes]);

    return (
        <>
            <RenderGameInfo score={score} bestScore={bestScore} />
            <RenderList
                data={memoizedWarframes}
                handleClick={handleClickOnWarframe}
            />
        </>
    );
}

export default App;

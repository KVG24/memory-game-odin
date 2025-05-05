import { useState, useEffect, useMemo } from "react";
import "./App.css";
import RenderList from "./components/renderList";

function App() {
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

    const memoizedWarframes = useMemo(() => warframes, [warframes]);

    return (
        <>
            <RenderList data={memoizedWarframes} />
        </>
    );
}

export default App;

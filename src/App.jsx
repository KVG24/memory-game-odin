import { useState, useEffect } from "react";
import "./App.css";

function App() {
    return (
        <>
            <WarframesRenderList />
        </>
    );
}

export default App;

const WarframesRenderList = () => {
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

    return (
        <div className="warframe-list">
            {warframes.map((wf) => (
                <div key={wf.name} className="warframe-card">
                    <img
                        src={`src/assets/${wf.url}`}
                        alt={wf.name}
                        width={100}
                    />
                    <p>{wf.name}</p>
                </div>
            ))}
        </div>
    );
};

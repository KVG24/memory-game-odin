import { useState, useEffect } from "react";

export default function RenderList({ data }) {
    const [randomList, setRandomList] = useState([]);

    useEffect(() => {
        const values = Object.values(data);
        if (values.length === 0) return;

        const indexes = new Set();

        while (indexes.size < 10) {
            const randomIndex = Math.floor(Math.random() * values.length);
            indexes.add(randomIndex);
        }

        setRandomList([...indexes].map((i) => values[i]));
    }, [data]);

    console.log(randomList);

    return (
        <div className="warframe-list">
            {randomList.map((item) => (
                <div key={item.name} className="warframe-card">
                    <img
                        src={`src/assets/${item.url}`}
                        alt={item.name}
                        width={100}
                    />
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default function RenderList({ warframesList, handleClick }) {
    return (
        <div className="warframe-list">
            {warframesList.map((wf) => (
                <div
                    key={wf.name}
                    id={wf.name}
                    className="warframe-card"
                    onClick={handleClick}
                >
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
}

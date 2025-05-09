export default function RenderList({
    warframesList,
    handleClick,
    wrongClick,
    clickedWarframeName,
}) {
    return (
        <>
            <div className="warframe-list">
                {warframesList.map((wf) => (
                    <div
                        key={wf.name}
                        id={wf.name}
                        className="warframe-card"
                        onClick={() => {
                            handleClick(wf.name);
                        }}
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
            {wrongClick && (
                <p className="wrong-click-notification">
                    Clicked twice on{" "}
                    <span className="wrong-wf-name">{clickedWarframeName}</span>
                </p>
            )}
        </>
    );
}

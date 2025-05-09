export default function RenderGameInfo({ score, bestScore, regenerateList }) {
    return (
        <div className="game-info-container">
            <h1 className="game-name">Warframe Memory Game</h1>
            <p className="game-rules">
                Try to click on every Warframe once. Clicking on the same
                Warframe twice will reset the score
            </p>
            <div className="score-container">
                <p>Score: {score}</p>
                <p>Best score: {bestScore}</p>
            </div>
            <button
                type="button"
                className="regenerate-btn"
                onClick={regenerateList}
            >
                Regenerate list
            </button>
        </div>
    );
}

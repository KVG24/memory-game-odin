export default function RenderGameInfo({ score, wrongClick, bestScore }) {
    return (
        <div className="game-info-container">
            <h1>Warframe Memory Game</h1>
            <p>
                Try to click on every Warframe once. Clicking on the same
                Warframe twice will reset the score
            </p>
            <p>Score: {score}</p>
            <p>Best score: {bestScore}</p>
            {wrongClick && <p>Clicked twice on the same Warframe</p>}
        </div>
    );
}

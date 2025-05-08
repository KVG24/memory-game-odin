export default function RenderGameOver({ onClick }) {
    return (
        <>
            <div className="game-over">
                <h1 className="won-msg">You have won!</h1>
                <button onClick={onClick} type="button">
                    RESTART
                </button>
            </div>
        </>
    );
}

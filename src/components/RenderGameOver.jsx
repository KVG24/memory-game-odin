export default function RenderGameOver({ onClick }) {
    return (
        <>
            <h1>You have won!</h1>
            <button onClick={onClick} type="button">
                RESTART
            </button>
        </>
    );
}

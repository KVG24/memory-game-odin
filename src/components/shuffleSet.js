export default function shuffleSet(originalSet) {
    const array = Array.from(originalSet);

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return new Set(array);
}

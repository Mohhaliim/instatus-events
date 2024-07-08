function hashCode(str: string): number{
    let hash = 0;

    for(let i =0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }

    return hash
}

function getRandomColor(seed: number): string {
    const random = Math.abs(Math.sin(seed)) * 16777215;

    return `#${Math.floor(random).toString(16).padStart(6, '0')}`;
}

export function getRandomGradient(letter: string): string {
    const seed = hashCode(letter.toUpperCase());
    const color1 = getRandomColor(seed);
    const color2 = getRandomColor(seed + 1);

    return `linear-gradient(135deg, ${color1}, ${color2})`;
};
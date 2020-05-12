function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());

}

console.log(isMatching('Moscow', 'm1oscow'));
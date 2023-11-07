const p = console.log;
const raw = await Deno.readTextFile("8.in");
const entries = raw.trim().split(" ").map((e) => parseInt(e));
// p(entries);

const sum = (a: number, b: number): number => a + b;

let c = 0;
const parseNode = (entries: number[]): [number, number, number] => {
  const nodeNum = entries[0];
  const metaNum = entries[1];
  const meta: number[] = [];
  const p2sum: number[] = [];
  let cursor = 2;
  // p({entries, nodeNum, metaNum})
  for (let i = 0; i < nodeNum; i++) {
    const [c, m, p2] = parseNode(entries.slice(cursor));
    meta.push(m);
    p2sum.push(p2);
    // p({cursor, c})
    cursor += c;
  }
  const refs = entries.slice(cursor, cursor + metaNum);
  meta.push(...refs);
  if (nodeNum === 0) {
    return [cursor + metaNum, meta.reduce(sum), meta.reduce(sum)];
  } else {
    const part2 = refs.filter((e) => e <= nodeNum).map((e) => p2sum[e - 1])
      .reduce(sum, 0);
    // p({part2})
    return [cursor + metaNum, meta.reduce(sum), part2];
  }
};

p(parseNode(entries).slice(1));

const p = console.log;
const raw = await Deno.readTextFile("3.in");
const lines = raw.trim().split("\n");

const range = (start: number, end: number): number[] => {
  const ans: number[] = [];
  for (let i = start; i < end; i++) {
    ans.push(i);
  }
  return ans;
};

interface Cloth {
  id: string;
  coord: string[];
}

const parse = (lines: string[]) => {
  return lines.map((line) => {
    const match = line.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
    if (match === null) throw new Error("match problem");
    const coord = [];
    for (
      const x of range(
        parseInt(match[2]),
        parseInt(match[2]) + parseInt(match[4]),
      )
    ) {
      for (
        const y of range(
          parseInt(match[3]),
          parseInt(match[3]) + parseInt(match[5]),
        )
      ) {
        coord.push(JSON.stringify({ x, y }));
      }
    }
    return { id: match[1], coord } as Cloth;
  });
};

const part1 = (cloths: Cloth[]) => {
  const coords = cloths.map((c) => c.coord).flat();
  const matches = coords.reduce((acc, v) => {
    // p({acc, v})
    acc.set(v, (acc.get(v) ?? 0) + 1);
    return acc;
  }, new Map());
  let count = 0;
  matches.forEach((v) => {
    if (v >= 2) {
      count += 1;
    }
  });
  p(count);
};

const part2 = (cloths: Cloth[]) => {
  const dups = new Set();
  for (const cloth of cloths) {
    if (dups.has(cloth.id)) {
      continue;
    }
    const coords = new Set(cloth.coord);
    let found = true;
    for (const rest of cloths) {
      if (rest.id === cloth.id) {
        continue;
      }
      if (rest.coord.some((c) => coords.has(c))) {
        dups.add(rest.id);
        found = false;
        break;
      }
    }
    if (found) {
      p(cloth.id);
      break;
    }
  }
};

const cloths = parse(lines);
part1(cloths);
part2(cloths);

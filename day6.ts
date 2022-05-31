const p = console.log;
const raw = await Deno.readTextFile("6.in");
const lines = raw.trim().split("\n");
const safedistance = 10000;
const size = 900;
const coords = lines.map((
  line,
  i,
) => [...line.split(", ").map((e) => parseInt(e)), i + 1]);

const range = (start: number, end: number): number[] => {
  const ans: number[] = [];
  for (let i = start; i < end; i++) {
    ans.push(i);
  }
  return ans;
};

const manhatten = (x: number[], y: number[]): number => {
  return Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]);
};

const infinite = (coords: number[][]): Set<number> => {
  const max = coords.length;
  const borders: Set<number> = new Set();
  borders.add(0);
  coords[0].forEach((c) => borders.add(c));
  coords[max - 1].forEach((c) => borders.add(c));
  for (let i = 0; i < max; i++) {
    borders.add(coords[i][0]);
    borders.add(coords[i][max - 1]);
  }
  return borders;
};

const maxCount = <T>(input: Map<T, number>): number => {
  let max = 0;
  input.forEach((v) => max = Math.max(v, max));
  return max;
};

const buildGraph = (coords: number[][]) => {
  const max: number = size;
  const mark = [];
  for (const y of range(0, max)) {
    const row: number[] = [];
    mark.push(row);
    for (const x of range(0, max)) {
      const dist = coords.map(([a, b, c]) => [manhatten([x, y], [a, b]), c]);
      const min = Math.min(...dist.map(([a, b]) => a));
      const shortest = dist.filter(([a, b]) => a === min);
      if (shortest.length > 1) {
        // more than one matching the minimum distance
        row.push(0);
      } else {
        row.push(shortest[0][1]);
      }
    }
  }
  // p(mark.map(line => line.join('')).join('\n'))
  return mark;
};

const part1 = (coords: number[][]) => {
  const mark = buildGraph(coords);
  const exclude = infinite(mark);
  // p(exclude);
  const counts = mark.map((line) =>
    line
      .filter((c) => !exclude.has(c))
  ).flat()
    .reduce((acc, v) => {
      const count = acc.get(v) ?? 0;
      acc.set(v, count + 1);
      return acc;
    }, new Map());
  p(maxCount(counts));
};

const part2 = (coords: number[][]) => {
  const mark = buildGraph(coords);
  const exclude = infinite(mark);
  const reg = mark
    .map((line, cx) => {
      return line
        .map((cell, rx) => {
          const dist = coords.map(([a, b, c]) => manhatten([rx, cx], [a, b]))
            .reduce((a, b) => a + b);
          return dist < safedistance ? "#" : ".";
        });
    });
  p(
    reg.map((line) => line.filter((c) => c === "#").length).reduce((a, b) =>
      a + b
    ),
  );
};
part1(coords);
part2(coords);

const p = console.log;
const raw = await Deno.readTextFile("2.in");
const lines = raw.trim().split("\n");
const zip = (a: String[], b: String[]): [String, String][] =>
  a.map((v, i) => [v, b[i]]);

const part1 = (lines: String[]) => {
  let two = 0;
  let three = 0;
  for (const line of lines) {
    const count: Map<String, number> = new Map();
    line.split("").forEach((c) => count.set(c, (count.get(c) ?? 0) + 1));
    let isTwo = false;
    let isThree = false;
    count.forEach((v) => {
      if (v === 2) isTwo = true;
      if (v === 3) isThree = true;
    });
    if (isTwo) two += 1;
    if (isThree) three += 1;
  }
  p(two * three);
};

const part2 = (lines: String[]) => {
  const len = lines[0].length;
  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const curr = lines[i];
      const next = lines[j];
      const match = zip(curr.split(""), next.split("")).filter(([a, b]) =>
        a === b
      );
      if (match.length === len - 1) {
        p(match.map(([a, b]) => a).join(""));
        break;
      }
    }
  }
};

part1(lines);
part2(lines);

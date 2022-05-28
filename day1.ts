const p = console.log;
const raw = await Deno.readTextFile("1.in");
const lines = raw.trim().split("\n").map((s) => parseInt(s, 10));

const add = (a: number, b: number) => a + b;

const part1 = (lines: number[]) => {
  const ans = lines.reduce(add);
  p(ans);
};

const part2 = (lines: number[]) => {
  const occured: Set<number> = new Set();
  let found = false;
  let sum = 0;
  occured.add(sum);
  while (true) {
    for (const f of lines) {
      sum += f;
      if (occured.has(sum)) {
        found = true;
        p(sum);
        break;
      } else {
        occured.add(sum);
      }
    }
    if (found) break;
  }
};

part1(lines);
part2(lines);

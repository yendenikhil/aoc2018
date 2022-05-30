const p = console.log;
const raw = await Deno.readTextFile("5.in");

const min = (a: number, b: number) => Math.min(a, b);

const part1 = (input: string) => {
  let result = input;
  let len = result.length + 1;
  while (len > result.length) {
    const arr = result.split("");
    len = result.length;
    result = "";
    for (let i = 0; i < arr.length; i++) {
      const curr = arr[i];
      if (i === arr.length - 1) {
        result += curr;
        break;
      }
      const next = arr[i + 1];
      const a = curr.charCodeAt(0);
      const b = next.charCodeAt(0);
      if (a < 65 || b < 65) {
        p({ a, b, i });
      }
      if (Math.abs(a - b) === 32) {
        i += 1;
      } else {
        result += curr;
      }
    }
  }
  return len;
};

const part2 = (input: string) => {
  const space = "abcdefghijklmnopqrstuvwxyz".split("");
  return space.map((l) =>
    input.replaceAll(l, "").replaceAll(l.toUpperCase(), "")
  )
    .map((s) => part1(s))
    .reduce(min);
};

p(part1(raw.trim()));
p(part2(raw.trim()));

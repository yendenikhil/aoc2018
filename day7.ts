import { delay } from "https://deno.land/std@0.142.0/async/mod.ts";
const p = console.log;
const raw = await Deno.readTextFile("7.in");
const numOfThreads = 5;
const fixed = 60;
const lines = raw.trim().split("\n");

const parse = (
  input: string[],
): [Map<string, string[]>, Map<string, number>, string[]] => {
  const count: Map<string, number> = new Map();
  const map: Map<string, string[]> = new Map();
  lines
    .map((line) =>
      line.replace("Step ", "").replace(" must be finished before step ", "")
        .replace(" can begin.", "").split("")
    ).forEach(([k, v]) => {
      const val = map.get(k) ?? [];
      val.push(v);
      val.sort();
      const c = count.get(v) ?? 0;
      count.set(v, c + 1);
      if (count.get(k) === undefined) count.set(k, 0);
      map.set(k, val);
    });
  const Q: string[] = [];
  count.forEach((v, k) => {
    if (v === 0) Q.push(k);
  });
  // p({ map, count, Q });
  return [map, count, Q];
};

const part1 = (input: string[]) => {
  const [map, count, Q] = parse(input);
  let ans = "";
  while (Q.length > 0) {
    Q.sort();
    const curr = Q.shift();
    if (curr === undefined) {
      p("error");
      break;
    }
    ans += curr;
    const vals = map.get(curr);
    if (vals === undefined) break;

    vals.forEach((v) => {
      count.set(v, (count.get(v) ?? 0) - 1);
      if ((count.get(v) ?? 1000) === 0) {
        Q.push(v);
      }
    });
  }
  p(ans);
};

const part2 = (input: string[]) => {
  const [map, count, Q] = parse(input);
  const EV: [string, number][] = [];
  let ans = 0;
  const start_work = () => {
    while (EV.length < numOfThreads && Q.length > 0) {
      Q.sort();
      const curr = Q.shift();
      if (curr === undefined) {
        p("error");
        break;
      }
      EV.push([curr, ans + fixed + curr.charCodeAt(0) - 64]);
    }
    // EV.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
  };
  start_work();
  while (EV.length > 0) {
    // EV.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
    EV.sort((a, b) => a[1] - b[1]);
    const curr = EV.shift();
    if (curr === undefined) {
      p("err");
      break;
    }
    ans = curr[1];
    const vals = map.get(curr[0]);
    if (vals === undefined) break;
    vals.forEach((v) => {
      count.set(v, (count.get(v) ?? 0) - 1);
      if ((count.get(v) ?? 1000) === 0) {
        Q.push(v);
      }
    });
    start_work();
    // p({curr,vals, Q, EV})
  }
  p(ans);
};

part1(lines);
part2(lines);

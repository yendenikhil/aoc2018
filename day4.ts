const p = console.log;
const raw = await Deno.readTextFile("4.in");
const lines = raw.trim().split("\n");
lines.sort();

const groupByCount = <T>(list: T[]): Map<T, number> => {
  const ans: Map<T, number> = new Map();
  list.forEach((item) => {
    const val = ans.get(item) ?? 0;
    ans.set(item, val + 1);
  });
  return ans;
};

const largestInMapByValue = <T>(input: Map<T, number>): [T, number] => {
  let most = 0;
  let ans: T | undefined = undefined;
  input.forEach((v, k) => {
    if (most < v) {
      most = v;
      ans = k;
    }
  });
  if (ans === undefined) throw new Error("no values found");
  return [ans, most];
};

const range = (start: number, end: number): number[] => {
  const ans: number[] = [];
  for (let i = start; i < end; i++) {
    ans.push(i);
  }
  return ans;
};

const parse = (lines: string[]) => {
  let guard = 0;
  let start = 0;
  const sched = new Map();
  lines.map((line) => {
    const [time, text] = line.replace("[", "").split("] ");
    if (text.startsWith("Guard")) {
      guard = parseInt(
        text.replace("Guard #", "").replace(" begins shift", ""),
      );
    } else {
      if (text === "falls asleep") {
        start = parseInt(time.replace(/.*:/, ""));
      } else if (text === "wakes up") {
        const end = parseInt(time.replace(/.*:/, ""));
        const sleeps = sched.get(guard) ?? [];
        sleeps.push(...range(start, end));
        sched.set(guard, sleeps);
      }
    }
  });
  // sched.forEach((v, k) => p({k, v}))
  return sched;
};

const part1 = (sched: Map<string, number[]>) => {
  let most = 0;
  let sleep: number[] = [];
  let id = "";
  sched.forEach((v, k) => {
    if (v.length > most) {
      most = v.length;
      sleep = v;
      id = k;
    }
  });
  const [minute, count] = largestInMapByValue(groupByCount(sleep));
  p(parseInt(id) * minute);
};
const part2 = (sched: Map<string, number[]>) => {
  let id = "";
  let minute = 0;
  let most = 0;
  sched.forEach((v, k) => {
    const [m, count] = largestInMapByValue(groupByCount(v));
    if (count > most) {
      most = count;
      id = k;
      minute = m;
    }
  });
  // p({id, minute, most})
  p(parseInt(id) * minute);
};

const sched = parse(lines);
part1(sched);
part2(sched);

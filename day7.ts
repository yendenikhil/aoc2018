const p = console.log;
const raw = await Deno.readTextFile("7.1.in");
const lines = raw.trim().split("\n");

class PrioQueue<T> {
  comp: (a: T, b: T) => number;
  queue: T[];
  constructor(comp: (a: T, b: T) => number) {
    this.comp = comp;
    this.queue = [];
  }
  push(item: T): void {
    if (this.queue.includes(item)) return;
    this.queue.push(item);
    this.queue.sort(this.comp);
  }
  isPresent(): boolean {
    return this.queue.length > 0;
  }

  next(): T {
    if (this.queue.length > 0) {
      const item = this.queue.shift();
      if (item) return item;
      throw new Error("no items found");
    } else {
      throw new Error("empty list");
    }
  }
}

const part1 = (input: string[]) => {
  // build map
  const map: Map<string, string[]> = lines
    .map((line) =>
      line.replace("Step ", "").replace(" must be finished before step ", "")
        .replace(" can begin.", "")
    )
    .reduce((acc, v) => {
      const next = acc.get(v[0]) ?? [];
      next.push(v[1]);
      next.sort();
      acc.set(v[0], next);
      return acc;
    }, new Map());
  p(map);
  // find starting points
  const visited: Set<string> = new Set()
  const pq: PrioQueue<string> = new PrioQueue<string>((a: string, b: string) => a.charCodeAt(0) - b.charCodeAt(0))
  const start = [...map.keys()].filter(k => ready(k, visited, map))
  start.forEach(k => pq.push(k))
  let ans = ""
  while(pq.isPresent()) {
    const curr = pq.next()
    if (visited.has(curr) )
      continue
    ans += curr
    const next = map.get(curr)
    if (next === undefined) 
    continue
    visited.add(curr)
    next.filter(k => ready(k, visited, map)).forEach(k => pq.push(k))
    // p({curr, visited, next, pq})
  }
  p(ans)
};

const ready = (
  curr: string,
  visited: Set<string>,
  map: Map<string, string[]>,
): boolean => {
  let isready = true;
  if (visited.has(curr)) {
    return false
  } else {
    map.forEach((v, k) => {
      if (!visited.has(k) && v.includes(curr)) isready = false;
    });
  }
  return isready;
};

const dfs = (curr: string, map: Map<string, string[]>): string => {
  const list = map.get(curr);
  let ans = curr;
  // p({curr, map, list})
  if (list === undefined || list.length === 0) {
    return ans;
  }
  while (true) {
    const next = list.shift();
    let found = false;
    if (next === undefined) return ans;
    map.forEach((arr) => {
      if (arr.includes(next)) found = true;
    });
    if (!found) {
      ans += dfs(next, map);
    }
  }

  return ans;
};

part1(lines);

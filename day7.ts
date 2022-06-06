import { delay } from "https://deno.land/std@0.142.0/async/mod.ts";
const p = console.log;
const raw = await Deno.readTextFile("7.1.in");
const lines = raw.trim().split("\n");

class PrioQueue<T> {
  comp: (a: T, b: T) => number;
  queue: T[];
  autosort: boolean
  constructor(comp: (a: T, b: T) => number, autosort = true) {
    this.comp = comp;
    this.queue = [];
    this.autosort = autosort
  }
  push(item: T): void {
    if (this.queue.includes(item)) return;
    this.queue.push(item);
    if (this.autosort)
      this.queue.sort(this.comp);
  }
  isPresent(): boolean {
    return this.queue.length > 0;
  }
  sort(): void {
    this.queue.sort(this.comp)
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

const part1 = async (input: string[]) => {
  // build map
  const map: Map<string, string[]> = lines
    .map((line) =>
      line.replace("Step ", "").replace(" must be finished before step ", "")
        .replace(" can begin.", "")
    )
    .reduce((acc, v) => {
      const next = acc.get(v[1]) ?? [];
      next.push(v[0]);
      next.sort();
      acc.set(v[1], next);
      return acc;
    }, new Map());
  // add starting points
  map.forEach((v, k) => {
    v.filter((e) => !map.has(e)).forEach((e) => map.set(e, []));
  });
  p(map);
  const visited: Set<string> = new Set();
  const pq: PrioQueue<string> = new PrioQueue<string>((a: string, b: string) =>
    a.charCodeAt(0) - b.charCodeAt(0), false
  );
  map.forEach((v, k) => pq.push(k))
  pq.sort()
  let ans = ""
  while(pq.isPresent() && visited.size < map.size){
    const curr = pq.next()
    const req = map.get(curr) ?? []
    // p({curr, req})
    // await delay(1000)
    if (!req.some(e => !visited.has(e))) {
      ans += curr
      visited.add(curr)
      pq.sort()
    } else {
      pq.push(curr)
    }
  }
  p(ans)
};

await part1(lines);

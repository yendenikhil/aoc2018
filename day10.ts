const p = console.log;
const raw = await Deno.readTextFile("10.in");
const lines = raw.trim().split("\n");
const max = (a: number, b: number) => a > b ? a : b;
const min = (a: number, b: number) => a < b ? a : b;
const re = new RegExp(
  /position=< ?(-?\d+), *(-?\d+)> velocity=< ?(-?\d+), *(-?\d+)/,
);

const points = lines.map((line) => line.match(re))
  .map((m) => {
    if (m !== null) {
      return m.slice(1).map((e) => parseInt(e));
    } else {
      return [];
    }
  });
const plot = (points: number[][]) => {
  const maxx = points.map((p) => p[0]).reduce(max);
  const minx = points.map((p) => p[0]).reduce(min);
  const maxy = points.map((p) => p[1]).reduce(max);
  const miny = points.map((p) => p[1]).reduce(min);
  const area: string[][] = [];
  const lenx = maxx - minx + 1;
  const leny = maxy - miny + 1;
  // p({minx, maxx, lenx, miny, maxy, leny})
  for (let i = 0; i < leny; i++) {
    area.push([]);
    for (let j = 0; j < lenx; j++) {
      area[i].push(".");
    }
  }
  points.forEach(([x, y]) => {
    // p({x, y, dx: x - minx , dy: y - miny })
    area[y - miny][x - minx] = "#";
  });
  const draw = area.map((line) => line.join("")).join("\n");
  p(draw);
};

const step = (points: number[][]) => {
  return points.map(([x, y, dx, dy]) => [x + dx, y + dy, dx, dy]);
};

let currPos = points.slice().map((line) => line.slice());
const box: [number, number[][]][] = [];
for (let i = 0; i < 11000; i++) {
  const maxx = currPos.map((p) => p[0]).reduce(max);
  const minx = currPos.map((p) => p[0]).reduce(min);
  const maxy = currPos.map((p) => p[1]).reduce(max);
  const miny = currPos.map((p) => p[1]).reduce(min);
  box.push([
    Math.pow(Math.pow(maxx - minx, 2) + Math.pow(maxy - miny, 2), 0.5),
    currPos,
  ]);
  currPos = step(currPos);
}
const ans = box.reduce((acc, v) => acc[0] < v[0] ? acc : v);
const sec = box.map((e, i) => [e[0], i]).filter((e) => e[0] === ans[0])[0][1];
plot(ans[1]);
p({ part2: sec });

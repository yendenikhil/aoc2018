const p = console.log;

const serial = 5791;
// const serial = 18;

const power = (x: number, y: number) => {
  const rackId = x + 10;
  const plevel = ((rackId * y) + serial) * rackId;
  const hundred = Math.floor(plevel / 100) % 10;
  return hundred - 5;
};
const solve = (min: number, max: number) => {
  // summed areas
  const area: number[][] = [];
  area.push([]);
  for (let i = 0; i <= 300; i++) area[0].push(0);

  for (let y = 1; y <= 300; y++) {
    area.push([0]);
    for (let x = 1; x <= 300; x++) {
      area[y][x] = power(x, y) + area[y - 1][x] + area[y][x - 1] -
        area[y - 1][x - 1];
    }
  }
  let best = 0;
  let dx = 0;
  let dy = 0;
  let ds = 0;
  for (let s = min; s <= max; s++) {
    for (let y = 1; y <= 300; y++) {
      for (let x = 1; x <= 300; x++) {
        if (x - s < 0 || y - s < 0) continue;
        const total = area[y][x] - area[y - s][x] - area[y][x - s] +
          area[y - s][x - s];
        if (total > best) {
          best = total;
          dx = x - s + 1;
          dy = y - s + 1;
          ds = s;
        }
      }
    }
  }
  if (min === 3 && max === 3) {
    p(`${dx},${dy}`);
  } else {
    p(`${dx},${dy},${ds}`);
  }
};
solve(3, 3);
solve(1, 300);

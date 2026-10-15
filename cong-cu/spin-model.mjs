// Independent model of the observed spin timeline (parameters measured from the site, code written from scratch).
const fps = 60, spinTime = 10, idle = 0.005, accel = 0.6 / fps, endSpeed = 1.5e-4;
const accelTicks = Math.min(fps, (spinTime * fps) / 3);       // 60
const decelTicks = spinTime * fps - accelTicks;                 // 540
let speed = idle, turnsAccel = 0, t = 0;
for (; t <= accelTicks; t++) { turnsAccel += speed; speed += accel; } // ~61 ticks of acceleration
const v0 = accel * (accelTicks + 1);
const factor = Math.exp(Math.log(endSpeed / (idle + (accelTicks + 1) * accel)) / decelTicks);
let v = v0, turnsDecel = 0;
for (let i = 0; i < decelTicks; i++) { turnsDecel += v; v *= factor; }
const rad2turn = (r) => r / (2 * Math.PI);
console.log({ accelTicks, decelTicks, peakSpeedRadPerTick: +v0.toFixed(3), peakRevPerSec: +(v0 * fps / (2 * Math.PI)).toFixed(2),
  decayPerTick: +factor.toFixed(5), turnsWhileAccelerating: +rad2turn(turnsAccel).toFixed(2), turnsWhileDecelerating: +rad2turn(turnsDecel).toFixed(2) });
// Uniformity check: final angle = (U*2π + constant) mod 2π, so winners are uniform for equal slices.
const n = 8, N = 200000, hits = new Array(n).fill(0), C = turnsDecel;
for (let i = 0; i < N; i++) { const a = ((Math.random() * 2 * Math.PI + C) % (2 * Math.PI)); hits[Math.round(a / (2 * Math.PI / n)) % n]++; }
console.log("share per entry (8 entries, 200k simulated spins):", hits.map((h) => (h / N * 100).toFixed(2) + "%").join(" "));

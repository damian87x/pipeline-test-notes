const STEPS = [3, 2, 1, 0];

// Calls onTick with 3, 2, 1, 0 once per second, then onExpire one second later.
// Returns cancel(), which stops the countdown so neither onTick nor onExpire fires again.
export function startUndo(onTick, onExpire) {
  let i = 0;
  onTick(STEPS[0]);
  const timer = setInterval(() => {
    i += 1;
    if (i < STEPS.length) {
      onTick(STEPS[i]);
    } else {
      clearInterval(timer);
      onExpire();
    }
  }, 1000);
  return () => clearInterval(timer);
}

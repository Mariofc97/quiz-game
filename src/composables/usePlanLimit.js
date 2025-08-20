const LIMITS = { basic: 2, pro: Infinity };

export function usePlanLimit() {
  const readLogged = () =>
    JSON.parse(localStorage.getItem("loggedInUser") || "null");

  const persistUser = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const idx = users.findIndex((u) => u.username === user.username);
    if (idx !== -1) {
      users[idx] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const triesLeft = (user) => {
    const plan = user?.plan || "basic";
    const used = Number(user?.quizzesUsed || 0);
    const limit = LIMITS[plan];
    if (!isFinite(limit)) return Infinity;
    return Math.max(0, limit - used);
  };

  const canStartQuiz = () => {
    const u = readLogged();
    if (!u) return { ok: false, reason: "not-logged" };
    const left = triesLeft(u);
    if (left === Infinity) return { ok: true, user: u, left };
    if (left <= 0)
      return { ok: false, reason: "limit-reached", user: u, left: 0 };
    return { ok: true, user: u, left };
  };

  const markQuizCompleted = () => {
    const u = readLogged();
    if (!u) return null;
    u.quizzesUsed = Number(u.quizzesUsed || 0) + 1;
    persistUser(u);
    return u;
  };

  const updatePlan = (plan) => {
    const u = readLogged();
    if (!u) return null;
    u.plan = plan;
    persistUser(u);
    return u;
  };

  return {
    LIMITS,
    readLogged,
    persistUser,
    triesLeft,
    canStartQuiz,
    markQuizCompleted,
    updatePlan,
  };
}

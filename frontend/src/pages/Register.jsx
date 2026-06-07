function Register() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-card backdrop-blur md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Phase 1</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink">Register</h1>
        <p className="mt-4 text-lg text-slate-600">
          This is a UI-only registration page for the foundation phase.
        </p>
        <form className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="block md:col-span-1">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Full Name</span>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-ember"
            />
          </label>
          <label className="block md:col-span-1">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-ember"
            />
          </label>
          <label className="block md:col-span-1">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-ember"
            />
          </label>
          <label className="block md:col-span-1">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
            </span>
            <input
              type="password"
              placeholder="Repeat your password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-ember"
            />
          </label>
          <button
            type="button"
            className="md:col-span-2 w-full rounded-full bg-ember px-6 py-3 text-sm font-bold text-white"
          >
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;

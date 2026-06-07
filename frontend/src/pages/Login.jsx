function Login() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-card backdrop-blur md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slateblue">
          Phase 1
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink">Login</h1>
        <p className="mt-4 text-lg text-slate-600">
          This is a UI-only authentication page for the foundation phase.
        </p>
        <form className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slateblue"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slateblue"
            />
          </label>
          <button
            type="button"
            className="w-full rounded-full bg-slateblue px-6 py-3 text-sm font-bold text-white"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;

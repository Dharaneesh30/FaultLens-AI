import { useState } from "react";
import { detectRequirementConflict } from "../services/api";

const initialRequirementA =
  "The system must allow users to reset their password through email verification.";
const initialRequirementB =
  "The system must prevent users from resetting their password through email verification.";

function ConflictDetection() {
  const [requirementA, setRequirementA] = useState(initialRequirementA);
  const [requirementB, setRequirementB] = useState(initialRequirementB);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await detectRequirementConflict(requirementA, requirementB);
      setResult(response);
    } catch (error) {
      setErrorMessage("The requirements could not be checked for conflict right now.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-card backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Phase 3</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink">
            Conflict Detection
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Compare two requirements and check whether they contradict each other.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Requirement A
              </span>
              <textarea
                value={requirementA}
                onChange={(event) => setRequirementA(event.target.value)}
                rows="6"
                className="w-full rounded-3xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-ember"
                placeholder="Enter the first requirement..."
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Requirement B
              </span>
              <textarea
                value={requirementB}
                onChange={(event) => setRequirementB(event.target.value)}
                rows="6"
                className="w-full rounded-3xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-ember"
                placeholder="Enter the second requirement..."
              />
            </label>

            <button
              type="submit"
              disabled={isLoading || !requirementA.trim() || !requirementB.trim()}
              className="rounded-full bg-ember px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Checking..." : "Detect Conflict"}
            </button>
          </form>

          {errorMessage ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-card backdrop-blur">
          <h2 className="font-display text-3xl font-bold text-ink">Conflict Result</h2>
          <p className="mt-3 text-slate-600">
            Submit both requirements to see whether a conflict is detected and why.
          </p>

          {result ? (
            <div className="mt-8 space-y-5">
              <div className="rounded-3xl bg-sand p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                  Requirement A
                </p>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {result.original_requirement_a}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Cleaned: {result.cleaned_requirement_a}
                </p>
              </div>

              <div className="rounded-3xl bg-mist p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                  Requirement B
                </p>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {result.original_requirement_b}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Cleaned: {result.cleaned_requirement_b}
                </p>
              </div>

              <div
                className={`rounded-3xl border p-5 ${
                  result.conflict_detected
                    ? "border-rose-200 bg-rose-50"
                    : "border-emerald-200 bg-emerald-50"
                }`}
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                  Decision
                </p>
                <p
                  className={`mt-2 font-display text-3xl font-bold ${
                    result.conflict_detected ? "text-rose-700" : "text-emerald-700"
                  }`}
                >
                  {result.conflict_detected ? "Conflict Detected" : "No Conflict"}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{result.reasoning}</p>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-8 text-slate-500">
              No comparison result yet. Use the example requirements or enter your own.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ConflictDetection;

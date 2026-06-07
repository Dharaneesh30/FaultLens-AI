import { useState } from "react";
import { classifyRequirement } from "../services/api";

const exampleRequirement =
  "The system must encrypt user passwords and require secure authentication for login.";

function Classification() {
  const [requirementText, setRequirementText] = useState(exampleRequirement);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await classifyRequirement(requirementText);
      setResult(response);
    } catch (error) {
      setErrorMessage("The requirement could not be classified right now.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-card backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slateblue">
            Phase 2
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink">
            Requirement Classification
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Enter a requirement to classify it as Functional, Non-Functional,
            Security, Performance, or Usability.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Requirement Text
              </span>
              <textarea
                value={requirementText}
                onChange={(event) => setRequirementText(event.target.value)}
                rows="8"
                className="w-full rounded-3xl border border-slate-200 px-4 py-4 text-base outline-none transition focus:border-slateblue"
                placeholder="Enter a software requirement here..."
              />
            </label>
            <button
              type="submit"
              disabled={isLoading || !requirementText.trim()}
              className="rounded-full bg-slateblue px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Classifying..." : "Classify Requirement"}
            </button>
          </form>

          {errorMessage ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-card backdrop-blur">
          <h2 className="font-display text-3xl font-bold text-ink">Classification Result</h2>
          <p className="mt-3 text-slate-600">
            Submit a requirement to view the original text, cleaned text, and predicted
            category.
          </p>

          {result ? (
            <div className="mt-8 space-y-5">
              <div className="rounded-3xl bg-sand p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                  Original Text
                </p>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {result.original_text}
                </p>
              </div>

              <div className="rounded-3xl bg-mist p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                  Cleaned Text
                </p>
                <p className="mt-2 text-base leading-7 text-slate-700">
                  {result.cleaned_text}
                </p>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-white p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                  Predicted Category
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-slateblue">
                  {result.predicted_category}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{result.reasoning}</p>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-8 text-slate-500">
              No classification result yet. Use the example requirement or enter your own.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Classification;

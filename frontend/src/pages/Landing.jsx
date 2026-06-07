import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackendStatusBadge from "../components/BackendStatusBadge";
import FeatureCard from "../components/FeatureCard";
import { checkBackendHealth } from "../services/api";

const featureCards = [
  "Requirement Classification",
  "Conflict Detection",
  "Ambiguity Detection",
  "Missing Requirement Analysis",
  "Quality Scoring",
  "AI Review Copilot",
];

function Landing() {
  const [backendStatus, setBackendStatus] = useState({
    state: "offline",
    message: "Checking connection...",
  });

  useEffect(() => {
    async function loadBackendStatus() {
      try {
        const response = await checkBackendHealth();
        setBackendStatus({
          state: "online",
          message: response.message,
        });
      } catch (error) {
        setBackendStatus({
          state: "offline",
          message: "Backend unreachable",
        });
      }
    }

    loadBackendStatus();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-slateblue">
            Intelligent Requirements Analysis
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-tight text-ink md:text-6xl">
            FaultLens AI
          </h1>
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold text-slate-700 md:text-3xl">
            Prevent Requirement Errors Before Development Starts
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Detect requirement conflicts, ambiguities, missing requirements, and quality
            issues using AI-powered analysis and local AI review assistance.
          </p>
          <div className="mt-8">
            <BackendStatusBadge
              status={backendStatus.state}
              message={backendStatus.message}
            />
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/classification"
              className="rounded-full bg-slateblue px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-300/60 transition hover:-translate-y-0.5"
            >
              Continue as Guest
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-slateblue px-6 py-3 text-center text-sm font-bold text-slateblue transition hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-ember px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-orange-300/60 transition hover:-translate-y-0.5"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/80 bg-white/80 p-8 shadow-card backdrop-blur">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
            Why Teams Need It
          </p>
          <div className="mt-6 space-y-4 text-slate-700">
            <p>
              Requirements often look complete on the surface, but hidden ambiguity and
              contradiction create expensive rework later.
            </p>
            <p>
              FaultLens AI gives teams an early review layer so analysts, developers, and
              stakeholders can align before coding begins.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featureCards.map((title) => (
          <FeatureCard
            key={title}
            title={title}
            description={`Phase-based support for ${title.toLowerCase()} with a beginner-friendly, modular architecture.`}
          />
        ))}
      </div>
    </section>
  );
}

export default Landing;

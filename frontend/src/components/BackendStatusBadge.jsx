function BackendStatusBadge({ status, message }) {
  const online = status === "online";

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm ${
        online
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-rose-200 bg-rose-50 text-rose-700"
      }`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${online ? "bg-emerald-500" : "bg-rose-500"}`}
      />
      <span>
        Backend Status: {online ? "Online" : "Offline"}
        {message ? ` - ${message}` : ""}
      </span>
    </div>
  );
}

export default BackendStatusBadge;

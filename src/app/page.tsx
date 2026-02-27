import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans p-8">
      <h1 className="text-4xl font-bold mb-4">AI Rubber Duck Challenge</h1>
      <p className="text-zinc-400 mb-12 max-w-lg text-center">
        This is the "Controllable Proof" live experiment domain. Traffic is driven to the two variants below, and the <code>improve.delights.pro</code> engine autonomously optimizes them.
      </p>

      <div className="flex gap-6">
        <Link
          href="/ugly"
          className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-[0_0_20px_rgba(220,38,38,0.4)]"
        >
          View Page A (Ugly)
        </Link>
        <Link
          href="/pretty"
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]"
        >
          View Page B (Pretty)
        </Link>
      </div>
    </div>
  );
}

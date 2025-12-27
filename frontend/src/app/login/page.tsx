import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-construction-darker flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">
          Login page coming soon
        </h1>
        
        <Link
          href="/"
          className="inline-block bg-construction-yellow text-construction-darker px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-construction-darker flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-gray-100 mb-4">
          Hard Hat Mystery
        </h1>
        <p className="text-2xl text-construction-yellow mb-12">
          A Rylanda Albertina Mystery
        </p>
        
        <div className="space-y-4">
          <Link
            href="/game"
            className="block w-full max-w-md mx-auto bg-construction-yellow text-construction-darker px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors"
          >
            Start Investigation
          </Link>
          
          <Link
            href="/login"
            className="block w-full max-w-md mx-auto bg-construction-dark text-gray-100 px-8 py-4 rounded-lg font-semibold text-lg border border-gray-600 hover:bg-gray-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

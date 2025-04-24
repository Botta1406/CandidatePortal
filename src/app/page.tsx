// app/page.tsx
export default function Home() {
  return (
      <main className="text-center mt-10">
        <h1 className="text-3xl font-bold">Welcome to Candidate Portal</h1>
        <p className="mt-4">Please <a href="/login" className="text-blue-600 underline">login</a> to continue.</p>
      </main>
  );
}

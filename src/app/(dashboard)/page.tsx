const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function HomePage() {
  await sleep(1500);

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">Home Page</h1>
      <div className="border-2 p-6">
        <p className="text-lg text-gray-700">
          Welcome to your Neobrutalism CMS Dashboard!
        </p>
      </div>
    </div>
  );
}

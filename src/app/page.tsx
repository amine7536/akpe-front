type BackendResponse = {
  service: string;
  [key: string]: unknown;
};

async function fetchBackend(url: string): Promise<BackendResponse | { error: string }> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    return await res.json();
  } catch (e) {
    return { error: `Failed to fetch ${url}: ${e}` };
  }
}

export default async function Home() {
  const backend1Url = process.env.BACKEND_1_URL || "http://localhost:8081";
  const backend2Url = process.env.BACKEND_2_URL || "http://localhost:8082";

  const [backend1Data, backend2Data] = await Promise.all([
    fetchBackend(`${backend1Url}/items`),
    fetchBackend(`${backend2Url}/data`),
  ]);

  return (
    <main style={{ fontFamily: "monospace", padding: "2rem" }}>
      <h1>Preview Envs - Front</h1>

      <section>
        <h2>Backend 1 (Postgres)</h2>
        <pre>{JSON.stringify(backend1Data, null, 2)}</pre>
      </section>

      <section>
        <h2>Backend 2 (External API)</h2>
        <pre>{JSON.stringify(backend2Data, null, 2)}</pre>
      </section>
    </main>
  );
}

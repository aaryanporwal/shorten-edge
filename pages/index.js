import Head from "next/head";
import Link from "next/link";
import { useState, React } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState(null);

  return (
    <div className="mt-8">
      <Head>
        <title>URL Shortener by Aaryan!</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔗</text></svg>"
        />
        <meta
          name="description"
          content="URL shortener using vercel edge functions and redis, made by Aaryan Porwal"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          async
          defer
          data-website-id="b692d0d7-237c-4fea-8e85-d8ebd93a3dfd"
          src="https://umami.blog.aaryanporwal.com/umami.js"
        ></script>
      </Head>
      <h1 className=" text-white text-3xl text-center">
        URL Shortening service using{" "}
        <a
          href="https://vercel.com/features/edge-functions"
          target={"_blank"}
          rel="noopener noreferrer"
          className=" bg-orange-400 text-white px-1 rounded-lg hover:text-black hover:underline"
        >
          Vercel Edge
        </a>{" "}
        functions and{" "}
        <a
          href="https://upstash.com"
          target={"_blank"}
          rel="noopener noreferrer"
          className="bg-red-500 text-white px-1 rounded-lg hover:text-black hover:underline"
        >
          Redis
        </a>
        .
      </h1>
      <div className="mt-20 mx-auto sm:w-full sm:max-w-lg px-2 sm:px-0 sm:block">
        <div className="shadow-xl bg-purple-600 py-8 px-6 rounded-lg sm:px-10">
          <form
            className="mb-0 space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: value }),
              });
              const data = await response.json();
              setShortUrl(
                `${document.location.protocol}//${document.location.host}/${data.short}`
              );
            }}
          >
            <div className="shadow-xl mt-1 flex items-center bg-purple-400 rounded-lg ">
              <label
                htmlFor="url"
                className="w-20 text-right mr-8 text-purple-200"
              >
                URL
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg outline-none text-white shadow-sm bg-transparent focus:border-indigo-500 focus:ring-[2px] focus:ring-pink-500 placeholder-purple-200"
                type="url"
                required
                value={value}
                placeholder="https://blog.aaryanporwal.com"
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <button
              className="rounded-lg bg-pink-400 py-3 text-white font-bold shadow-xl w-full"
              type="submit"
            >
              Shorten!
            </button>
          </form>
          {shortUrl ? (
            <div className="mt-5 text-gray-200">
              Your shortened URL:{" "}
              <a
                className="inline-block rounded-lg bg-indigo-500 py-1 px-1 text-white underline hover:decoration-wavy hover:decoration-pink-500 hover:text-black"
                href={shortUrl}
              >
                {shortUrl}
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <footer className="w-full text-[#747369] absolute bottom-5 mt-8 mb-4 bg-[#393939] text-center">
        <div className="">
          <span className="copyright">
            © {new Date().getFullYear()} Aaryan Porwal 🔗 -{" "}
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
              CC BY 4.0
            </a>
            <a href="https://github.com/aaryanporwal" className="px-2">
              <svg
                className="inline-block"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>{" "}
          </span>
        </div>
        <span className="gopher" title="Wheeeee!"></span>
      </footer>
    </div>
  );
}

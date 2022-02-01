import Head from "next/head";
import Link from "next/link";
import { useState, React } from "react";
// import useWindowSize from "react-use/lib/useWindowSize";
// import Confetti from "react-confetti";

export default function Home() {
  const [value, setValue] = useState("https://blog.aaryanporwal.com");
  const [shortUrl, setShortUrl] = useState(null);

  return (
    <div>
      {shortUrl ? (
        <div>
          <a href={shortUrl}>{shortUrl}</a>
        </div>
      ) : (
        <form
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
          <input
            type="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Shorten!</button>
        </form>
      )}
    </div>
  );
}

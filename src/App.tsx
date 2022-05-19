import { Component, createSignal, Show } from "solid-js";

import styles from "./App.module.css";

import { BACKEND_URL } from "./lib/constants";

const App: Component = () => {
  const [link, setLink] = createSignal<string>("");
  const [shortUrl, setShortUrl] = createSignal<string>();

  const getShortUrl = async () => {
    const data = {
      url: link(),
    };
    const resp = await fetch(`${BACKEND_URL}/api/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await resp.json();
    setShortUrl(json.url);
  };
  const handleSubmit = () => {
    getShortUrl();
  };
  return (
    <div class={styles.App}>
      <div>
        <input
          type="text"
          onChange={(event) => setLink(event.currentTarget.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <Show when={shortUrl()}>
        <div>
          <a href={`${BACKEND_URL}/${shortUrl()}`} target="_BLANK">
            {`${BACKEND_URL}/${shortUrl()}`}
          </a>
        </div>
      </Show>
    </div>
  );
};

export default App;
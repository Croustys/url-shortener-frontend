import { Component, createSignal, Show } from "solid-js";

import "./app.css";

import { BACKEND_URL } from "./lib/constants";

const App: Component = () => {
  const [link, setLink] = createSignal<string>("");
  const [shortUrl, setShortUrl] = createSignal<string>();

  const getShortUrl = async () => {
    const data = {
      url: link(),
    };
    const resp = await fetch(`${BACKEND_URL}`, {
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
    <div class="wrapper">
      <input
        type="text"
        id="main-input"
        onChange={(event) => setLink(event.currentTarget.value)}
      />
      <button id="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
      <Show when={shortUrl()}>
        <div>
          <a href={`${BACKEND_URL}?r=${shortUrl()}`} target="_BLANK">
            {`${BACKEND_URL}?r=${shortUrl()}`}
          </a>
        </div>
      </Show>
    </div>
  );
};

export default App;

import { WEB_API_BASE_URL } from "../constants";
import { worker } from "../mocks/browser";

const url = `${WEB_API_BASE_URL}/access/count`;

// DOM操作定義
const displayCount = (count: number) => {
  const el = document.querySelector<HTMLSpanElement>("#access-counter");

  if (!el) {
    throw new Error("Can not find the element");
  }

  el.innerHTML = count.toString();
};

const fetchCurrentAccessCount = async () => {
  const response = await fetch(url, { method: "GET" });

  const json = await response.json();
  return json.accessCount;
};

const incrementAccessCount = async () => {
  await fetch(`${url}/increment`, { method: "PUT" });
};

// DBの値を取得-> update関数に渡す -> DOM操作実行
const listenData = async () => {
  if (process.env.NODE_ENV === "development") {
    void worker.start({ onUnhandledRequest: "bypass" });
  }

  try {
    const currentAccessCount = await fetchCurrentAccessCount();
    displayCount(currentAccessCount + 1);
    await incrementAccessCount();
  } catch {
    throw new Error(
      "データの取得に失敗しました。\n通信環境をご確認の上再度お試しください。"
    );
  }
};

// 実行
listenData();

import "dotenv/config";
import { GeminiProvider } from "./src/providers/GeminiProvider.js";

const provider = new GeminiProvider();
const controller = new AbortController();

const messages = [{ role: "user", text: "What should I know about caching strategies? Two short paragraphs." }];

let full = "";
let n = 0;
for await (const token of provider.streamChat(messages, { signal: controller.signal })) {
  full += token;
  n++;
}
console.log("chunks yielded:", n);
console.log("TEXT:", JSON.stringify(full));

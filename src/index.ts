import { mkdir } from "fs/promises";

import { getForecast } from "./cache.ts";
import { parseCli } from "./cli.ts";
import { formatForecast } from "./format.ts";

const { cities, day, noCache } = parseCli();
await mkdir("reports", { recursive: true });

const results = await Promise.allSettled(cities.map((city) => getForecast(city, day, noCache)));

console.log(formatForecast(results, day))

import { mkdir } from "fs/promises";

import { getForecast } from "./cache.ts";
import { parseCli } from "./cli.ts";
import { formatForecast } from "./format.ts";

const { cities, day, noCache } = parseCli();

const timeout = 5000;

await mkdir("reports", { recursive: true });

const results = await Promise.allSettled(cities.map((city) => getForecast(city, day, noCache, timeout)));

console.log(formatForecast(results, day));

process.exitCode = results.some((result) => result.status === "rejected") ? 1 : 0;

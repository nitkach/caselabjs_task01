import { mkdir } from "fs/promises";

import { getForecast } from "./cache.ts";
import { parseCli } from "./cli.ts";
import { formatForecast } from "./format.ts";
import { loadEnvs } from "./env.ts";

try {
    const { cities, day, noCache } = parseCli();
    const envs = loadEnvs();
    await mkdir(envs.reportsPath, { recursive: true });

    const results = await Promise.allSettled(
        cities.map((city) => getForecast(city, day, noCache, envs))
    );

    console.log(formatForecast(results, day));
    process.exitCode = results.some((result) => result.status === "rejected") ? 1 : 0;
} catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
}

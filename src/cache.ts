import { fetchForecastForCity, type Forecast } from "./api.ts";
import { readFile, writeFile } from "fs/promises";

/// Format name for cache file
function getCachePath(city: string): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `reports/${city}-${year}-${month}-${day}.json`;
}

/// Helper function to narrow the error type and determine if it's a cache miss
function isCacheMiss(error: unknown): boolean {
    return (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
    );
}

/// Logic for retrieving data via cache or fetch
export async function getForecast(city: string, day: number, noCache: boolean, ms: number): Promise<Forecast> {
    const cachePath = getCachePath(city);

    // `--no-cache` means it's 'true': '!true' -> 'false'
    if (!noCache) {
        try {
            const data = await readFile(cachePath, "utf-8");
            const json = JSON.parse(data) as Forecast;

            if (json.day === day) {
                return json;
            }
        } catch (error) {
            if (error instanceof SyntaxError || isCacheMiss(error)) {
                // invalid JSON or cache miss; next we fetch data
            } else {
                throw error;
            }
        }
    }

    const forecast = await fetchForecastForCity(city, day, ms);
    await writeFile(cachePath, JSON.stringify(forecast, null, 2), "utf8");

    return forecast;
}

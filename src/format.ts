import type { Forecast } from "./api.ts";

export function formatForecast(results: PromiseSettledResult<Forecast>[], day: number): string {
    let output = [];

    for (const result of results) {
        if (result.status === "fulfilled") {
            const forecast = result.value;

            output.push(`${forecast.city} - ${forecast.country} - (${forecast.latitude}, ${forecast.longitude})`);
            const daily = forecast.daily;

            output.push("Date         | Min temp | Max temp | Precipitation sum ")
            for (let i = 0; i < day; i++) {
                const date = daily.time[i]?.padEnd(12);
                const min = String(daily.temperature_2m_min[i]).padStart(8);
                const max = String(daily.temperature_2m_max[i]).padStart(8);
                const precipitation = String(daily.precipitation_sum[i]).padStart(8);

                output.push(`${date} | ${min} | ${max} | ${precipitation}`);
            }
        } else {
            output.push(`Error: ${result.reason}`);
        }
        output.push("-".repeat(54));
    }

    return output.join("\n");
}

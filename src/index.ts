import { parseCli } from "./cli.ts";
import { fetchForecast } from "./api.ts";

const { cities, day: day } = parseCli();

const results = await fetchForecast(cities, day);

for (const result of results) {
    if (result.status === "fulfilled") {
        const forecast = result.value;

        console.log(`${forecast.city} - ${forecast.country} - (${forecast.latitude}, ${forecast.longitude})`);
        const daily = forecast.daily;

        for (let i = 0; i < day; i++) {
            const date = daily.time[i]?.padEnd(12);
            const min = String(daily.temperature_2m_min[i]).padStart(7);
            const max = String(daily.temperature_2m_max[i]).padStart(7);
            const precipitation = String(daily.precipitation_sum[i]).padStart(7);

            console.log(`${date} | ${min} | ${max} | ${precipitation}`);
        }
    } else {
        console.log(`Error: ${result.reason}`);
    }
}

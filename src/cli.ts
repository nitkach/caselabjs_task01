import { parseArgs, type ParseArgsOptionsConfig } from "node:util";

const options: ParseArgsOptionsConfig = {
    city: { type: "string" },
    day: { type: "string", default: "3" },
};

export function parseCli(args = process.argv.slice(2)) {
    const { values } = parseArgs({ args, options });

    const rawCities = values.city;
    if (typeof rawCities !== "string") {
        throw new Error("--city must be a string");
    }

    const cities: string[] = [];
    for (const [index, rawCity] of rawCities.split(",").entries()) {
        const city = rawCity.replaceAll("^", "").trim();
        if (!city) {
            throw new Error(
                `--city contains an empty city name at position ${index + 1}`,
            );
        }

        cities.push(city);
    }

    const rawDay = values.day;
    if (typeof rawDay !== "string") {
        throw new Error("--day must be a string");
    }

    const day = Number(rawDay);
    if (!Number.isInteger(day)) {
        throw new Error("--day must be an integer");
    }

    if (day < 1 || day > 7) {
        throw new Error("--day must be between 1 and 7");
    }

    return { cities, day };
}

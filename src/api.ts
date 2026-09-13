interface Location {
    results: Result[]
}

interface Result {
    country: string,
    latitude: number,
    longitude: number,
}

interface ForecastDaily {
    daily: Daily
}

interface Daily {
    time: string[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_sum: number[]
}

interface Forecast {
    city: string,
    country: string,
    latitude: number,
    longitude: number,
    daily: Daily,
}

export function fetchForecast(cities: string[], day: number): Promise<PromiseSettledResult<Forecast>[]> {
    return Promise.allSettled(
        cities.map((city) => fetchForecastForCity(city, day))
    );
}

async function fetchForecastForCity(city: string, day: number): Promise<Forecast> {
    const geocodingUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
    geocodingUrl.search = new URLSearchParams({
        name: city,
        count: "1",
        language: "ru",
        format: "json"
    }).toString();

    const locationResponse = await fetch(geocodingUrl);
    if (!locationResponse.ok) {
        throw new Error(
            `Geocoding request for "${city}" failed: ${locationResponse.status}`,
        );
    }

    const locationData = (await locationResponse.json()) as Location;
    const result = locationData.results.at(0);

    if (!result) {
        throw new Error(`City "${city}" was not found`);
    }

    const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
    forecastUrl.search = new URLSearchParams({
        latitude: result.latitude.toString(),
        longitude: result.longitude.toString(),
        daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
        forecast_days: day.toString(),
        timezone: "auto",
    }).toString();

    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
        throw new Error(
            `Forecast request for "${city}" failed: ${forecastResponse.status}`,
        );
    }

    const forecastData = (await forecastResponse.json()) as ForecastDaily;

    return {
        city,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
        daily: forecastData.daily,
    };
}

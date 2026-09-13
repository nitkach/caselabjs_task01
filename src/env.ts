export interface Envs {
    timeout: number,
    geocodingBaseUrl: string,
    openMeteoBaseUrl: string,
    reportsPath: string,
}

export function loadEnvs(): Envs {
    try {
        process.loadEnvFile();
    } catch {
        // .env file cannot be loaded, using default values
    }

    let timeout = Number(process.env.TIMEOUT);
    if (!Number.isInteger(timeout) || timeout <= 0) {
        timeout = 5000;
    }

    return {
        timeout,
        geocodingBaseUrl:
            process.env.GEOCODING_BASE_URL ??
            "https://geocoding-api.open-meteo.com/v1/search",
        openMeteoBaseUrl:
            process.env.OPENMETEO_BASE_URL ??
            "https://api.open-meteo.com/v1/forecast",
        reportsPath: process.env.REPORTS_PATH ?? "reports",
    };
}

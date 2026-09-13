export interface Envs {
    timeout: number,
    geocodingBaseUrl: string,
    openMeteoBaseUrl: string,
    reportsPath: string,
}

export function loadEnvs(): Envs {
    process.loadEnvFile();

    return {
        timeout: Number(process.env.TIMEOUT ?? 5000),
        geocodingBaseUrl:
            process.env.GEOCODING_BASE_URL ??
            "https://geocoding-api.open-meteo.com/v1/search",
        openMeteoBaseUrl:
            process.env.OPENMETEO_BASE_URL ??
            "https://api.open-meteo.com/v1/forecast",
        reportsPath: process.env.REPORTS_PATH ?? "reports",
    };
}

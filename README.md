# Weather Forecast CLI

CLI utility that retrieves and caches daily weather forecasts for one or more
cities using the Open-Meteo APIs.

## Requirements

- Node.js 20.6+
- npm
- Internet access

## Installation

```powershell
npm install
```

The `.env` file is optional. Defaults are used when it is unavailable or a
variable is missing.

## Environment variables

| Variable | Default |
| --- | --- |
| `TIMEOUT` | `5000` ms |
| `GEOCODING_BASE_URL` | `https://geocoding-api.open-meteo.com/v1/search` |
| `OPENMETEO_BASE_URL` | `https://api.open-meteo.com/v1/forecast` |
| `REPORTS_PATH` | `reports` |

`TIMEOUT` must be a positive integer.

## Usage

```powershell
npm start -- --city <city[,city...]> [--day <1-7>] [--no-cache]
```

- `--city` - required comma-separated city names.
- `--day` - forecast length from 1 to 7; default: `3`.
- `--no-cache` - skip cached reports and fetch fresh data.

Examples:

```powershell
npm start -- --city Москва
npm start -- --city Москва,Лондон --day 4
```

## Example output

```text
Москва - Россия - (55.75204, 37.61781)
Date         | Min temp | Max temp | Precipitation sum
2026-09-13   |      7.7 |     16.2 |        0
2026-09-14   |      9.1 |     19.2 |        0
2026-09-15   |     10.9 |     17.3 |      0.5
2026-09-16   |      8.3 |     16.8 |        0
------------------------------------------------------
Лондон - Британия - (51.50853, -0.12574)
Date         | Min temp | Max temp | Precipitation sum
2026-09-13   |     18.3 |     22.7 |      1.1
2026-09-14   |     18.8 |     24.7 |        0
2026-09-15   |     16.3 |     23.1 |        0
2026-09-16   |     12.8 |     18.3 |      0.3
------------------------------------------------------
```

## Errors and exit codes

Invalid CLI arguments, missing cities, unknown cities, failed API requests,
timeouts, and file-system errors are reported as errors.

Cities are processed independently. Successful results are printed even if
another city fails.

| Code | Meaning |
| --- | --- |
| `0` | All cities succeeded. |
| `1` | At least one city failed or the command failed. |

## Project structure

```text
src/
  api.ts      API requests
  cache.ts    Cached reports
  cli.ts      Argument parsing
  env.ts      Environment values
  format.ts   Console formatting
  index.ts    Application entry point
```

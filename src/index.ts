import { parseCli } from "./cli.ts";

const { cities, day } = parseCli();

console.log(`Cities: ${cities.join(", ")}; Day: ${day}`);
// console.log("Positional args:", positionals);

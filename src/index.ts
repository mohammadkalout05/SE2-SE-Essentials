import logger from "./util/logger";
import { readCsvFile } from "./util/parser";

async function main() {
  const data = await readCsvFile("src/data/cake orders.csv");
  data.forEach((row) => logger.info(row));
}

main();
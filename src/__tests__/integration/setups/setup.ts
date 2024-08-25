import { beforeEach } from "vitest";
import resetDb from "../utils/reset-db";

beforeEach(async () => {
  await resetDb();
});

import assert from "node:assert/strict";
import test from "node:test";

import { stableDomId } from "../lib/dom-ids.ts";

test("lab control IDs are deterministic across server and client renders", () => {
  assert.equal(stableDomId("lab-control", "Discount γ"), stableDomId("lab-control", "Discount γ"));
  assert.notEqual(stableDomId("lab-control", "B · x"), stableDomId("lab-control", "B · y"));
  assert.match(stableDomId("lab-control", "Discount γ"), /^[a-z0-9-]+$/);
});

import { describe, expect, it } from "vitest";

import InventoriesList from "../../components/InventoriesList.vue";

describe("mount component", () => {
  it("should render properly", () => {
    expect(InventoriesList).toBeTruthy();
  });
});

import { setActivePinia, createPinia } from "pinia";
import { useInventoriesStore } from "@/stores/inventories";
import { beforeEach, describe, it, expect } from "vitest";

describe("", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("should get inventories", () => {
    const store = useInventoriesStore();

    expect(store.inventories.length).toEqual(0);
    store.fetchInventories();
  });
});

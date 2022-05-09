import type { Inventory } from "@/stores/types";
import { createPinia, setActivePinia } from "pinia";
import { useInventoriesStore } from "../stores/inventories";

const item = {
  id: 8,
  is_sold: false,
};

describe("Inventory Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("changes edit status", () => {
    const store = useInventoriesStore();

    expect(store.edit.status).toBe(false);
    store.setEditStatus(true);
    expect(store.edit.status).toBe(true);
  });

  it("marks item as sold", () => {
    const store = useInventoriesStore();

    store.inventories.push(item as Inventory);

    expect(store.inventories[0].is_sold).toBe(false);
    store.markAsSold(item.id);
    expect(store.inventories[0].is_sold).toBe(true);
  });
});

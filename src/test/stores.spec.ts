import { createPinia, setActivePinia } from "pinia";
import { useInventoriesStore } from "../stores/inventories";

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
});

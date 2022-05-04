import { describe, expect, it } from "vitest";

import Form from "../../components/Form.vue";

describe("mount component", () => {
  it("should render properly", () => {
    expect(Form).toBeTruthy();
  });
});

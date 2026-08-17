import { describe, expect, it } from "vitest";
import { filterProviders } from "../src/data/providers";

describe("provider discovery", () => {
  it("filters by category", () => {
    expect(filterProviders("", "Casa").map((item) => item.id)).toEqual(["casa-nova-eletrica"]);
  });

  it("finds results regardless of search case", () => {
    expect(filterProviders("ANA", "Todas").map((item) => item.id)).toEqual(["ana-souza"]);
  });

  it("keeps category and search criteria combined", () => {
    expect(filterProviders("reparo", "Casa").map((item) => item.id)).toEqual(["casa-nova-eletrica"]);
    expect(filterProviders("reparo", "Pets")).toEqual([]);
  });
});

import { describe, expect, it } from "vitest";
import { filterProviders, providers } from "../src/data/providers";

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

  it("provides a positive recommendation total for every provider card", () => {
    expect(providers.every((provider) => Number.isInteger(provider.recommendations) && provider.recommendations > 0)).toBe(true);
  });
});

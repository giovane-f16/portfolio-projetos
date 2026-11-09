import { describe, expect, it } from "vitest";
import Image, { alt, contentType, size } from "../src/app/opengraph-image";

describe("open graph image", () => {
  it("declares the share card metadata", () => {
    expect(alt).toBe("Giovane Ferreira - Full Stack Developer");
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
  });

  it("renders a 1200x630 PNG", async () => {
    const response = await Image();
    const bytes = new Uint8Array(await response.arrayBuffer());

    expect(response.headers.get("content-type")).toBe("image/png");
    expect(Array.from(bytes.slice(1, 4), (byte) => String.fromCharCode(byte)).join("")).toBe("PNG");
    expect(new DataView(bytes.buffer).getUint32(16)).toBe(1200);
    expect(new DataView(bytes.buffer).getUint32(20)).toBe(630);
  }, 30000);
});

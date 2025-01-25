// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { dropboxContentHasher } from "./dropbox.hasher";

const TEST_STRING = "This is a test string to be hashed";
const encoder = new TextEncoder();
const BYTE_STRING = encoder.encode(TEST_STRING).buffer;
const SINGLE_CHUNK_HASH =
	"863d41256c55826d1b8b31610a7374280fe75002e2f8797f32f71a62db76694a";
const MULTI_CHUNK_HASH =
	"83a78c8050069754bbd7876e7b34e2391471aa306d0d2ffa5ede0423708a55cd";

describe("subtleHasher", () => {
	it("should hash for a single chunk", async () => {
		const subtleHash = await dropboxContentHasher(BYTE_STRING);
		expect(subtleHash).toEqual(SINGLE_CHUNK_HASH);
	});
	it("should hash for a multi chunk", async () => {
		const subtleHash = await dropboxContentHasher(BYTE_STRING, 8);
		expect(subtleHash).toEqual(MULTI_CHUNK_HASH);
	});
});

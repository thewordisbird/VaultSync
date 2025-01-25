/*
 * Per Obsidian docs use SubtleCrypto to work on mobile:
 * https://docs.obsidian.md/Plugins/Releasing/Submission+requirements+for+plugins#Node.js+and+Electron+APIs+are+only+allowed+on+desktop
 *
 * The Dropbox Hashing Algorithm is described here:
 * https://www.dropbox.com/developers/reference/content-hash
 * The algorithm needs to be implemented using SubtleCrypto.
 *
 * SubtleCrypto API docs:
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
 *
 * Dropbox block size specification is 4MB
 */
const BLOCK_SIZE = 4 * 1024 * 1024;

export async function dropboxContentHasher(
	data: ArrayBuffer,
	blockSize = BLOCK_SIZE,
) {
	const subtle = window.crypto.subtle;
	const numChunks = Math.ceil(data.byteLength / blockSize);
	const blockHashes = new Uint8Array(numChunks * 32);
	let offset = 0;
	let hashOffset = 0;
	while (offset < data.byteLength) {
		let length = Math.min(data.byteLength - offset, blockSize);
		const block = await subtle.digest(
			{ name: "SHA-256" },
			data.slice(offset, offset + length),
		);
		blockHashes.set(new Uint8Array(block), hashOffset);
		offset += length;
		hashOffset += 32;
	}

	let totalHash = await subtle.digest({ name: "SHA-256" }, blockHashes);

	const hashHex = Array.from(new Uint8Array(totalHash))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}

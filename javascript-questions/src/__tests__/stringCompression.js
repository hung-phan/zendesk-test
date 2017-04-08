import { assert } from "chai";
import stringCompression from "../stringCompression";

describe("stringCompression", () => {
  it("should be a function", () => {
    assert.isFunction(stringCompression);
  });

  it("should only accept string as its input", () => {
    assert.throw(() => stringCompression(null));
    assert.throw(() => stringCompression());
    assert.throw(() => stringCompression(123));
    assert.throw(() => stringCompression({}));
    assert.throw(() => stringCompression([1, 2, 3]));
  });

  it("should compress input 'aaaabbaaaababbbcccccccccccc' into 'a4b2a4b1a1b3c12'", () => {
    assert.equal(
      stringCompression("aaaabbaaaababbbcccccccccccc"),
      "a4b2a4b1a1b3c12"
    );
  });

  it("should compres input 'aabcccccaaa' into 'a2b1c5a3'", () => {
    assert.equal(stringCompression("aabcccccaaa"), "a2b1c5a3");
  });

  it("should return the original string if no more compression could be made", () => {
    assert.equal(stringCompression("abbreviation"), "abbreviation");
  });
});

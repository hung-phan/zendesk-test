import { assert } from "chai";
import checkURIs, {
  validateURI,
  splitBy,
  splitURIComponents
} from "../checkURIs";

describe("checkURIs", () => {
  it("should be a function", () => {
    assert.isFunction(checkURIs);
  });

  it("should validate given URIs", () => {
    assert.throw(() => validateURI(null));
    assert.throw(() => validateURI());
    assert.throw(() => validateURI(123));
    assert.throw(() => validateURI({}));
    assert.throw(() => validateURI([1, 2, 3]));
    assert.throw(() => validateURI("localhost.com"));
    assert.throw(() => validateURI("http://loca://lhost.com"));
    assert.throw(() =>
      validateURI(
        "abc://username:password@example.com:123/path/data#fragid1?key=value&key2=value2"
      ));
    assert.throw(() => validateURI("abc://username:password@/path/data"));
  });

  context("splitBy", () => {
    it("should spit by the correct seperator", () => {
      assert.deepEqual(splitBy("@")("hungphan:secret@localhost.com"), [
        "hungphan:secret",
        "localhost.com"
      ]);
      assert.deepEqual(
        splitBy("@", { inReversedDirection: false })(
          "hungphan:secret@localhost.com"
        ),
        ["hungphan:secret", "localhost.com"]
      );
    });

    it("should return the original value in given direction when cannot split the value", () => {
      assert.deepEqual(splitBy("@")("localhost.com"), ["localhost.com", ""]);
      assert.deepEqual(
        splitBy("@", { inReversedDirection: false })("localhost.com"),
        ["", "localhost.com"]
      );
    });
  });

  it("should have correct URI components", () => {
    assert.deepEqual(
      splitURIComponents(
        "abc://username:password@example.com:123/path/data?key=value&key2=value2#fragid1"
      ),
      {
        scheme: "abc",
        basicAuth: "username:password",
        host: "example.com:123",
        paths: ["path", "data"],
        query: "key=value&key2=value2",
        fragment: "fragid1"
      }
    );
    assert.deepEqual(
      splitURIComponents(
        "http://hungphan:secret@localhost.com/further/../down/./index.html?a=1&b=2#hashtag"
      ),
      {
        scheme: "http",
        basicAuth: "hungphan:secret",
        host: "localhost.com:80",
        paths: ["down", "index.html"],
        query: "a=1&b=2",
        fragment: "hashtag"
      }
    );
    assert.deepEqual(
      splitURIComponents("http://abc.com/foo.html?a=3&a=1&b=2"),
      {
        scheme: "http",
        basicAuth: "",
        host: "abc.com:80",
        paths: ["foo.html"],
        query: "a=3&a=1&b=2",
        fragment: ""
      }
    );
  });

  it("should check scheme name equivalent (must be case-insensitive)", () => {
    assert.isTrue(checkURIs("http://localhost.com", "http://localhost.com"));
    assert.isTrue(checkURIs("https://localhost.com", "https://localhost.com"));
    assert.isTrue(checkURIs("HTTP://localhost.com", "http://localhost.com"));
    assert.isTrue(checkURIs("https://localhost.com", "HTTPS://localhost.com"));
    assert.isFalse(checkURIs("https://localhost.com", "http://localhost.com"));
    assert.isFalse(checkURIs("ftp://localhost.com", "http://localhost.com"));
  });

  it("should check the port on the URI", () => {
    assert.isTrue(checkURIs("http://localhost.com", "http://localhost.com:80"));
    assert.isTrue(
      checkURIs("http://localhost.com:80", "http://localhost.com:80")
    );
    assert.isTrue(
      checkURIs("https://localhost.com:80", "https://localhost.com")
    );
    assert.isFalse(
      checkURIs("http://localhost.com:3000", "http://localhost.com")
    );
  });

  it("should check the hostname on the URI (must be case-insensitive)", () => {
    assert.isTrue(checkURIs("http://LOCALHOST.COM", "http://localhost.com"));
    assert.isTrue(checkURIs("http://LoCaLhOsT.CoM", "http://localhost.com"));
  });

  it("should check the basic auth if exists on the hostname (must be case-sensitive)", () => {
    assert.isTrue(
      checkURIs(
        "https://hungphan:secret@localhost.com:3360",
        "https://hungphan:secret@localhost.com:3360"
      )
    );
    assert.isFalse(
      checkURIs(
        "https://hungphan:secret@localhost.com:3360",
        "https://hungphan:SeCrEt@localhost.com:3360"
      )
    );
    assert.isFalse(
      checkURIs(
        "https://hungphan:secret@localhost.com:3360",
        "https://hUnGpHaN:secret@localhost.com:3360"
      )
    );
  });

  it("should return false if the paths is different", () => {
    assert.isFalse(
      checkURIs(
        "http://abc.com/path/to/folder/index.html",
        "http://abc.com/to/folder/index.html"
      )
    );
    assert.isFalse(
      checkURIs(
        "http://abc.com/path/to/folder/index.html",
        "http://abc.com/another_path/to/folder/index.html"
      )
    );
  });

  it("should check for URI fragment", () => {
    assert.isFalse(
      checkURIs(
        "http://abc.com/index.html#page1",
        "http://abc.com/index.html#page2"
      )
    );
    assert.isTrue(
      checkURIs(
        "http://abc.com/index.html#page1",
        "http://abc.com:80/folder/../index.html#page1"
      )
    );
    assert.isTrue(
      checkURIs(
        "http://abc.com/index.html#page1",
        "http://abc.com:80/./index.html#page1"
      )
    );
  });

  it("should check for query equaltiy", () => {
    assert.isTrue(
      checkURIs(
        "http://abc.com/folder/index.html?a=1&b=2",
        "http://abc.com/folder/index.html?b=2&a=1"
      )
    );
    assert.isFalse(
      checkURIs(
        "http://abc.com/folder/index.html?a=1&b=2&a=3",
        "http://abc.com/folder/index.html?a=3&a=1&b=2"
      )
    );
    assert.isFalse(
      checkURIs(
        "http://abc.com/folder/index.html?a=1&b=2",
        "http://abc.com/folder/index.html?b=1&a=2"
      )
    );
  });

  it("should return correct results", () => {
    assert.isTrue(
      checkURIs(
        "http://abc.com:80/~smith/home.html",
        "http://ABC.com/%7Esmith/home.html"
      )
    );
    assert.isTrue(
      checkURIs(
        "http://abc.com/drill/down/foo.html",
        "http://abc.com/drill/further/../down/./foo.html"
      )
    );
    assert.isTrue(
      checkURIs(
        "http://abc.com/foo.html?a=1&b=2",
        "http://abc.com/foo.html?b=2&a=1"
      )
    );
    assert.isFalse(
      checkURIs(
        "http://abc.com/foo.html?a=1&b=2&a=3",
        "http://abc.com/foo.html?a=3&a=1&b=2"
      )
    );
    assert.isTrue(
      checkURIs(
        "http://www.pierobon.org/iis/review1.htm.html?a=1&b=2#one",
        "http://www.pierobon.org/iis/review1.htm.html?b=2&a=1#one"
      )
    );
    assert.isTrue(
      checkURIs(
        "abc%3A%2F%2Fusername%3Apassword%40example.com%3A123%2Fpath%2Fdata%3Fkey%3Dvalue%26key2%3Dvalue2%23fragid1",
        "abc://username:password@example.com:123/path/data?key=value&key2=value2#fragid1"
      )
    );
  });
});

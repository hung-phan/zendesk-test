/**
  * A valid URI will have the following shape
  * abc://username:password@example.com:123/path/data?key=value&key2=value2#fragid1
  * └┬┘   └───────┬───────┘ └────┬────┘ └┬┘           └─────────┬─────────┘ └──┬──┘
  * scheme  user information     host     port                  query         fragment
  * This is the simple check for valid URI. In pratice, there will be more complex cases
  * to handle
  */
export const validateURI = uri => {
  if (typeof uri !== "string") {
    throw new Error("URI must be a string");
  }

  if (uri.match(/:\/\//g).length !== 1) {
    throw new Error("Must have 1 scheme seperator");
  }

  if (/:\/\/.+:.+@\//.test(uri)) {
    throw new Error("Must include hostname when specifying basic auth");
  }

  if (/#.+\?.+$/.test(uri)) {
    throw new Error("Fragment must be placed after query params");
  }
};

export const splitBy = (seperator, { inReversedDirection = true } = {}) =>
  string => {
    const index = string.indexOf(seperator);

    if (index !== -1) {
      return [string.slice(0, index), string.slice(index + 1)];
    }

    return inReversedDirection ? [string, ""] : ["", string];
  };

const hasPort = host => /:\d+$/.test(host);

const flattenTraversalTokens = paths => paths.reduce(
  (acc, path) => {
    if (path === "..") {
      acc.pop();
    } else if (path !== ".") {
      acc.push(path);
    }

    return acc;
  },
  []
);

export const splitURIComponents = uri => {
  const SCHEME_SEPERATOR = "://";
  const schemeIndex = uri.indexOf(SCHEME_SEPERATOR);
  const scheme = uri.slice(0, schemeIndex);
  let [host, ...paths] = uri
    .slice(schemeIndex + SCHEME_SEPERATOR.length)
    .split("/");
  let basicAuth = "";
  let query = "";
  let fragment = "";

  [basicAuth, host] = splitBy("@", { inReversedDirection: false })(host);
  paths = flattenTraversalTokens(paths);

  if (paths.length > 0) {
    let lastPath = paths[paths.length - 1];

    [lastPath, fragment] = splitBy("#")(lastPath);
    [lastPath, query] = splitBy("?")(lastPath);

    paths[paths.length - 1] = lastPath;
  }

  return {
    scheme,
    basicAuth,
    host: hasPort(host) ? host : `${host}:80`,
    paths,
    query,
    fragment
  };
};

const areArrayEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }

  let index = 0;

  while (index !== array1.length) {
    if (array1[index] !== array2[index]) {
      return false;
    }

    index++;
  }

  return true;
};

const decodeQuery = query => {
  const querySegments = query.split("&");
  const hashTable = Object.create(null);

  for (let segment of querySegments) {
    const [key, value] = segment.split("=");

    if (hashTable[key]) {
      hashTable[key].push(value);
    } else {
      hashTable[key] = [value];
    }
  }

  return hashTable;
};

const areQueryEqual = (query1, query2) => {
  if (query1 === query2) {
    return true;
  }

  const query1Params = decodeQuery(query1);
  const query2Params = decodeQuery(query2);

  // we don't need to use hasOwnProperty here because we create decodeQuery with
  // Object.create(null). queryParams value will always be an array
  for (let key in query1Params) {
    if (
      !query2Params[key] || !areArrayEqual(query1Params[key], query2Params[key])
    ) {
      return false;
    }
  }

  return true;
};

/**
  * Constraints and assumptions:
  *
  * Comparisons of scheme names must be case-insensitive
  *
  * In-URI basic auth may be present: e.g. http://uname:passwd@host.com/foo/bar.html, auth must be case-sensitive
  *
  * Comparisons of host names must case-insensitive
  *
  * A port that is empty, or not given, is equivalent to the default port of 80
  *
  * Paths may contain traversal tokens . (same dir) and .. (one dir up) which must be accounted for
  *
  * Comparisons of path, hash, and querystring must be case-sensitive
  *
  * Characters are equivalent to their % HEX HEX encodings. (Other than typical reserved characters in urls like , / ? : @ & = + $ #)
  *
  * Query string parameters must be equivalent in arbitrary order, BUT query string arguments of the same name must be listed in
  * the same order in both URIs to be equivalent. There may be multiple (not just 2) args of the same name that need to be accounted for.
  * @return {boolean} if 2 URIs is matched
  */
export default (uri1, uri2) => {
  const newURI1 = decodeURIComponent(uri1);
  const newURI2 = decodeURIComponent(uri2);

  validateURI(newURI1);
  validateURI(newURI2);

  const {
    scheme: scheme1,
    basicAuth: basicAuth1,
    host: host1,
    paths: paths1,
    query: query1,
    fragment: fragment1
  } = splitURIComponents(newURI1);
  const {
    scheme: scheme2,
    basicAuth: basicAuth2,
    host: host2,
    paths: paths2,
    query: query2,
    fragment: fragment2
  } = splitURIComponents(newURI2);

  return scheme1.toLowerCase() === scheme2.toLowerCase() &&
    basicAuth1 === basicAuth2 &&
    host1.toLowerCase() === host2.toLowerCase() &&
    areArrayEqual(paths1, paths2) &&
    areQueryEqual(query1, query2) &&
    fragment1 === fragment2;
};

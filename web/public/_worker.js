const DEFAULT_USER = "rlevel";
const DEFAULT_PASS = "snowy";

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="RlevelTakeoff", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export default {
  async fetch(request, env) {
    const user = env.BASIC_AUTH_USER || DEFAULT_USER;
    const pass = env.BASIC_AUTH_PASS || DEFAULT_PASS;
    const expected = `Basic ${btoa(`${user}:${pass}`)}`;
    const auth = request.headers.get("Authorization");
    if (auth !== expected) {
      return unauthorized();
    }
    return env.ASSETS.fetch(request);
  },
};

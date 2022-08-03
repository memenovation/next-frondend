export const config = {
  runtime: "experimental-edge",
};

export default async function handler() {
  return new Response("Auth Required.", {
    status: 401,
    headers: {
      "WWW-authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export default function handler(req, res) {
  //only accept POST
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Invalid Method" });
  }
}

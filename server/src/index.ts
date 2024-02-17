import express, { Router } from "express";
import corsAnywhere from "cors-anywhere";

import { instagram } from "./lib/Instagram";
import invariant from "invariant";

const app = express();
const router = Router();

// https://github.com/Rob--W/cors-anywhere/issues/81
const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [], // Do not remove any headers.
});

router.get("/user", async (_, res) => {
  invariant(instagram.user, "Expected Instagram user");

  res.status(200).json(await instagram.getUser());
});

router.get("/user/:id", async (req, res) => {
  res.status(200).json(await instagram.getUser(req.params.id));
});

router.get("/inbox", async (_, res) => {
  res.status(200).json(await instagram.getInbox(false));
});

router.get("/proxy/:proxyUrl*", (req, res) => {
  // Strip '/proxy' from the front of the URL, else the proxy won't work.
  req.url = req.url.replace("/proxy/", "/");
  proxy.emit("request", req, res);
});

app.use("/api", router);

(async () => {
  await instagram.login();
  console.log("✅ Authenticated into Instagram");

  app.listen(3000, () => {
    console.log("✅ Started Instagram Server");
  });
})();

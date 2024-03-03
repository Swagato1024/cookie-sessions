const cookieSession = require("cookie-session");
const express = require("express");

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

const serveHomePage = (req, res) => {
  const html = `
    <form action="/submit" method="post">
     <input type="text" placeholder="username" name="username"/>
     <input type="submit" value="submit" />
     </form>

     <a href="/username"> get user name </a>
  `;

  res.send(html);
};

const submitUsername = (req, res) => {
  console.log(req.body);

  req.session.username = req.body.username;
  res.redirect("/");
};

const serveUsername = (req, res) => {
  res.send(req.session.username);
};

const createApp = () => {
  const app = express();
  app.use(logger);

  app.use(express.urlencoded());

  app.use(
    cookieSession({
      name: "usr_session",
      keys: ["sh256"],
    })
  );

  app.get("/", serveHomePage);
  app.post("/submit", submitUsername);
  app.get("/username", serveUsername);
  return app;
};

const main = () => {
  const app = createApp();

  app.listen(9000, () => console.log("listening on ", 9000));
};

main();

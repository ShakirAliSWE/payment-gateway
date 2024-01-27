const app = require("./src/app");
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(PORT, () => {
  console.log(`listening on port :${PORT}`);
});

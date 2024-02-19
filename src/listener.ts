// You should not need to change anything in this file ever (unless some other process ate your 8001 port)

import App from ".";

const port: number = 8001;
const app = new App().app;

app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});
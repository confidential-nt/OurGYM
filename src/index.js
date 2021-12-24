import "dotenv/config";
import "./db";
import "./models/User";
import "./models/DailyLog";
import "./models/TimePerDay";
import "./models/TimePerWeek";
import "./models/TimePerMonth";
import App from "./app";

// const PORT = 7000;

// app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));

class Server {
  constructor() {
    const PORT = process.env.PORT || 4000;
    const server = new App();
    server.app.listen(PORT, () =>
      console.log(`Listening to http://localhost:${PORT}`)
    );
  }
}

new Server();

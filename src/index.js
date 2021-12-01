import "dotenv/config";
import "./db";
import "./models/User";
import "./models/DailyLog";
import "./models/TimePerDay";
import "./models/TimePerWeek";
import "./models/TimePerMonth";
import app from "./app";

const PORT = 4000;

app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));

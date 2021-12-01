import mongoose from "mongoose";

mongoose.connect(process.env.LOCAL_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(`DB Error: ${error}`));
db.once("open", () => console.log("Connected to DB!"));

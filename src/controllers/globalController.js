import User from "../models/User";
import TimePerDay from "../models/TimePerDay";
import TimePerWeek from "../models/TimePerWeek";
import TimePerMonth from "../models/TimePerMonth";

export const getHome = async (req, res) => {
  try {
    const id = req.session.user._id;
    const user = await User.findById(id);
    const timePerDays = await TimePerDay.findOne({ user: id });
    const { timePerDay } = timePerDays;

    const date = new Date();
    const year = parseInt(date.getFullYear());
    const month = parseInt(date.getMonth() + 1);
    const dateToday = parseInt(date.getDate());
    const Today = `${year}. ${String(month).padStart(2, "0")}. ${String(
      dateToday
    ).padStart(2, "0")}`;

    //find index of today's doc in timePerDay collection
    const indexTotal = timePerDay.findIndex((x) => {
      return x.date === Today;
    });

    // const timePerWeek = await TimePerWeek.findById(id);
    // const timePerMonth = await TimePerMonth.findById(id);
    return res.render("home", {
      pageTitle: "Our GYM",
      user,
      timePerDays,
      indexTotal,
    });
  } catch (error) {
    console.log(error);
    return res.render("home", { pageTitle: "Our GYM" });
  }
};

export const postHome = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { exrname },
  } = req;
  try {
    const user = await User.findByIdAndUpdate(_id, {
      $push: { exercises: { exrname } },
    });
    //await TimePerDay.findByIdAndUpdate(_id, { timePerDay:{$push: { exercises: { exrname } }}  });
    //await TimePerWeek.findByIdAndUpdate(_id, { timePerWeek:{$push: { exercises: { exrname } }}  });
    //await TimePerMonth.findByIdAndUpdate(_id, { timePerMonth:{$push: { exercises: { exrname } }}  });
    await user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).redirect("/");
  }
};

export const addTime = async (req, res) => {
  try {
    const {
      session: {
        user: { _id: id },
      },
      body: { index: indexExr, Today },
    } = req;
    const user = await User.findById(id);
    const timePerDays = await TimePerDay.findOne({ user: id });
    const { timePerDay } = timePerDays;
    // console.log(user);

    //find index of today's doc in timePerDay collection
    const indexTotal = timePerDay.findIndex((x) => {
      return x.date === Today;
    });

    for (const exercise of user.exercises) {
      // console.log(exercise.exrname);
      const updateTimePerDay = await TimePerDay.findOneAndUpdate(
        { $elemMatch: { user: id, timePerDay: { date: Today } } },
        {
          $push: {
            timePerDay: {
              exercises: {
                exrname: exercise.exrname,
                exrtime: exercise.exrtime,
              },
            },
          },
        }
      );
      // exercise.exrtime = 0;
      console.log(updateTimePerDay);
      // await updateTimePerDay.save();
    }

    // console.log(user.exercises.length);
    if (indexTotal === -1) {
      //user exr 전달

      // exrtime 초기화
      exercise.exrname = 0;
      exercise.exrtime = 0;
      //timePerDay에 새로운 날짜 추가
      const updateTimePerDay = await TimePerDay.findOneAndUpdate(
        { user: id },
        {
          $push: {
            timePerDay: {
              date: Today,
            },
          },
        }
      );
      await updateTimePerDay.save();
    }
    //add 1 to exrtime & total time
    user.exercises[indexExr].exrtime += 1;
    timePerDays.timePerDay[indexTotal].total += 1;

    await user.save();
    await timePerDays.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const profile = async (req, res) => {
  const user = await User.findById(req.session.user._id);

  console.log(user);

  return res.render("profile", { pageTitle: "프로필", user });
};

export const getStats = (req, res) => {
  return res.render("stats");
};

export const ranking = (req, res) => {
  return res.render("ranking");
};

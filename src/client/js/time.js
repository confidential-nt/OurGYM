class Time {
  static sumTime(date) {
    const targets = tmp.filter((data) => data.date === date);

    let sum = 0;

    for (let target of targets) {
      sum += target.time;
    }

    return sum;
  }

  static timeFormatter(seconds) {
    const hour = Math.floor(seconds / (60 * 60));
    const min = Math.floor((seconds % (60 * 60)) / 60);
    const sec = Math.floor((seconds % (60 * 60)) % 60);

    return { hour, min, sec };
  }

  static makeTimeString(formattedTime) {
    return `${
      formattedTime.hour < 10 ? `0${formattedTime.hour}` : formattedTime.hour
    }:${formattedTime.min < 10 ? `0${formattedTime.min}` : formattedTime.min}:${
      formattedTime.sec < 10 ? `0${formattedTime.sec}` : formattedTime.sec
    }`;
  }
}

export default Time;

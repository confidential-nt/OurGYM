const tmp = [
  { date: "2021-09-21", name: "눈깜빡이기", time: 4000, id: "1131" },
  { date: "2021-10-23", name: "숨쉬기", time: 2000, id: "1234" },
  { date: "2021-11-08", name: "잠자기", time: 1000, id: "4567" },
  { date: "2021-11-09", name: "살아있기", time: 1000 * 60 * 60, id: "7899" },
  { date: "2021-11-11", name: "밥먹기", time: 1000 * 60 * 120, id: "3553" },
];

// 시간 제대로 합해서
// 시간 형식 제대로 나타내기
// 아마 sumTime class 만들어야할듯>

const tmp2 = [
  { date: "2021-09-21", name: "눈깜빡이기", weight: 20, count: 30, id: "1131" },
  { date: "2021-10-23", name: "숨쉬기", weight: 10, count: 16, id: "1234" },
  { date: "2021-11-08", name: "잠자기", weight: 15, count: 26, id: "4567" },
  {
    date: "2021-11-09",
    name: "살아있기",
    weight: 15,
    count: 30,
    id: "7899",
  },
  {
    date: "2021-11-11",
    name: "밥먹기",
    weight: 20,
    count: 20,
    id: "3553",
  },
];

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
}

export default Time;

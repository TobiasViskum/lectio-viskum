type Props = {
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export function getTimeInMs({
  weeks = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
}: Props) {
  const msMap = {
    week: 1000 * 60 * 60 * 24 * 7,
    day: 1000 * 60 * 60 * 24,
    hours: 1000 * 60 * 60,
    minutes: 1000 * 60,
    seconds: 1000,
  };

  const sum =
    weeks * msMap.week +
    days * msMap.day +
    hours * msMap.hours +
    minutes * msMap.minutes +
    seconds * msMap.seconds;

  return sum;
}

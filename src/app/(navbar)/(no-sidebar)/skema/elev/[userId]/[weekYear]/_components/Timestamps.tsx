type Props = { timestamps: number[] };

export function Timestamps({ timestamps }: Props) {
  return (
    <>
      {timestamps.map((timeStamp, index) => {
        const strTimeStamp = timeStamp.toString();
        let strTime = "";
        if (timeStamp < 10) {
          const strTimeStamp = timeStamp.toString();
          strTime = ["0", strTimeStamp, ":00"].join("");
        } else {
          strTime = [strTimeStamp, ":00"].join("");
        }

        return (
          <p
            className="text-xs sm:text-sm"
            key={timeStamp}
            style={{ height: "var(--height-hour)" }}
          >
            {strTime}
          </p>
        );
      })}
    </>
  );
}

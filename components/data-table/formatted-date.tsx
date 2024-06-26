import { fromUnixTime } from "date-fns";
import { useFormatter } from "next-intl";

const FormattedDate = ({ timestamp }: { timestamp: number }) => {
  const format = useFormatter();
  const dateTime = fromUnixTime(timestamp);
  const distance = format.relativeTime(dateTime);

  return (
    <div className="flex max-w-[84px] text-muted-foreground sm:max-w-none">
      <span className="truncate">{distance}</span>
    </div>
  );
};

export default FormattedDate;

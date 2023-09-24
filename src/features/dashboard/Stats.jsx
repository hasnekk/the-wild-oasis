import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numOfDays, cabinCount }) {
  const numOfBookings = bookings.length;

  const sales = bookings
    .map((booking) => booking.totalPrice)
    .reduce((acm, curr) => acm + curr, 0);

  const checkins = confirmedStays.length;

  let occupancy = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0);
  occupancy /= numOfDays * cabinCount;
  occupancy *= 100;
  occupancy = Math.round(occupancy);

  return (
    <>
      <Stat
        title="Bookings"
        value={numOfBookings}
        icon={<HiOutlineBriefcase />}
        color="blue"
      />

      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineCurrencyDollar />}
        color="green"
      />

      <Stat
        title="Check ins"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
      />

      <Stat
        title="Occupancy rate"
        value={`${occupancy}%`}
        icon={<HiOutlineChartBar />}
        color="yellow"
      />
    </>
  );
}

export default Stats;

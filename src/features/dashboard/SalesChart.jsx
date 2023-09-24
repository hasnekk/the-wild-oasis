import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../../context/DarkModeContext";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;
function SalesChart({ bookings, numOfDays }) {
  const { isDarkMode } = useDarkMode();
  // const chartData = getChartData(bookings, numOfDays);  // my way

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numOfDays - 1),
    end: new Date(),
  });

  const chartData = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(allDates.length - 1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="4" />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            strokeWidth={2}
            fill={colors.totalSales.fill}
            name="Total sales"
            unit="$"
          />

          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            strokeWidth={2}
            fill={colors.extrasSales.fill}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

// function getChartData(bookings, numOfDays) {
//   let styledBookings = bookings.map((booking) => ({
//     ...booking,
//     created_at: booking.created_at.split("T").at(0),
//   }));

//   let arr = [];

//   let currentDate = new Date();
//   let numOfMiliSec; // days * hourPerDay * minPerHour * secPerMin * miliSecPerSec
//   for (let i = 0; i < numOfDays; i++) {
//     numOfMiliSec = (numOfDays - i - 1) * 24 * 60 * 60 * 1000;
//     let pastDate = new Date(currentDate - numOfMiliSec)
//       .toISOString()
//       .split("T")
//       .at(0);

//     let [totalSales, extrasSales] = calculatePrices(pastDate, styledBookings);

//     arr.push({
//       label: pastDate,
//       totalSales,
//       extrasSales,
//     });
//   }

//   return arr;
// }

// function calculatePrices(pastDate, styledBookings) {
//   let totalSalesPerDay = 0;
//   let extrasSalesPerDay = 0;

//   for (let { created_at, totalPrice, extrasPrice } of styledBookings) {
//     if (created_at === pastDate) {
//       totalSalesPerDay += totalPrice;
//       extrasSalesPerDay += extrasPrice;
//     }
//   }

//   return [totalSalesPerDay, extrasSalesPerDay];
// }

export default SalesChart;

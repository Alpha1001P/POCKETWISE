import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function SpendingTrendChart({
  transactions,
  trendView = "Month",
}) {

  const expenseTransactions = transactions.filter(
    (item) => item.type === "Expense"
  );

  let trendData = [];

  if (trendView === "Week") {

    const days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ];

    const data = {};

    days.forEach(day => {
      data[day] = 0;
    });

    expenseTransactions.forEach(item => {

      const date = new Date(item.date);

      const day = date.toLocaleString(
        "default",
        {
          weekday: "short"
        }
      );

      if (data[day] !== undefined) {
        data[day] += Number(item.amount);
      }

    });

    trendData = days.map(day => ({
      name: day,
      amount: data[day]
    }));

  }

  else if (trendView === "Month") {

    const daysInMonth =
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate();

    const data = {};

    for (let i = 1; i <= daysInMonth; i++) {
      data[i] = 0;
    }

    expenseTransactions.forEach(item => {

      const date = new Date(item.date);

      if (
        date.getMonth() ===
        new Date().getMonth()
      ) {

        const day = date.getDate();

        data[day] += Number(item.amount);

      }

    });

    trendData = Object.keys(data).map(day => ({
      name: `${day}`,
      amount: data[day]
    }));

  }

  else if (trendView === "Year") {

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const data = {};

    months.forEach(month => {
      data[month] = 0;
    });

    expenseTransactions.forEach(item => {

      const date = new Date(item.date);

      const month = date.toLocaleString(
        "default",
        {
          month: "short"
        }
      );

      data[month] += Number(item.amount);

    });

    trendData = months.map(month => ({
      name: month,
      amount: data[month]
    }));

  }
return (

  <ResponsiveContainer
    width="100%"
    height={320}
  >

    <AreaChart data={trendData}>

      <defs>

        <linearGradient
          id="colorExpense"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >

          <stop
            offset="5%"
            stopColor="#4F46E5"
            stopOpacity={0.35}
          />

          <stop
            offset="95%"
            stopColor="#4F46E5"
            stopOpacity={0}
          />

        </linearGradient>

      </defs>

      <CartesianGrid
        stroke="#eef2f7"
        vertical={false}
      />

      <XAxis
        dataKey="name"
        tick={{ fontSize: 12 }}
        tickLine={false}
        axisLine={false}
      />

      <YAxis
        tickFormatter={(v) => `₹${v}`}
        tick={{ fontSize: 12 }}
        tickLine={false}
        axisLine={false}
      />

      <Tooltip
        formatter={(value) =>
          `₹${Number(value).toLocaleString("en-IN")}`
        }
      />

      <Area
        type="monotone"
        dataKey="amount"
        stroke="#4F46E5"
        strokeWidth={3}
        fill="url(#colorExpense)"
        activeDot={{
          r:6
        }}
      />

    </AreaChart>

  </ResponsiveContainer>

);

}

export default SpendingTrendChart;
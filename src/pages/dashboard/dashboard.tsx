import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";

const barData = [
  { name: "Yanvar", Xizmatlar: 40, Xonadonlar: 24 },
  { name: "Fevral", Xizmatlar: 30, Xonadonlar: 13 },
  { name: "Mart", Xizmatlar: 20, Xonadonlar: 98 },
  { name: "Aprel", Xizmatlar: 27, Xonadonlar: 39 },
  { name: "May", Xizmatlar: 18, Xonadonlar: 48 },
  { name: "Iyun", Xizmatlar: 23, Xonadonlar: 38 },
  { name: "Iyul", Xizmatlar: 34, Xonadonlar: 43 },
];

const pieData = [
  { name: "Xizmatlar", value: 400 },
  { name: "Xonadonlar", value: 300 },
  { name: "Fuqorolar", value: 300 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const lineData = [
  { oy: "Yanvar", Fuqorolar: 240 },
  { oy: "Fevral", Fuqorolar: 221 },
  { oy: "Mart", Fuqorolar: 229 },
  { oy: "Aprel", Fuqorolar: 200 },
  { oy: "May", Fuqorolar: 218 },
  { oy: "Iyun", Fuqorolar: 250 },
  { oy: "Iyul", Fuqorolar: 210 },
];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {/* Stat Cards */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Jami xizmatlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">1,200</div>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Jami xonadonlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">850</div>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Jami fuqorolar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">3,500</div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="col-span-1 md:col-span-2 xl:col-span-2">
        <CardHeader>
          <CardTitle>Oylik xizmat va xonadonlar statistikasi</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Xizmatlar" fill="#0088FE" />
              <Bar dataKey="Xonadonlar" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Umumiy taqsimot</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="col-span-1 md:col-span-2 xl:col-span-3">
        <CardHeader>
          <CardTitle>Fuqorolar sonining oylik o‘zgarishi</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="oy" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Fuqorolar" stroke="#FFBB28" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

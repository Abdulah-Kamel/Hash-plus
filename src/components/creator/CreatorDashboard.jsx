"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calendar, ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// --- Dummy Data ---
const chartData = [
  { date: "Jan 11", profit: 350 },
  { date: "Jan 15", profit: 340 },
  { date: "Jan 25", profit: 150 },
  { date: "Feb 01", profit: 100 },
  { date: "Feb 11", profit: 250 },
  { date: "Feb 20", profit: 150 },
  { date: "Mar 01", profit: 50 },
  { date: "Mar 11", profit: 600 },
  { date: "Mar 20", profit: 250 },
  { date: "Apr 01", profit: 150 },
  { date: "Apr 11", profit: 380 },
  { date: "Apr 25", profit: 100 },
  { date: "May 01", profit: 200 },
  { date: "May 11", profit: 50 },
  { date: "May 20", profit: 280 },
];

const chartConfig = {
  profit: {
    label: "الربح",
    color: "hsl(var(--primary))",
  },
};

const purchaseList = [
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "في المحفظة" },
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "معلق" },
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "تم السحب" },
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "معلق" },
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "في المحفظة" },
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "معلق" },
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "تم السحب" },
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "في المحفظة" },
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "في المحفظة" },
  { id: "#1234562", student: "محمود علي ابراهيم", content: "مذكرة JavaScript", date: "02/05/2025", amount: 400, status: "تم السحب" },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "في المحفظة":
      return <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-full text-xs font-medium">{status}</span>;
    case "معلق":
      return <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-medium">{status}</span>;
    case "تم السحب":
      return <span className="px-3 py-1 bg-purple-50 text-purple-500 rounded-full text-xs font-medium">{status}</span>;
    default:
      return <span>{status}</span>;
  }
};

const CreatorDashboard = () => {
  const [chartFilter, setChartFilter] = useState("يومي");

  return (
    <div className="w-full space-y-8" dir="rtl">
      {/* --- Top Header & Stats --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">إحصائيات</h2>
          <Select defaultValue="this_week" dir="rtl">
            <SelectTrigger className="w-[180px] bg-white rounded-lg h-10 border-gray-200">
              <Calendar className="w-4 h-4 ml-2 text-gray-500" />
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this_week">هذا الأسبوع</SelectItem>
              <SelectItem value="this_month">هذا الشهر</SelectItem>
              <SelectItem value="this_year">هذا العام</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat 1 */}
          <Card className="rounded-2xl border-none shadow-sm bg-gray-50/50">
            <CardHeader className="flex flex-row items-center justify-end pb-2 pt-6 px-6">
              <CardTitle className="text-sm font-medium text-gray-500 text-right w-full">الأرباح</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold" dir="ltr">
                  <TrendingUp className="w-3 h-3" />
                  1.04%
                </div>
                <div className="text-2xl font-bold font-sans">2,345 <span className="text-sm font-medium">ريال</span></div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stat 2 */}
          <Card className="rounded-2xl border-none shadow-sm bg-gray-50/50">
            <CardHeader className="flex flex-row items-center justify-end pb-2 pt-6 px-6">
              <CardTitle className="text-sm font-medium text-gray-500 text-right w-full">عدد المقررات</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold" dir="ltr">
                  <TrendingDown className="w-3 h-3" />
                  0.38%
                </div>
                <div className="text-2xl font-bold font-sans">2</div>
              </div>
            </CardContent>
          </Card>

          {/* Stat 3 */}
          <Card className="rounded-2xl border-none shadow-sm bg-gray-50/50">
            <CardHeader className="flex flex-row items-center justify-end pb-2 pt-6 px-6">
              <CardTitle className="text-sm font-medium text-gray-500 text-right w-full">عدد الطلاب</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold" dir="ltr">
                  <TrendingUp className="w-3 h-3" />
                  3.82%
                </div>
                <div className="text-2xl font-bold font-sans">186</div>
              </div>
            </CardContent>
          </Card>

          {/* Stat 4 */}
          <Card className="rounded-2xl border-none shadow-sm bg-gray-50/50">
            <CardHeader className="flex flex-row items-center justify-end pb-2 pt-6 px-6">
              <CardTitle className="text-sm font-medium text-gray-500 text-right w-full">عمليات الشراء الجديدة</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold" dir="ltr">
                  <TrendingUp className="w-3 h-3" />
                  23.08%
                </div>
                <div className="text-2xl font-bold font-sans">6</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- Chart Section --- */}
      <Card className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Select defaultValue="profit" dir="rtl">
              <SelectTrigger className="w-[120px] bg-white rounded-lg h-10 border-gray-200 font-medium">
                <SelectValue placeholder="اختر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profit">الربح</SelectItem>
                <SelectItem value="sales">المبيعات</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
              {["يومي", "اسبوعي", "شهري"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setChartFilter(filter)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    chartFilter === filter
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 cursor-pointer">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>02/09/2025 - 02/09/2025</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <ChartContainer config={chartConfig} className="w-full h-[300px]">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-profit)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-profit)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tickMargin={10} 
                tick={{ fill: "#9CA3AF", fontSize: 12 }} 
                dir="ltr"
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickMargin={10}
                orientation="right"
              />
              <ChartTooltip 
                content={
                  <ChartTooltipContent 
                    className="bg-white border-gray-200 shadow-md rounded-xl p-3" 
                    formatter={(value) => (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{value} ريال</span>
                        <div className="bg-green-100 text-green-700 px-1.5 rounded text-[10px] font-bold flex items-center">
                          <TrendingUp className="w-3 h-3" />
                          +31%
                        </div>
                      </div>
                    )}
                  />
                } 
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="var(--color-profit)"
                strokeWidth={2}
                fill="url(#fillProfit)"
                dot={{ r: 4, fill: "var(--color-profit)", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "var(--color-profit)", strokeWidth: 3, stroke: "#fff" }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* --- Table Section --- */}
      <Card className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="p-6 pb-4 border-b border-gray-50">
          <CardTitle className="text-xl font-bold text-gray-900">قائمة أرباح عمليات الشراء</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="w-full">
            <TableHeader className="bg-white">
              <TableRow className="border-b-gray-100 hover:bg-transparent">
                <TableHead className="text-right font-medium text-gray-500 py-4 px-6">رقم العملية</TableHead>
                <TableHead className="text-right font-medium text-gray-500 py-4 px-6">اسم الطالب</TableHead>
                <TableHead className="text-right font-medium text-gray-500 py-4 px-6">اسم المحتوى</TableHead>
                <TableHead className="text-right font-medium text-gray-500 py-4 px-6">تاريخ العملية</TableHead>
                <TableHead className="text-right font-medium text-gray-500 py-4 px-6">إجمالي العملية</TableHead>
                <TableHead className="text-right font-medium text-gray-500 py-4 px-6">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseList.map((row, idx) => (
                <TableRow key={idx} className="border-b-gray-50 hover:bg-gray-50/50">
                  <TableCell className="text-gray-500 py-4 px-6 font-medium">{row.id}</TableCell>
                  <TableCell className="text-gray-900 py-4 px-6 font-medium">{row.student}</TableCell>
                  <TableCell className="text-gray-900 py-4 px-6 font-medium">{row.content}</TableCell>
                  <TableCell className="text-gray-500 py-4 px-6">{row.date}</TableCell>
                  <TableCell className="text-gray-900 py-4 px-6 font-bold">{row.amount} ريال</TableCell>
                  <TableCell className="py-4 px-6">
                    {getStatusBadge(row.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 p-6 border-t border-gray-50">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-medium text-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50">3</button>
            <span className="text-gray-400 tracking-widest px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50">10</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorDashboard;

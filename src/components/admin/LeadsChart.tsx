"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChartData {
  name: string;
  inquiries: number;
  scouts: number;
  orders: number;
}

export default function LeadsChart({ data, currentRange = 6 }: { data: ChartData[], currentRange?: number }) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-slate-100 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0B1528] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            Tren Leads
          </h2>
          <p className="text-slate-500 text-sm mt-1">Permintaan dan pesanan {currentRange} bulan terakhir</p>
        </div>
        <select 
          className="bg-slate-50 border border-slate-200 text-[#0B1528] text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2.5 outline-none font-medium"
          value={currentRange}
          onChange={(e) => {
            router.push(`/admin?range=${e.target.value}`);
          }}
        >
          <option value="3">3 Bulan Terakhir</option>
          <option value="6">6 Bulan Terakhir</option>
          <option value="9">9 Bulan Terakhir</option>
          <option value="12">12 Bulan Terakhir</option>
        </select>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ fontSize: '13px', fontWeight: 600 }}
            labelStyle={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            name="Permintaan Properti"
            dataKey="inquiries" 
            stroke="#eab308" 
            strokeWidth={3}
            dot={{ r: 4, fill: "#eab308", strokeWidth: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line 
            type="monotone" 
            name="Pendaftaran Scout"
            dataKey="scouts" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line 
            type="monotone" 
            name="Pesanan Paket"
            dataKey="orders" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

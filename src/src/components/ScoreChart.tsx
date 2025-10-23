import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface AuditPoint {
  id: number;
  area: string;
  description: string;
  status: "pass" | "warning" | "fail";
  score: number;
  notes: string;
  screenshot: string;
}

interface ScoreChartProps {
  data: AuditPoint[];
}

export function ScoreChart({ data }: ScoreChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const chartData = data.map(point => ({
    name: point.area,
    score: point.score,
    status: point.status
  }));

  const getBarColor = (status: string) => {
    switch (status) {
      case "pass":
        return "#16a34a"; // green-600
      case "warning":
        return "#f59e0b"; // amber-500
      case "fail":
        return "#dc2626"; // red-600
      default:
        return "#64748b"; // slate-500
    }
  };

  // Mobile: Horizontal bars (better for small screens)
  if (isMobile) {
    return (
      <ResponsiveContainer width="100%" height={600}>
        <BarChart 
          data={chartData} 
          layout="vertical"
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            domain={[0, 100]}
            tick={{ fontSize: 11 }}
            stroke="#64748b"
          />
          <YAxis 
            type="category" 
            dataKey="name"
            width={100}
            tick={{ fontSize: 11 }}
            stroke="#64748b"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px'
            }}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Desktop: Vertical bars
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          height={100}
          tick={{ fontSize: 12 }}
          stroke="#64748b"
        />
        <YAxis 
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          stroke="#64748b"
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        />
        <Bar dataKey="score" radius={[8, 8, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

import React, { useState, useMemo, useEffect } from 'react';
import {
  TrendingUp, ArrowUpRight, DollarSign, Users, Award, LayoutGrid,
  Calendar, Filter, Bell, ChevronDown, User, Settings, LogOut,
  Search, Mail, Lock, MapPin, Truck, Activity, Shield,
  Clock, CheckCircle2, Camera, ShieldAlert, Sliders, Briefcase,
  RefreshCw, Download, SlidersHorizontal, Layers, Globe, Zap,
  BarChart3, LineChart, PieChart, TrendingDown, Eye, EyeOff,
  Copy, Share2, FileJson, FileSpreadsheet, Maximize2, X as XIcon,
  AlertTriangle, Gauge, Target, Zap as ZapIcon, Heart
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// ADVANCED THEME & DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════════════════
const THEME = {
  colors: {
    bg: {
      primary: '#0a0e1a',
      secondary: '#0f1423',
      tertiary: '#151d2f',
      surface: '#1a232f',
    },
    accent: {
      primary: '#4ea5ff',
      secondary: '#36d399',
      warning: '#ffb020',
      danger: '#ff5c5c',
      purple: '#8b5cf6',
      cyan: '#06b6d4',
      pink: '#ec4899',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0c4de',
      tertiary: '#7a8fa6',
      placeholder: '#546b82',
    },
    border: {
      light: '#2a3a4f',
      medium: '#3a4a5f',
      accent: '#4ea5ff',
    }
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ADVANCED ANALYTICS DATA
// ═══════════════════════════════════════════════════════════════════════════
const analyticsDataSet = {
  daily: [
    { date: 'Jul 01', revenue: 42000, expenses: 28000, profit: 14000, transactions: 124, users: 156, roi: 8.2 },
    { date: 'Jul 02', revenue: 51000, expenses: 32000, profit: 19000, transactions: 156, users: 198, roi: 12.4 },
    { date: 'Jul 03', revenue: 38000, expenses: 25000, profit: 13000, transactions: 98, users: 142, roi: 10.1 },
    { date: 'Jul 04', revenue: 62000, expenses: 38000, profit: 24000, transactions: 178, users: 214, roi: 15.2 },
    { date: 'Jul 05', revenue: 55000, expenses: 34000, profit: 21000, transactions: 165, users: 189, roi: 14.8 },
    { date: 'Jul 06', revenue: 71000, expenses: 42000, profit: 29000, transactions: 198, users: 231, roi: 18.6 },
    { date: 'Jul 07', revenue: 48000, expenses: 29000, profit: 19000, transactions: 142, users: 167, roi: 11.9 },
    { date: 'Jul 08', revenue: 59000, expenses: 36000, profit: 23000, transactions: 171, users: 205, roi: 16.2 },
    { date: 'Jul 09', revenue: 65000, expenses: 40000, profit: 25000, transactions: 187, users: 223, roi: 17.1 },
    { date: 'Jul 10', revenue: 72000, expenses: 44000, profit: 28000, transactions: 203, users: 248, roi: 19.4 },
    { date: 'Jul 11', revenue: 78000, expenses: 47000, profit: 31000, transactions: 215, users: 267, roi: 21.2 },
    { date: 'Jul 12', revenue: 82400, expenses: 50000, profit: 32400, transactions: 228, users: 289, roi: 22.8 },
  ],
  byCategory: [
    { name: 'Electronics', value: 245000, percentage: 28 },
    { name: 'Fashion', value: 198000, percentage: 22 },
    { name: 'Home & Garden', value: 165000, percentage: 19 },
    { name: 'Sports', value: 142000, percentage: 16 },
    { name: 'Books', value: 108000, percentage: 12 },
    { name: 'Other', value: 42000, percentage: 5 },
  ],
  regions: [
    { name: 'Lahore', value: 245000, growth: 12.5 },
    { name: 'Karachi', value: 198000, growth: 8.2 },
    { name: 'Islamabad', value: 165000, growth: 15.8 },
    { name: 'Rawalpindi', value: 142000, growth: 6.4 },
    { name: 'Peshawar', value: 108000, growth: 9.7 },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// REUSABLE: PREMIUM CARD
// ═══════════════════════════════════════════════════════════════════════════
function PremiumCard({ children, className = '', variant = 'default' }) {
  const variants = {
    default: `bg-gradient-to-br from-[#151d2f]/80 to-[#0f1423]/80 border-[#2a3a4f] hover:border-[#4ea5ff]/40`,
    accent: `bg-gradient-to-br from-[#4ea5ff]/5 to-[#2979d0]/5 border-[#4ea5ff]/20 hover:border-[#4ea5ff]/60`,
    success: `bg-gradient-to-br from-[#36d399]/5 to-[#1a9d6f]/5 border-[#36d399]/20 hover:border-[#36d399]/60`,
  };

  return (
    <div className={`rounded-3xl p-6 transition-all duration-500 border backdrop-blur-xl ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ADVANCED STAT CARD
// ═══════════════════════════════════════════════════════════════════════════
function AdvancedStatCard({ icon: Icon, label, value, trend, color = 'blue', comparison = '', detail = '' }) {
  const colorMap = {
    blue: { bg: '#4ea5ff', light: '#4ea5ff/10', icon: '#4ea5ff' },
    green: { bg: '#36d399', light: '#36d399/10', icon: '#36d399' },
    red: { bg: '#ff5c5c', light: '#ff5c5c/10', icon: '#ff5c5c' },
    purple: { bg: '#8b5cf6', light: '#8b5cf6/10', icon: '#8b5cf6' },
    cyan: { bg: '#06b6d4', light: '#06b6d4/10', icon: '#06b6d4' },
    pink: { bg: '#ec4899', light: '#ec4899/10', icon: '#ec4899' },
  };

  const colorScheme = colorMap[color];
  const isTrendUp = trend && trend.includes('+');

  return (
    <PremiumCard variant="default" className="relative overflow-hidden group h-full">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
           style={{ background: `radial-gradient(circle at top right, ${colorScheme.bg}/10, transparent)` }} />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-2xl flex items-center justify-center backdrop-blur-sm border"
               style={{ background: colorScheme.light, borderColor: `${colorScheme.bg}40`, color: colorScheme.icon }}>
            <Icon size={18} />
          </div>
          {trend && (
            <span className={`text-xs font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg backdrop-blur-sm border ${
              isTrendUp 
                ? 'bg-[#36d399]/15 text-[#36d399] border-[#36d399]/30' 
                : 'bg-[#ff5c5c]/15 text-[#ff5c5c] border-[#ff5c5c]/30'
            }`}>
              {isTrendUp ? <ArrowUpRight size={11} /> : <TrendingDown size={11} />}
              {trend}
            </span>
          )}
        </div>

        {/* Label */}
        <div>
          <p className="text-xs font-bold text-[#b0c4de] uppercase tracking-widest">{label}</p>
          {detail && <p className="text-[10px] text-[#7a8fa6] mt-1">{detail}</p>}
        </div>

        {/* Value */}
        <h2 className="text-2xl sm:text-3xl font-black text-white font-mono">{value}</h2>

        {/* Comparison */}
        {comparison && (
          <p className="text-xs text-[#7a8fa6]">{comparison}</p>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#4ea5ff]/40 to-transparent group-hover:via-[#4ea5ff]/80 transition-all duration-500" />
    </PremiumCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INTERACTIVE LINE CHART
// ═══════════════════════════════════════════════════════════════════════════
function InteractiveLineChart({ data, title, subtitle, metrics = ['revenue', 'expenses', 'profit'] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState(metrics);

  const metricConfig = {
    revenue: { color: '#4ea5ff', label: 'Revenue', key: 'revenue' },
    expenses: { color: '#ffb020', label: 'Expenses', key: 'expenses' },
    profit: { color: '#36d399', label: 'Profit', key: 'profit' },
    users: { color: '#ec4899', label: 'Users', key: 'users' },
    roi: { color: '#8b5cf6', label: 'ROI %', key: 'roi' },
  };

  const maxValue = Math.max(...data.map(d => Math.max(d.revenue, d.expenses, d.profit)));
  const calculateY = (value) => 160 - (value / maxValue) * 140;

  const generatePath = (key) => {
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * 500;
      const y = calculateY(d[key]);
      return `${x},${y}`;
    }).join(' L ');
  };

  return (
    <PremiumCard variant="default" className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h3>
          <p className="text-xs text-[#7a8fa6] mt-2">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 bg-[#151d2f] border border-[#2a3a4f] px-3 py-1.5 rounded-xl text-xs font-bold text-[#4ea5ff]">
          <RefreshCw size={12} className="animate-spin" /> Live Sync
        </div>
      </div>

      {/* Metric Toggle */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(metricConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedMetrics(prev => 
              prev.includes(key) ? prev.filter(m => m !== key) : [...prev, key]
            )}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
              selectedMetrics.includes(key)
                ? 'bg-[#151d2f] border border-[#4ea5ff] text-white'
                : 'bg-[#0a0e1a] border border-[#2a3a4f] text-[#7a8fa6] hover:border-[#2a3a4f]'
            }`}
            style={selectedMetrics.includes(key) ? { borderColor: config.color, color: config.color } : {}}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative h-80 w-full bg-[#0a0e1a]/60 rounded-2xl p-6 border border-[#2a3a4f]/60 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(circle at center, #4ea5ff/10, transparent 70%)'
        }} />

        <svg className="w-full h-full overflow-visible relative z-10" viewBox="0 0 500 180" preserveAspectRatio="none">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Grid */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line key={`grid-${y}`} x1="0" y1={y} x2="500" y2={y} stroke="#2a3a4f" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.3" />
          ))}

          {/* Lines */}
          {selectedMetrics.map((metric) => (
            <path
              key={`line-${metric}`}
              d={`M 0,${calculateY(data[0][metricConfig[metric].key])} L ${generatePath(metricConfig[metric].key)}`}
              fill="none"
              stroke={metricConfig[metric].color}
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              opacity="0.8"
            />
          ))}

          {/* Interactive Points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 500;
            const isHovered = hoveredIndex === i;

            return (
              <g key={`point-${i}`} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                {selectedMetrics.map((metric) => {
                  const y = calculateY(d[metricConfig[metric].key]);
                  return (
                    <circle
                      key={`circle-${metric}`}
                      cx={x}
                      cy={y}
                      r={isHovered ? "6" : "4"}
                      fill="#0a0e1a"
                      stroke={metricConfig[metric].color}
                      strokeWidth={isHovered ? "3" : "2"}
                      className="transition-all duration-200"
                    />
                  );
                })}

                {isHovered && (
                  <>
                    <line x1={x} y1="0" x2={x} y2="160" stroke="#4ea5ff" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                    <g>
                      {selectedMetrics.map((metric, idx) => (
                        <text
                          key={`text-${metric}`}
                          x={x}
                          y={30 + idx * 18}
                          textAnchor="middle"
                          className="text-[10px] font-bold fill-white"
                          dominantBaseline="middle"
                        >
                          {metricConfig[metric].label}: {d[metricConfig[metric].key]}
                        </text>
                      ))}
                    </g>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#2a3a4f]/60">
        <div className="p-3 space-y-1 text-center">
          <p className="text-[10px] text-[#546b82] uppercase font-bold">Peak Value</p>
          <p className="text-lg font-bold text-[#4ea5ff] font-mono">PKR {(maxValue / 1000).toFixed(0)}K</p>
        </div>
        <div className="p-3 space-y-1 text-center">
          <p className="text-[10px] text-[#546b82] uppercase font-bold">Avg Value</p>
          <p className="text-lg font-bold text-[#36d399] font-mono">PKR {(data.reduce((a, d) => a + d.revenue, 0) / data.length / 1000).toFixed(0)}K</p>
        </div>
        <div className="p-3 space-y-1 text-center">
          <p className="text-[10px] text-[#546b82] uppercase font-bold">Total Days</p>
          <p className="text-lg font-bold text-white font-mono">{data.length}</p>
        </div>
        <div className="p-3 space-y-1 text-center">
          <p className="text-[10px] text-[#546b82] uppercase font-bold">Growth</p>
          <p className="text-lg font-bold text-[#36d399]">+{((data[data.length - 1].revenue / data[0].revenue - 1) * 100).toFixed(1)}%</p>
        </div>
      </div>
    </PremiumCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY PIE CHART
// ═══════════════════════════════════════════════════════════════════════════
function CategoryPieChart({ data, title }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <PremiumCard variant="default" className="space-y-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Pie Chart */}
        <div className="flex justify-center">
          <svg width="240" height="240" viewBox="0 0 240 240" className="overflow-visible">
            <defs>
              <linearGradient id="gradPie1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ea5ff" />
                <stop offset="100%" stopColor="#2979d0" />
              </linearGradient>
              <linearGradient id="gradPie2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#c026d3" />
              </linearGradient>
              <linearGradient id="gradPie3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#36d399" />
                <stop offset="100%" stopColor="#1a9d6f" />
              </linearGradient>
              <linearGradient id="gradPie4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb020" />
                <stop offset="100%" stopColor="#ff8c42" />
              </linearGradient>
              <linearGradient id="gradPie5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradPie6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
            </defs>

            {data.map((item, idx) => {
              const startAngle = (data.slice(0, idx).reduce((sum, i) => sum + i.percentage, 0) / 100) * 360;
              const endAngle = startAngle + (item.percentage / 100) * 360;
              
              const start = (startAngle * Math.PI) / 180;
              const end = (endAngle * Math.PI) / 180;
              
              const x1 = 120 + 100 * Math.cos(start);
              const y1 = 120 + 100 * Math.sin(start);
              const x2 = 120 + 100 * Math.cos(end);
              const y2 = 120 + 100 * Math.sin(end);
              
              const large = item.percentage > 50 ? 1 : 0;
              const gradId = `gradPie${idx + 1}`;

              return (
                <path
                  key={`pie-${idx}`}
                  d={`M 120 120 L ${x1} ${y1} A 100 100 0 ${large} 1 ${x2} ${y2} Z`}
                  fill={`url(#${gradId})`}
                  stroke="#0a0e1a"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedCategory(idx)}
                  opacity={selectedCategory === null || selectedCategory === idx ? 1 : 0.4}
                />
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {data.map((item, idx) => {
            const colors = ['#4ea5ff', '#ec4899', '#36d399', '#ffb020', '#8b5cf6', '#06b6d4'];
            return (
              <button
                key={`cat-${idx}`}
                onClick={() => setSelectedCategory(selectedCategory === idx ? null : idx)}
                className={`w-full p-4 rounded-xl transition-all duration-300 text-left border ${
                  selectedCategory === null || selectedCategory === idx
                    ? 'border-[#2a3a4f] bg-[#151d2f] hover:bg-[#1a232f]'
                    : 'border-[#2a3a4f] bg-[#0a0e1a] opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ background: colors[idx] }} />
                    <div>
                      <p className="text-xs font-bold text-white">{item.name}</p>
                      <p className="text-[10px] text-[#7a8fa6]">PKR {(item.value / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-white">{item.percentage}%</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </PremiumCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// REGIONAL PERFORMANCE CHART
// ═══════════════════════════════════════════════════════════════════════════
function RegionalChart({ data, title }) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <PremiumCard variant="default" className="space-y-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h3>

      <div className="space-y-4">
        {data.map((region, idx) => {
          const percentage = (region.value / maxValue) * 100;
          const colors = ['#4ea5ff', '#ec4899', '#36d399', '#ffb020', '#8b5cf6'];
          const trendUp = region.growth > 10;

          return (
            <div key={`region-${idx}`} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: colors[idx] }} />
                  <span className="text-sm font-bold text-white">{region.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white">PKR {(region.value / 1000).toFixed(0)}K</p>
                  <p className={`text-[10px] flex items-center gap-1 ${trendUp ? 'text-[#36d399]' : 'text-[#ffb020]'}`}>
                    {trendUp ? <ArrowUpRight size={10} /> : <TrendingDown size={10} />}
                    {region.growth}%
                  </p>
                </div>
              </div>
              <div className="h-3 bg-[#0a0e1a] rounded-full overflow-hidden border border-[#2a3a4f]">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    background: `linear-gradient(90deg, ${colors[idx]}, ${colors[idx]}dd)`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </PremiumCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ADVANCED DATE RANGE PICKER
// ═══════════════════════════════════════════════════════════════════════════
function DateRangePicker({ onDateRangeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('7d');

  const ranges = [
    { id: '7d', label: 'Last 7 days', value: 7 },
    { id: '30d', label: 'Last 30 days', value: 30 },
    { id: '90d', label: 'Last 90 days', value: 90 },
    { id: '1y', label: 'Last Year', value: 365 },
    { id: 'ytd', label: 'Year to Date', value: 'ytd' },
    { id: 'custom', label: 'Custom Range', value: 'custom' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#151d2f] border border-[#2a3a4f] text-white rounded-xl text-xs font-bold hover:border-[#4ea5ff] transition-all duration-300"
      >
        <Calendar size={14} className="text-[#4ea5ff]" />
        {ranges.find(r => r.id === selectedRange)?.label}
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-[#151d2f] to-[#0f1423] border border-[#2a3a4f] rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl">
          {ranges.map((range) => (
            <button
              key={range.id}
              onClick={() => {
                setSelectedRange(range.id);
                setIsOpen(false);
                onDateRangeChange?.(range.id);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors ${
                selectedRange === range.id
                  ? 'text-[#4ea5ff] bg-[#4ea5ff]/15'
                  : 'text-[#7a8fa6] hover:bg-[#1a232f] hover:text-white'
              }`}
            >
              {range.label}
              {selectedRange === range.id && <CheckCircle2 size={12} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT DIALOG
// ═══════════════════════════════════════════════════════════════════════════
function ExportDialog({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const handleExport = (format) => {
    let content = '';
    
    if (format === 'csv') {
      const headers = ['Date', 'Revenue', 'Expenses', 'Profit', 'Transactions', 'Users', 'ROI'];
      const rows = data.map(d => [d.date, d.revenue, d.expenses, d.profit, d.transactions, d.users, d.roi]);
      content = [headers, ...rows].map(row => row.join(',')).join('\n');
      const blob = new Blob([content], { type: 'text/csv' });
      downloadFile(blob, 'analytics-report.csv');
    } else if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      downloadFile(blob, 'analytics-report.json');
    }
  };

  const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <PremiumCard variant="default" className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Export Report</h2>
          <button onClick={onClose} className="text-[#7a8fa6] hover:text-white">
            <XIcon size={20} />
          </button>
        </div>

        <p className="text-sm text-[#7a8fa6]">Choose your preferred export format:</p>

        <div className="space-y-3">
          <button
            onClick={() => { handleExport('csv'); onClose(); }}
            className="w-full flex items-center gap-3 p-4 bg-[#151d2f] border border-[#2a3a4f] rounded-xl hover:border-[#4ea5ff] hover:bg-[#1a232f] transition-all duration-300"
          >
            <FileSpreadsheet size={20} className="text-[#36d399]" />
            <div className="text-left">
              <p className="text-sm font-bold text-white">CSV Format</p>
              <p className="text-xs text-[#7a8fa6]">Open in Excel or Sheets</p>
            </div>
          </button>

          <button
            onClick={() => { handleExport('json'); onClose(); }}
            className="w-full flex items-center gap-3 p-4 bg-[#151d2f] border border-[#2a3a4f] rounded-xl hover:border-[#4ea5ff] hover:bg-[#1a232f] transition-all duration-300"
          >
            <FileJson size={20} className="text-[#ec4899]" />
            <div className="text-left">
              <p className="text-sm font-bold text-white">JSON Format</p>
              <p className="text-xs text-[#7a8fa6]">For API integration</p>
            </div>
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#151d2f] border border-[#2a3a4f] text-white rounded-lg font-bold text-xs hover:bg-[#1a232f] transition-all"
          >
            Cancel
          </button>
        </div>
      </PremiumCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN ADVANCED DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════
export default function FullAdvancedDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const today = new Date();
  const lastUpdated = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen" style={{ background: THEME.colors.bg.primary }}>
      {/* HEADER */}
      <header className="border-b border-[#2a3a4f]/40 bg-gradient-to-r from-[#0a0e1a] to-[#0f1423] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Logo & Title */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#4ea5ff] to-[#2979d0] flex items-center justify-center">
                  <ZapIcon size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Advanced Analytics</h1>
                  <p className="text-xs text-[#7a8fa6]">Real-time Business Intelligence Dashboard</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <DateRangePicker onDateRangeChange={setTimeRange} />
              
              <button
                onClick={() => setExportDialogOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#4ea5ff] to-[#2979d0] text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-[#4ea5ff]/30 transition-all"
              >
                <Download size={14} /> Export
              </button>

              <button className="h-10 w-10 flex items-center justify-center bg-[#151d2f] border border-[#2a3a4f] rounded-xl text-[#7a8fa6] hover:text-white hover:border-[#4ea5ff] transition-all">
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdvancedStatCard
            icon={DollarSign}
            label="Total Revenue"
            value="PKR 823K"
            trend="+26.4%"
            color="blue"
            detail="Last 12 days"
          />
          <AdvancedStatCard
            icon={TrendingUp}
            label="Profit Margin"
            value="38.2%"
            trend="+5.2%"
            color="green"
            detail="Average growth"
          />
          <AdvancedStatCard
            icon={Users}
            label="Active Users"
            value="2,847"
            trend="+12.8%"
            color="purple"
            detail="New registrations"
          />
          <AdvancedStatCard
            icon={Activity}
            label="System Health"
            value="99.84%"
            trend="Stable"
            color="cyan"
            detail="All systems operational"
          />
        </div>

        {/* Main Chart */}
        <InteractiveLineChart
          data={analyticsDataSet.daily}
          title="Capital Flow Analysis"
          subtitle="Revenue, Expenses, and Profit trends with real-time tracking"
          metrics={['revenue', 'expenses', 'profit']}
        />

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryPieChart
            data={analyticsDataSet.byCategory}
            title="Revenue by Category"
          />
          <RegionalChart
            data={analyticsDataSet.regions}
            title="Regional Performance"
          />
        </div>

        {/* Advanced Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PremiumCard variant="accent" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Conversion Rate</h3>
              <Target size={16} className="text-[#36d399]" />
            </div>
            <div className="text-3xl font-black text-[#36d399] font-mono">3.24%</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#36d399] font-bold">+0.45%</span>
              <span className="text-[#7a8fa6]">vs yesterday</span>
            </div>
          </PremiumCard>

          <PremiumCard variant="default" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Avg Order Value</h3>
              <Gauge size={16} className="text-[#ec4899]" />
            </div>
            <div className="text-3xl font-black text-[#ec4899] font-mono">PKR 3,600</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#ec4899] font-bold">+12.3%</span>
              <span className="text-[#7a8fa6]">trend</span>
            </div>
          </PremiumCard>

          <PremiumCard variant="default" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">Customer Retention</h3>
              <Heart size={16} className="text-[#ff5c5c]" />
            </div>
            <div className="text-3xl font-black text-[#ff5c5c] font-mono">87.6%</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#ff5c5c] font-bold">+3.2%</span>
              <span className="text-[#7a8fa6]">improvement</span>
            </div>
          </PremiumCard>
        </div>

        {/* Last Updated */}
        <div className="flex justify-center">
          <p className="text-xs text-[#546b82]">Last updated: {lastUpdated} • All data is real-time</p>
        </div>
      </main>

      {/* EXPORT DIALOG */}
      <ExportDialog
        isOpen={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        data={analyticsDataSet.daily}
      />
    </div>
  );
}
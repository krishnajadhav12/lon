import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, MapPin, Trophy, QrCode, TrendingUp, Settings, Database, Server, Clock, Shield, Activity, Leaf, Info, ChevronRight, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import hotspots from '../data/hotspots.json';
import biodiversity from '../data/biodiversity.json';
import touristPlaces from '../data/touristplaces.json';

const visitorData = [
  { name: 'Mon', count: 400 },
  { name: 'Tue', count: 300 },
  { name: 'Wed', count: 600 },
  { name: 'Thu', count: 800 },
  { name: 'Fri', count: 700 },
  { name: 'Sat', count: 1200 },
  { name: 'Sun', count: 1500 },
];

const hotspotData = [
  { name: 'Crater Lake', value: 45 },
  { name: 'Daitya Sudan', value: 25 },
  { name: 'Gomukh', value: 20 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#00d2ff', '#f27d26', '#2d0a4e', '#ffffff'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'management' | 'dev'>('analytics');
  const navigate = useNavigate();

  const biodiversityCount = biodiversity.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-cosmic-black text-white pb-32">
      {/* Admin Header */}
      <header className="px-6 pt-8 pb-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Shield className="text-neon-blue" size={20} />
                Admin Console
              </h1>
              <p className="text-[10px] text-gray-500 font-mono">LonarVerse Management v1.2.4</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-neon-blue uppercase tracking-widest">
            <Activity size={12} className="animate-pulse" />
            Live
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'analytics' ? 'bg-neon-blue text-cosmic-black shadow-lg shadow-neon-blue/20' : 'text-gray-500 hover:text-white'}`}
          >
            Analytics
          </button>
          <button 
            onClick={() => setActiveTab('management')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'management' ? 'bg-neon-blue text-cosmic-black shadow-lg shadow-neon-blue/20' : 'text-gray-500 hover:text-white'}`}
          >
            Management
          </button>
          <button 
            onClick={() => setActiveTab('dev')}
            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'dev' ? 'bg-neon-blue text-cosmic-black shadow-lg shadow-neon-blue/20' : 'text-gray-500 hover:text-white'}`}
          >
            Dev Tools
          </button>
        </div>
      </header>

      <div className="px-6 space-y-6">
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 space-y-2">
                <Users size={20} className="text-neon-blue" />
                <p className="text-2xl font-bold">5,240</p>
                <p className="text-[10px] text-gray-400 uppercase">Total Visitors</p>
              </div>
              <div className="glass-card p-4 space-y-2">
                <Trophy size={20} className="text-meteor-orange" />
                <p className="text-2xl font-bold">1,120</p>
                <p className="text-[10px] text-gray-400 uppercase">Hunt Completes</p>
              </div>
            </div>

            <div className="glass-card p-4">
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-neon-blue" />
                Weekly Footfall
              </h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#00d2ff' }}
                    />
                    <Bar dataKey="count" fill="#f27d26" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-4">
              <h3 className="text-sm font-bold mb-4">Popular Hotspots</h3>
              <div className="h-48 w-full flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hotspotData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {hotspotData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {hotspotData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                      <span className="text-[10px] text-gray-400">{d.name} ({d.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'management' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neon-blue/20 rounded-lg text-neon-blue">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Hotspots</h4>
                    <p className="text-[10px] text-gray-400">{hotspots.length} Active Locations</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </div>

              <div className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-meteor-orange/20 rounded-lg text-meteor-orange">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Biodiversity</h4>
                    <p className="text-[10px] text-gray-400">{biodiversityCount} Species Cataloged</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </div>

              <div className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cosmic-purple/40 rounded-lg text-white">
                    <Info size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Tourist Places</h4>
                    <p className="text-[10px] text-gray-400">{touristPlaces.length} Points of Interest</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            </div>

            <div className="glass-card p-4 space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Users size={16} className="text-neon-blue" />
                Active Users
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Rahul M.', level: 12, points: 2450, status: 'Online' },
                  { name: 'Sneha K.', level: 8, points: 1200, status: 'Away' },
                  { name: 'David W.', level: 15, points: 3100, status: 'Online' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Online' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <span>Lvl {user.level}</span>
                      <span className="text-neon-blue font-bold">{user.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-4 space-y-4">
              <h3 className="text-sm font-bold">Recent Activity</h3>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <QrCode size={14} className="text-gray-500" />
                    <span>QR Scan at Gomukh</span>
                  </div>
                  <span className="text-gray-500">{i * 2}m ago</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dev' && (
          <div className="space-y-6">
            {/* System Info */}
            <div className="glass-card p-4 space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Server size={16} className="text-neon-blue" />
                System Environment
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">App Version</span>
                  <span className="font-mono text-neon-blue">v1.2.4-beta</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Environment</span>
                  <span className="font-mono text-meteor-orange">Development</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Current Time</span>
                  <span className="font-mono text-white flex items-center gap-1">
                    <Clock size={12} />
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Service Status */}
            <div className="glass-card p-4 space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Activity size={16} className="text-meteor-orange" />
                Service Health
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-gray-500" />
                    <span>Database Cluster</span>
                  </div>
                  <CheckCircle2 size={14} className="text-green-500" />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Server size={14} className="text-gray-500" />
                    <span>API Gateway</span>
                  </div>
                  <CheckCircle2 size={14} className="text-green-500" />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-gray-500" />
                    <span>AI Model (Gemini)</span>
                  </div>
                  <CheckCircle2 size={14} className="text-green-500" />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-gray-500" />
                    <span>Asset CDN</span>
                  </div>
                  <span className="text-[8px] px-1.5 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full font-bold uppercase">Latency High</span>
                </div>
              </div>
            </div>

            {/* API Endpoints */}
            <div className="glass-card p-4 space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Settings size={16} className="text-purple-400" />
                API Endpoints
              </h3>
              <div className="space-y-2">
                <div className="p-2 bg-white/5 rounded-lg font-mono text-[10px] space-y-1">
                  <p className="text-neon-blue">GET /api/hotspots</p>
                  <p className="text-gray-500">Fetch all impact site data</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg font-mono text-[10px] space-y-1">
                  <p className="text-neon-blue">POST /api/quest/complete</p>
                  <p className="text-gray-500">Submit treasure hunt results</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg font-mono text-[10px] space-y-1">
                  <p className="text-neon-blue">GET /api/stats/visitors</p>
                  <p className="text-gray-500">Retrieve analytics payload</p>
                </div>
              </div>
            </div>

            {/* System Logs */}
            <div className="glass-card p-4 space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Activity size={16} className="text-neon-blue" />
                System Logs
              </h3>
              <div className="bg-black/40 rounded-lg p-3 font-mono text-[8px] space-y-1 h-32 overflow-y-auto no-scrollbar">
                <p className="text-green-400">[INFO] 13:45:12 - Gemini API connected successfully</p>
                <p className="text-gray-500">[DEBUG] 13:45:15 - Pre-loading hotspot assets...</p>
                <p className="text-green-400">[INFO] 13:45:20 - Map tile cache initialized</p>
                <p className="text-yellow-400">[WARN] 13:45:25 - Asset CDN latency above threshold (240ms)</p>
                <p className="text-gray-500">[DEBUG] 13:45:30 - User session validated: ais-user-772</p>
                <p className="text-green-400">[INFO] 13:45:35 - Quest state synchronized with server</p>
                <p className="text-gray-500">[DEBUG] 13:45:40 - Garbage collection completed</p>
              </div>
            </div>

            {/* Dev Actions */}
            <div className="grid grid-cols-1 gap-3">
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Settings size={14} />
                Clear System Cache
              </button>
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Database size={14} />
                Export Data Logs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

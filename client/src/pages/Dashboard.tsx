
import { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Settings, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TwitterUserData {
  username: string;
  followers_count: number;
  following_count: number;
  profile_image_url: string;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<TwitterUserData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setUserData({
        username: 'your_username',
        followers_count: 1250,
        following_count: 890,
        profile_image_url: '/placeholder.svg'
      });
      setIsConnected(true);
    }, 1000);
  }, []);

  const stats = [
    {
      title: 'フォロワー数',
      value: userData?.followers_count || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'フォロー中',
      value: userData?.following_count || 0,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: '相互フォロー',
      value: 458,
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: '片思い',
      value: 432,
      icon: UserX,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const botFeatures = [
    {
      title: '相互フォロー判定',
      description: 'フォロー関係を自動で分析・分類',
      icon: UserCheck,
      status: 'ready',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      title: '片思い削除Bot',
      description: 'フォロバされていないアカウントを自動削除',
      icon: UserX,
      status: 'ready',
      color: 'bg-gradient-to-r from-red-500 to-red-600',
    },
    {
      title: '自動フォローBot',
      description: 'ターゲットユーザーを自動でフォロー',
      icon: TrendingUp,
      status: 'coming-soon',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: '保護リスト機能',
      description: '重要なアカウントを保護リストに追加',
      icon: Shield,
      status: 'ready',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Xアカウントに接続中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">KMJX1 Dashboard</h1>
                <p className="text-sm text-gray-300">Xフォロワー管理統合システム</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                接続済み
              </Badge>
              <img 
                src={userData?.profile_image_url} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border-2 border-white/20"
              />
              <span className="text-white">@{userData?.username}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bot Features */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Bot機能一覧</span>
            </CardTitle>
            <CardDescription className="text-gray-300">
              以下の自動化機能をご利用いただけます
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {botFeatures.map((feature, index) => (
                <div key={index} className="group">
                  <div className={`${feature.color} p-6 rounded-lg text-white hover:scale-105 transition-all duration-300 cursor-pointer`}>
                    <div className="flex items-center justify-between mb-3">
                      <feature.icon className="h-8 w-8" />
                      <Badge 
                        variant={feature.status === 'ready' ? 'default' : 'secondary'}
                        className={feature.status === 'ready' ? 'bg-white/20 text-white' : 'bg-yellow-500/20 text-yellow-300'}
                      >
                        {feature.status === 'ready' ? '利用可能' : '準備中'}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm opacity-90">{feature.description}</p>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                      disabled={feature.status !== 'ready'}
                    >
                      {feature.status === 'ready' ? '開始' : '準備中'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">クイックアクション</CardTitle>
            <CardDescription className="text-gray-300">
              よく使用される機能への素早いアクセス
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserCheck className="h-4 w-4 mr-2" />
                フォロー分析開始
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Shield className="h-4 w-4 mr-2" />
                保護リスト管理
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                設定
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

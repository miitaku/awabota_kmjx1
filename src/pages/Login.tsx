
import { useState } from 'react';
import { Twitter, Shield, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Login = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleTwitterLogin = () => {
    setIsConnecting(true);
    // Mock authentication delay
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  const features = [
    {
      icon: Users,
      title: '相互フォロー判定',
      description: 'フォロー関係を自動分析し、相互フォローと片思いを識別'
    },
    {
      icon: Shield,
      title: '保護リスト機能',
      description: '重要なアカウントを保護し、誤削除を防止'
    },
    {
      icon: Zap,
      title: '自動化Bot',
      description: 'フォロー・アンフォローを自動実行し、効率的に管理'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            KMJX1
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Xフォロワー整理・自動化・増加装置
          </p>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
            統合型管理システム
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Login Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">ログイン</CardTitle>
              <CardDescription className="text-gray-300">
                Xアカウントと連携してダッシュボードにアクセス
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={handleTwitterLogin}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                {isConnecting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    接続中...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Twitter className="h-6 w-6 mr-3" />
                    Xアカウントでログイン
                  </div>
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  ログインすることで、
                  <br />
                  <span className="text-blue-300">利用規約</span> および <span className="text-blue-300">プライバシーポリシー</span> に同意したものとみなされます
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-xl">主な機能</CardTitle>
              <CardDescription className="text-gray-300">
                効率的なフォロワー管理を実現
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-lg border border-green-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-semibold text-sm">最新アップデート</span>
                </div>
                <p className="text-gray-300 text-sm">
                  新機能：リアルタイム分析とバッチ処理機能を追加しました
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            © 2024 KMJX1 - Xフォロワー管理統合システム
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

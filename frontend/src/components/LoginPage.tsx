import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - show success message and redirect
    toast({
      title: "تم تسجيل الدخول بنجاح!",
      description: "مرحباً بعودتك، يمكنك الآن الوصول للمقالات الحصرية.",
    });
    
    // Simulate login and redirect to articles
    setTimeout(() => {
      window.location.href = '/articles';
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12" dir="rtl">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-luxury">
            Ignite 24
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-md">
        <Card className="shadow-luxury">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-luxury mb-2">تسجيل الدخول</CardTitle>
            <p className="text-muted-foreground">ادخلي للوصول للمقالات الحصرية</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-luxury">اسم المستخدم</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="أدخلي اسم المستخدم"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-luxury">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخلي كلمة المرور"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <Button type="submit" size="lg" variant="romantic" className="w-full">
                تسجيل الدخول
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">ليس لديك حساب؟</p>
                <Button variant="outline" onClick={() => navigate('/signup') }>
                  إنشاء حساب جديد
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
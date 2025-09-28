import React, {useEffect, useState} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3031/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "حدث خطأ غير متوقع");
      }

      // ✅ Save user data + token in localStorage (or sessionStorage)
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      toast({
        title: "تم تسجيل الدخول بنجاح!",
        description: data.user.role === "admin" ? "مرحباً بعودتك، يمكنك الآن متابعة الطلبات وحسابات المستخدمين." : "مرحباً بعودتك، يمكنك الآن الوصول للمقالات الحصرية.",
      });

      // Redirect based on role
      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: err.message || "تعذر الاتصال بالخادم",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gradient-hero" dir="rtl">
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
                <Label htmlFor="phone" className="text-luxury">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="أدخلي رقم الهاتف"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
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
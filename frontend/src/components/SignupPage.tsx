import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    password: "",
    secondPhone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Phone validation
    const phoneRegex = /^05\d{8}$/; // starts with 05 + 8 more digits = 10 total
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "خطأ في رقم الهاتف",
        description: "رقم الهاتف يجب أن يبدأ بـ 05 ويحتوي على 10 أرقام.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3031/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // for cookies/JWT if needed
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "حدث خطأ غير متوقع");
      }

      toast({
        title: "تم التسجيل بنجاح!",
        description: "مرحباً بك في عائلة Ignite. ستحصلين على أسعار مميزة ومقالات حصرية.",
      });

      console.log("Server response:", data);

      // Reset form
      setFormData({
        username: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        password: "",
        secondPhone: "",
      });
      navigate('/');
    } catch (err: any) {
      toast({
        title: "خطأ في التسجيل",
        description: err.message || "تعذر الاتصال بالخادم",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero pb-6" dir="rtl">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-luxury">
            Ignite
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-luxury">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-luxury mb-2">انضم لعائلة Ignite </CardTitle>
            <p className="text-muted-foreground">احصل على أسعار مميزة ومقالات حصرية لتحسين العلاقة الزوجية</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-luxury">اسم المستخدم *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-luxury">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="05xxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondPhone" className="text-luxury">رقم الهاتف الثاني (اختياري)</Label>
                <Input
                    id="secondPhone"
                    type="tel"
                    placeholder="05xxxxxxxx"
                    value={formData.secondPhone}
                    onChange={(e) => handleInputChange('secondPhone', e.target.value)}
                    className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-luxury">البريد الإلكتروني (اختياري)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="text-right"
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="password" className="text-luxury">كلمة المرور *</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    minLength={8} // HTML5 validation
                    className="text-right"
                />
                {formData.password && formData.password.length < 8 && (
                    <p className="text-red-500 text-sm">يجب أن تكون كلمة المرور 8 أحرف على الأقل</p>
                )}
              </div>


              <div className="space-y-2">
                <Label htmlFor="city" className="text-luxury">المنطقة *</Label>
                <Select onValueChange={(value) => handleInputChange('city', value)} required>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختار المنطقة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="الضفة الغربية">الضفة الغربية</SelectItem>
                    <SelectItem value="القدس">القدس</SelectItem>
                    <SelectItem value="الداخل">الداخل</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-luxury">العنوان التفصيلي *</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="الشارع، البناية، الشقة"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="bg-gradient-romantic/10 p-4 rounded-lg">
                <h3 className="font-semibold text-luxury mb-2">مميزات العضوية:</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>✓ خصومات حصرية على المنتجات</div>
                  <div>✓ مقالات مهمة لتحسين العلاقة الزوجية</div>
                  <div>✓ نصائح من خبراء متخصصين</div>
                  <div>✓ إشعارات بالعروض الخاصة</div>
                </div>
              </div>

              <Button type="submit" size="lg" variant="romantic" className="w-full">
                انضم الآن
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                بالتسجيل، أوافق على <span className="text-romantic cursor-pointer" onClick={() => window.location.href = '/privacy'}>سياسة الخصوصية</span>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
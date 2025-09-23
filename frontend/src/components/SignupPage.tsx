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
    city: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - show success message
    toast({
      title: "تم التسجيل بنجاح!",
      description: "مرحباً بك في عائلة Ignite 24. ستحصلين على أسعار مميزة ومقالات حصرية.",
    });
    
    // Reset form
    setFormData({
      username: '',
      phone: '',
      email: '',
      address: '',
      city: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const navigate = useNavigate();

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

      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-luxury">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-luxury mb-2">انضمي لعائلة Ignite 24</CardTitle>
            <p className="text-muted-foreground">احصلي على أسعار مميزة ومقالات حصرية لتحسين العلاقة الزوجية</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-luxury">اسم المستخدم *</Label>
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
                <Label htmlFor="email" className="text-luxury">البريد الإلكتروني</Label>
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
                <Label htmlFor="city" className="text-luxury">المدينة *</Label>
                <Select onValueChange={(value) => handleInputChange('city', value)} required>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="اختاري المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="west-bank">الضفة الغربية</SelectItem>
                    <SelectItem value="jerusalem">القدس</SelectItem>
                    <SelectItem value="interior">الداخل</SelectItem>
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
                انضمي الآن
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
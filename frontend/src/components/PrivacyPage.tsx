import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Truck, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const PrivacyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-hero" dir="rtl">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-luxury">
            Ignite 24
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-luxury mb-4">ضمان الخصوصية</h1>
            <p className="text-lg text-muted-foreground">
              نحن نضمن سرية تامة في جميع مراحل التعامل معك
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-romantic transition-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-luxury">
                  <Lock className="w-6 h-6 text-romantic" />
                  حماية البيانات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>• جميع المعلومات الشخصية محمية بتشفير عالي المستوى</p>
                <p>• لا نشارك بياناتك مع أي طرف ثالث</p>
                <p>• يتم حذف المعلومات فور انتهاء عملية التوصيل</p>
                <p>• نظام آمن لحفظ البيانات مؤقتاً فقط</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-romantic transition-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-luxury">
                  <Truck className="w-6 h-6 text-romantic" />
                  التوصيل السري
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>• تعبئة محايدة تماماً دون أي إشارة للمنتج</p>
                <p>• اسم المرسل عام وغير مرتبط بالشركة</p>
                <p>• التوصيل عبر شركات محترفة وموثوقة</p>
                <p>• إمكانية استلام الطلب في مكان آخر</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-romantic transition-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-luxury">
                  <Phone className="w-6 h-6 text-romantic" />
                  التواصل الآمن
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>• جميع المحادثات سرية ومحمية</p>
                <p>• فريق نسائي مختص للرد على استفساراتك</p>
                <p>• أوقات تواصل مرنة تناسب خصوصيتك</p>
                <p>• إمكانية الحديث باللغة التي تفضلينها</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-romantic transition-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-luxury">
                  <Shield className="w-6 h-6 text-romantic" />
                  ضمانات إضافية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>• عدم الاحتفاظ بسجل المكالمات أو الرسائل</p>
                <p>• خيار الدفع عند الاستلام لضمان الأمان</p>
                <p>• إمكانية إلغاء الطلب في أي وقت</p>
                <p>• ضمان عدم إعادة الاتصال إلا بطلبك</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-romantic text-romantic-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">التزامنا تجاهك</h2>
              <p className="text-lg leading-relaxed mb-6">
                نحن نتفهم حساسية هذا الموضوع وأهمية الخصوصية بالنسبة لك. 
                لذلك نضع سريتك في المقام الأول ونضمن لك تجربة آمنة ومريحة تماماً.
              </p>
              <div className="bg-white/20 p-4 rounded-lg">
                <p className="font-semibold">
                  "خصوصيتك أولويتنا، وثقتك مسؤوليتنا"
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button size="lg" variant="luxury" onClick={() => navigate('/')}>
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
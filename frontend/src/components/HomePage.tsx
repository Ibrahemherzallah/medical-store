import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Clock, Truck, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-couple.jpg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const testimonials = [
    {
      name: "أم أحمد",
      rating: 5,
      text: "منتج رائع، ساعد في تحسين العلاقة بشكل كبير. سرية تامة في التوصيل.",
      city: "رام الله"
    },
    {
      name: "زوجة سالم",
      rating: 5, 
      text: "نتائج ممتازة وسريعة. زوجي أصبح أكثر ثقة. شكراً لكم",
      city: "نابلس"
    },
    {
      name: "أم محمد",
      rating: 5,
      text: "أفضل استثمار في علاقتنا. تأثير يدوم 24 ساعة كما وعدتم",
      city: "الخليل"
    }
  ];

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "تأثير يدوم 24 ساعة",
      description: "مفعول طويل الأمد للحصول على أفضل النتائج"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "آمن ومرخص",
      description: "يحتوي على السيلدينافيل المرخص طبياً"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "يحسن العلاقة الحميمة",
      description: "يعيد الثقة والحيوية للعلاقة الزوجية"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "توصيل سري وسريع",
      description: "خصوصية تامة في التعبئة والتوصيل"
    }
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero" dir="rtl">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-luxury">
            Ignite 24
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/login')}>
              تسجيل الدخول
            </Button>
            <Button variant="romantic" onClick={() => navigate('/signup')}>
              انضمي معنا
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="romantic" className="text-sm px-4 py-2">
                منتج مرخص وآمن
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-luxury leading-tight">
                اشعلي شغف زوجك
                <span className="text-romantic block">
                  بطريقة آمنة
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ignite 24 يمنح زوجك الثقة والطاقة التي يحتاجها لعلاقة حميمة مُرضية. 
                تأثير يدوم حتى 24 ساعة مع ضمان السرية التامة في التوصيل.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="hero" variant="romantic" className="text-lg px-8 py-4" onClick={() => navigate('/purchase')}>
                فاجئيه الآن
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                معرفة المزيد
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury">+1000</div>
                <div className="text-sm text-muted-foreground">زوجة راضية</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury">24 ساعة</div>
                <div className="text-sm text-muted-foreground">مدة التأثير</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury">100%</div>
                <div className="text-sm text-muted-foreground">سرية تامة</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src={heroImage} 
              alt="زوجان سعيدان - علاقة حميمة صحية" 
              className="rounded-2xl shadow-luxury w-full animate-float"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-elegant animate-glow">
              <div className="text-3xl font-bold">24h</div>
              <div className="text-sm">مفعول طويل</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="bg-card py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-luxury mb-4">لماذا Ignite 24؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              المنتج المثالي لتحسين العلاقة الحميمة بطريقة آمنة وفعالة
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-romantic transition-elegant">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-romantic rounded-full flex items-center justify-center mx-auto mb-4 text-romantic-foreground">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-luxury mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-luxury mb-4">اختاري الباقة المناسبة</h2>
            <p className="text-muted-foreground">أسعار مميزة مع توصيل سري</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Single Pill Package */}
            <Card className="relative hover:shadow-luxury transition-elegant">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-luxury mb-2">حبة واحدة</h3>
                  <div className="text-4xl font-bold text-romantic mb-4">
                    50 <span className="text-lg">شيكل</span>
                  </div>
                  <p className="text-muted-foreground mb-6">مثالية للتجربة الأولى</p>
                  
                  <Button variant="romantic" size="lg" className="w-full mb-6" onClick={() => navigate('/purchase')}>
                    فاجئيه الآن
                  </Button>
                  
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div>✓ تأثير يدوم 24 ساعة</div>
                    <div>✓ آمن ومرخص</div>
                    <div>✓ توصيل سري</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Three Pills Package */}
            <Card className="relative hover:shadow-luxury transition-elegant border-romantic">
              <Badge className="absolute -top-3 right-4 bg-gradient-romantic text-romantic-foreground">
                الأكثر طلباً
              </Badge>
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-luxury mb-2">ثلاث حبات</h3>
                  <div className="text-4xl font-bold text-romantic mb-4">
                    100 <span className="text-lg">شيكل</span>
                  </div>
                  <p className="text-muted-foreground mb-6">توفيري 50 شيكل!</p>
                  
                  <Button variant="luxury" size="lg" className="w-full mb-6" onClick={() => navigate('/purchase')}>
                    فاجئيه الآن
                  </Button>
                  
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div>✓ تأثير يدوم 24 ساعة</div>
                    <div>✓ آمن ومرخص</div>
                    <div>✓ توصيل سري</div>
                    <div className="text-romantic">✓ توفير 50 شيكل</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="bg-gradient-soft py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-luxury mb-4">ماذا يقول الزبائن؟</h2>
            <p className="text-muted-foreground">تجارب حقيقية من زبائن راضين</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center hover:shadow-romantic transition-elegant">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="space-y-1">
                    <div className="font-semibold text-luxury">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.city}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Membership Section */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Membership Card */}
            <Card className="bg-gradient-romantic text-romantic-foreground shadow-luxury">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">انتسبي معنا لأسعار أفضل</h2>
                <p className="text-xl mb-6 opacity-90">
                  والوصول لمقالات مهمة لتحسين العلاقة الزوجية
                </p>
                <div className="space-y-3 mb-8 text-sm">
                  <div>✓ خصومات حصرية على جميع المنتجات</div>
                  <div>✓ مقالات أسبوعية من خبراء متخصصين</div>
                  <div>✓ نصائح لتحسين العلاقة الحميمة</div>
                  <div>✓ محتوى حصري للأعضاء فقط</div>
                </div>
                <Button size="lg" variant="luxury" onClick={() => navigate('/signup')}>
                  انضمي الآن - مجاناً
                </Button>
              </CardContent>
            </Card>

            {/* Religious & Medical Opinions */}
            <Card className="shadow-luxury">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-luxury mb-6 text-center">الآراء الدينية والطبية</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-soft p-4 rounded-lg">
                    <h3 className="font-semibold text-luxury mb-2 flex items-center">
                      <Heart className="w-5 h-5 ml-2 text-romantic" />
                      الرأي الإسلامي
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      الإسلام يحث على الاهتمام بالصحة الزوجية والسعي لتحسين العلاقة الحميمة بين الزوجين. 
                      استخدام الأدوية المرخصة والآمنة مباح شرعاً عند الحاجة لتحسين جودة الحياة الزوجية.
                    </p>
                  </div>

                  <div className="bg-gradient-soft p-4 rounded-lg">
                    <h3 className="font-semibold text-luxury mb-2 flex items-center">
                      <Shield className="w-5 h-5 ml-2 text-romantic" />
                      الرأي الطبي
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      السيلدينافيل مادة مرخصة طبياً وآمنة الاستخدام تحت الإشراف الطبي. 
                      أثبتت الدراسات السريرية فعاليته في تحسين الأداء الجنسي لدى الرجال.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-gradient-romantic text-romantic-foreground"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">اشعلي الشغف اليوم</h2>
          <p className="text-xl mb-8 opacity-90">
            احصلي على Ignite 24 بسرية تامة وتوصيل سريع
          </p>
          <Button size="hero" variant="luxury" className="text-lg px-12 py-6" onClick={() => navigate('/purchase')}>
            فاجئيه الآن - توصيل سري
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-luxury text-luxury-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ignite 24</h3>
              <p className="opacity-80">طاقة تدوم... شغف يستمر</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <div className="space-y-2 opacity-80">
                <div>المنتج</div>
                <div>طريقة الطلب</div>
                <div>التوصيل</div>
                <div>اتصل بنا</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-2 opacity-80">
                <div>تواصل مع معتصم</div>
                <div>تواصل مع ياسمين</div>
                <div>توصيل سري وآمن</div>
                <div className="cursor-pointer hover:opacity-100 transition-opacity" onClick={() => navigate('/privacy')}>ضمان الخصوصية</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-luxury-foreground/20 mt-8 pt-8 text-center opacity-60">
            <p>&copy; 2024 Ignite 24. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
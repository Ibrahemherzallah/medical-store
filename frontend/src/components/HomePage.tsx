import React, {useEffect, useState} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Clock, Truck, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-couple.jpg';
import heroVideo from '@/assets/gif.mp4';
import { Link ,useNavigate } from 'react-router-dom';
import { MessageCircle, Facebook, Instagram, Music2 } from "lucide-react"
const HomePage = () => {

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "تأثير يدوم +48 ساعة",
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
  const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;
  const [reviews,setReviews] = useState();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("https://ignite69.com/api/review/get-approved-reviews");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching reviews");
        console.log("Reviews:", data);
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero" dir="rtl">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* اللوجو (GIF) */}
            <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-20 h-20 object-contain rounded-full"
            />

            {/* النص */}
            <p className="text-lg font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent font-[Cairo]">
              طاقة تدوم... شغف يستمر
            </p>
          </div>
          <div className="flex gap-4">
            {localStorage.getItem("user") ? (
                <div className={'flex gap-3'}>
                  <Button
                      variant="luxury"
                      onClick={() => {
                        navigate("/admin");
                      }}
                  >
                    لوحة التحكم
                  </Button>
                  <Button
                      variant="outline"
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                  >
                    تسجيل الخروج
                  </Button>
                </div>
            ) : (
                <>
                  <Button variant="outline" onClick={() => navigate("/login")}>
                    تسجيل الدخول
                  </Button>
                  <Button variant="romantic" onClick={() => navigate("/signup")}>
                    انضمي معنا
                  </Button>
                </>
            )}
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
            {user && user.role == 'user' && (
                <div className="p-4 bg-gradient-soft rounded-lg shadow-elegant mb-6">
                  <h2 className="text-2xl font-bold text-luxury">
                    مرحباً، {user.name || user.username} 👋
                  </h2>
                  <p className="text-muted-foreground">سعيدون بعودتك إلى Ignite 💖</p>
                </div>
            )}
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
                💖 فاجئي زوجك بـ Ignite ... هدية صغيرة تعيد الشغف لحياتكم الزوجية.
                شرارة جديدة تدوم +48 ساعة كاملة... طبيعية وآمنة 100%.
                لأن سعادتك بتبدأ من سعادته 💕
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                  size="hero"
                  variant="romantic"
                  className="text-lg px-8 py-4"
                  onClick={() => navigate('/purchase')}
              >
                فاجئيه الآن
              </Button>

              <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4"
                  onClick={() => {
                    if (user) {
                      navigate("/articles");
                    } else {
                      alert("⚠️ يجب تسجيل الدخول للوصول إلى المقالات");
                    }
                  }}
              >
                قراءة المقالات
              </Button>

              {/* زر رؤية المنتج */}
              <Button
                  size="lg"
                  variant="luxury"
                  className="text-lg px-8 py-4 flex items-center gap-2"
                  onClick={() => navigate("/product")}
              >
                👀 رؤية المنتج
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury">+1000</div>
                <div className="text-sm text-muted-foreground">زوجة راضية</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury">+48 ساعة</div>
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
              <div className="text-3xl font-bold"> +48  ساعة</div>
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
            <h2 className="text-3xl font-bold text-luxury mb-4">لماذا Ignite ؟</h2>
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
            <h2 className="text-3xl font-bold text-luxury mb-4">اختار الباقة المناسبة</h2>
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
                    <div>✓ تأثير يدوم +48 ساعة</div>
                    <div>✓ آمن ومرخص</div>
                    <div>✓ توصيل سري</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Four Pills Package */}
            <Card className="relative hover:shadow-luxury transition-elegant border-romantic">
              <div className="absolute -top-3 right-4 flex gap-2">
                <Badge className="bg-gradient-romantic text-romantic-foreground">
                  الأكثر طلباً
                </Badge>
                <Badge className="bg-red-500 text-white animate-bounce">
                  خصم 25%
                </Badge>
              </div>

              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-luxury mb-2">أربع حبات</h3>
                  <div className="text-4xl font-bold text-romantic mb-4">
                    150 <span className="text-lg">شيكل</span>
                  </div>
                  <p className="text-muted-foreground mb-6">توفيري 50 شيكل!</p>

                  <Button
                      variant="luxury"
                      size="lg"
                      className="w-full mb-6"
                      onClick={() => navigate('/purchase')}
                  >
                    اطلبه الآن
                  </Button>

                  <div className="text-sm text-muted-foreground space-y-2">
                    <div>✓ تأثير يدوم +48 ساعة</div>
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
            {reviews?.map((testimonial, index) => (
              <Card key={index} className="text-center hover:shadow-romantic transition-elegant">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.contentText}"
                  </p>
                  <div className="space-y-1">
                    <div className="font-semibold text-luxury">
                            <span className="blur-sm select-none">
                              {testimonial.name || "أحمد"}
                            </span>
                    </div>
                    {
                      testimonial.city
                          ?  <div className="text-sm text-muted-foreground">{testimonial.city}</div>
                          :  <div className="font-semibold text-luxury">
                                <span className="blur-sm select-none">
                                  jenin
                                </span>
                              </div>
                    }
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
                <h2 className="text-3xl font-bold mb-4">انتسب معنا لأسعار أفضل</h2>
                <p className="text-xl mb-6 opacity-90">
                  {user
                      ? "🎉 الآن لديك توصيل مجاني مع Ignite !"
                      : "انضم لعائلتنا لتحصل على توصيل مجاني."}
                </p>
                <div className="space-y-3 mb-8 text-sm">
                  <div>✓ خصومات حصرية على جميع المنتجات</div>
                  <div>✓ مقالات أسبوعية من خبراء متخصصين</div>
                  <div>✓ نصائح لتحسين العلاقة الحميمة</div>
                  <div>✓ محتوى حصري للأعضاء فقط</div>
                </div>
                <Button size="lg" variant="luxury" onClick={() => navigate(user ? '/articles' : '/signup' )}>
                  {user ? 'تصفح المقالات' : 'انضم الآن - مجاناً'}

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
          <h2 className="text-3xl font-bold mb-4">اشعل الشغف اليوم</h2>
          <p className="text-xl mb-8 opacity-90">
            احصل على Ignite  بسرية تامة وتوصيل سريع
          </p>
          <Button size="hero" variant="luxury" className="text-lg px-12 py-6" onClick={() => navigate('/purchase')}>
            اطلب الآن - توصيل سري
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-luxury text-luxury-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo + slogan */}
            <div>
              <h3 className="text-xl font-bold mb-4">Ignite</h3>
              <p className="opacity-80">
                طاقة تدوم... شغف يستمر<br />اشعلي شغف زوجك بطريقة آمنة
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <div className="space-y-2 opacity-80">
                <div>
                  <Link to="/product" className="hover:underline">المنتج</Link>
                </div>
                <div>
                  <Link to="/articles" className="hover:underline">المقالات الحصرية</Link>
                </div>
                <div>
                  <Link to="/privacy" className="hover:underline">سياسة الخصوصية</Link>
                </div>
              </div>
            </div>

            {/* Contact + social */}
            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-2 opacity-80">
                <a
                    href="https://wa.me/+972528898428"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  تواصل مع المشرف
                </a>
                <a
                    href="https://wa.me/+972597250539"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  تواصلي مع المشرفة
                </a>
              </div>

              {/* Social media */}
              <div className="flex gap-4 mt-4">
                <a href="https://www.facebook.com/share/16TAqMXu1n/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-5 h-5 hover:text-blue-500 transition" />
                </a>
                <a href="https://www.instagram.com/ignit.e69?igsh=YmY3eWRjcTMzZ2R0" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 hover:text-pink-500 transition" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-t border-luxury-foreground/20 mt-8 pt-8 text-center opacity-60">
            <p>&copy; 2024 Ignite. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
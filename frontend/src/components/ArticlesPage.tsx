import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, BookOpen, Clock } from 'lucide-react';
import {useNavigate} from "react-router-dom";

const ArticlesPage = () => {
  const articles = [
    {
      id: 1,
      title: "كيفية تحسين التواصل في العلاقة الزوجية",
      excerpt: "نصائح عملية لبناء تواصل أفضل مع الشريك وتعزيز الفهم المتبادل في العلاقة الحميمة.",
      category: "تواصل",
      readTime: "5 دقائق",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 2,
      title: "الصحة النفسية وتأثيرها على العلاقة الحميمة",
      excerpt: "كيف تؤثر الحالة النفسية على الأداء الحميمي وطرق التعامل مع القلق والتوتر.",
      category: "صحة نفسية",
      readTime: "7 دقائق",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: 3,
      title: "التغذية السليمة لتعزيز الطاقة الجنسية",
      excerpt: "الأطعمة والمكملات الطبيعية التي تساعد في تحسين الأداء والرغبة الجنسية.",
      category: "تغذية",
      readTime: "6 دقائق",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 4,
      title: "ممارسة الرياضة وتأثيرها على الصحة الجنسية",
      excerpt: "كيف تساعد التمارين الرياضية في تحسين الدورة الدموية والأداء الجنسي.",
      category: "رياضة",
      readTime: "4 دقائق",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: 5,
      title: "إدارة التوتر والضغوط اليومية",
      excerpt: "تقنيات فعالة للتخلص من التوتر الذي يؤثر سلباً على العلاقة الحميمة.",
      category: "إدارة التوتر",
      readTime: "8 دقائق",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 6,
      title: "الثقة بالنفس في العلاقة الزوجية",
      excerpt: "كيفية بناء الثقة بالنفس وتجاوز المخاوف التي تعيق العلاقة الحميمة.",
      category: "ثقة بالنفس",
      readTime: "6 دقائق",
      icon: <Heart className="w-5 h-5" />
    }
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero" dir="rtl">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-luxury">
            Ignite
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() =>  navigate('/')}>
              الرئيسية
            </Button>
            <Button variant="romantic" onClick={() => navigate('/purchase')}>
              تسوق الآن
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="romantic" className="mb-4">محتوى حصري للأعضاء</Badge>
          <h1 className="text-4xl font-bold text-luxury mb-4">مقالات تحسين العلاقة الزوجية</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مجموعة مختارة من المقالات المتخصصة لتحسين العلاقة الحميمة والزوجية
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-luxury transition-elegant cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-4 h-4 ml-1" />
                    {article.readTime}
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-romantic rounded-full flex items-center justify-center text-romantic-foreground ml-3">
                    {article.icon}
                  </div>
                  <CardTitle className="text-lg text-luxury leading-tight">
                    {article.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/articles/${article.id}`)}
                >
                  قراءة المقال
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-romantic text-romantic-foreground">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">هل تريدين المزيد من المحتوى الحصري؟</h2>
              <p className="mb-6 opacity-90">
                انضم لعائلة Ignite واحصلي على محتوى جديد كل أسبوع
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="bg-transparent border-romantic-foreground text-romantic-foreground hover:bg-romantic-foreground hover:text-romantic" onClick={()=>{navigate('/')}}>
                  تسوقي المنتج
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
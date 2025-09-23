import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, MessageSquarePlus, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';


const PurchasePage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    secondPhone: '',
    email: '',
    city: '',
    package: ''
  });
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    text: '',
    name: ''
  });
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const deliveryFees = {
    'الضفة الغربية': 20,
    'القدس': 30,
    'الداخل': 50
  };

  const packages = {
    'single': { name: 'حبة واحدة', price: 50 },
    'triple': { name: 'ثلاث حبات', price: 100 }
  };

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city });
    setDeliveryFee(deliveryFees[city as keyof typeof deliveryFees] || 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city || !formData.package) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would integrate with Supabase to store the order
    toast({
      title: "تم إرسال الطلب",
      description: "سيتم التواصل معك قريباً لتأكيد الطلب",
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewData.rating || !reviewData.text || !reviewData.name) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع حقول التقييم",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would integrate with Supabase to store the review
    toast({
      title: "شكراً لك!",
      description: "تم إرسال تقييمك بنجاح",
    });
    
    setReviewData({ rating: 0, text: '', name: '' });
    setIsReviewOpen(false);
  };

  const totalPrice = formData.package ? packages[formData.package as keyof typeof packages].price + deliveryFee : 0;

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

  const whatsappScreenshots = [
    { id: 1, alt: "رسالة واتساب من زبونة راضية", src: "/placeholder.svg" },
    { id: 2, alt: "تقييم إيجابي عبر الواتساب", src: "/placeholder.svg" },
    { id: 3, alt: "شهادة زبونة عن التأثير الإيجابي", src: "/placeholder.svg" }
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
          <Button variant="ghost" onClick={() => navigate('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Form */}
          <Card className="shadow-luxury">
            <CardHeader>
              <CardTitle className="text-2xl text-luxury text-center">اطلبي الآن</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Package Selection */}
                <div className="space-y-3">
                  <Label htmlFor="package">اختاري الباقة *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, package: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختاري الباقة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">حبة واحدة - 50 شيكل</SelectItem>
                      <SelectItem value="triple">ثلاث حبات - 100 شيكل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                {/* Second Phone */}
                <div className="space-y-2">
                  <Label htmlFor="secondPhone">رقم هاتف إضافي</Label>
                  <Input
                    id="secondPhone"
                    type="tel"
                    value={formData.secondPhone}
                    onChange={(e) => setFormData({ ...formData, secondPhone: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* City */}
                <div className="space-y-3">
                  <Label htmlFor="city">المدينة *</Label>
                  <Select onValueChange={handleCityChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختاري المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="الضفة الغربية">الضفة الغربية - 20 شيكل توصيل</SelectItem>
                      <SelectItem value="القدس">القدس - 30 شيكل توصيل</SelectItem>
                      <SelectItem value="الداخل">الداخل - 50 شيكل توصيل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Total Price */}
                {totalPrice > 0 && (
                  <div className="bg-gradient-soft p-4 rounded-lg">
                    <div className="flex justify-between items-center text-lg">
                      <span>المجموع الكلي:</span>
                      <span className="font-bold text-romantic">{totalPrice} شيكل</span>
                    </div>
                  </div>
                )}

                <Button type="submit" size="lg" variant="romantic" className="w-full">
                  تأكيد الطلب
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews and WhatsApp Screenshots */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-luxury text-center">ماذا يقول الزبائن؟</h2>
            
            <Tabs defaultValue="reviews" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                <TabsTrigger value="screenshots">رسائل الواتساب</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews" className="space-y-4">
                <div className="flex justify-center">
                  <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MessageSquarePlus className="w-4 h-4 ml-2" />
                        أضيفي تقييمك
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md" dir="rtl">
                      <DialogHeader>
                        <DialogTitle className="text-center">أضيفي تقييمك</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label>التقييم *</Label>
                          <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-8 h-8 cursor-pointer transition-colors ${
                                  star <= reviewData.rating
                                    ? 'fill-primary text-primary'
                                    : 'text-muted-foreground hover:text-primary'
                                }`}
                                onClick={() => setReviewData({ ...reviewData, rating: star })}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="reviewName">الاسم *</Label>
                          <Input
                            id="reviewName"
                            value={reviewData.name}
                            onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                            placeholder="أدخلي اسمك"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="reviewText">التقييم *</Label>
                          <Textarea
                            id="reviewText"
                            value={reviewData.text}
                            onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })}
                            placeholder="شاركي تجربتك معنا..."
                            className="min-h-[100px]"
                            required
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" variant="romantic" className="flex-1">
                            إرسال التقييم
                          </Button>
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setIsReviewOpen(false)}
                            className="flex-1"
                          >
                            إلغاء
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="hover:shadow-romantic transition-elegant">
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
              </TabsContent>
              
              <TabsContent value="screenshots" className="space-y-4">
                <div className="grid gap-4">
                  {whatsappScreenshots.map((screenshot) => (
                    <Card key={screenshot.id} className="hover:shadow-romantic transition-elegant">
                      <CardContent className="p-4">
                        <img 
                          src={screenshot.src} 
                          alt={screenshot.alt}
                          className="w-full h-64 object-cover rounded-lg bg-gradient-soft"
                        />
                        <p className="text-sm text-muted-foreground mt-2 text-center">
                          {screenshot.alt}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
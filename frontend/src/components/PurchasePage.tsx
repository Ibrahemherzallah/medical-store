import React, {useEffect, useState} from 'react';
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
import heroVideo from "@/assets/gif.mp4";
import screen from "@/assets/whatsapp-client.jpeg";


const PurchasePage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    secondPhone: '',
    email: '',
    city: '',
    deliveryRegion: '',
    package: '',
    user: false
  });
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryFeeSubscription, setDeliveryFeeSubscription] = useState(0);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    text: '',
    name: '',
    city: ''
  });
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;
  const [reviews,setReviews] = useState();

  const deliveryFees = {
    'الضفة الغربية': 20,
    'القدس': 30,
    'الداخل': 50
  };

  const deliveryFeesSubscription = {
    'الضفة الغربية': 0,
    'القدس': 10,
    'الداخل': 30
  };

  const packages = {
    'single': { name: 'حبة واحدة', price: 50 },
    'triple': { name: 'أربع حبات', price: 150 }
  };

  const handleCityChange = (city: string) => {
    setFormData({ ...formData, city });
    if(user){
      setDeliveryFeeSubscription(deliveryFeesSubscription[city as keyof typeof deliveryFeesSubscription] || 0)
    } else {
      setDeliveryFee(deliveryFees[city as keyof typeof deliveryFees] || 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
        !formData.name ||
        !formData.phone ||
        !formData.city ||
        !formData.package ||
        !formData.deliveryRegion
    ) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user") || "{}")
          : null;

      console.log("The stored user is : ", localStorage.getItem("user"))
      console.log("The stored user is : ", storedUser)
      // update formData.user dynamically based on storedUser
      const payload = {
        ...formData,
        user: storedUser ? true : false,
        userId: storedUser ? storedUser._id : null
      };
      console.log("The payload user is : ", payload)

      const res = await fetch("http://localhost:3031/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "فشل إرسال الطلب");

      toast({
        title: "تم إرسال الطلب",
        description: "سيتم التواصل معك قريباً لتأكيد الطلب",
      });

      console.log("Created Order:", data.order);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        secondPhone: "",
        email: "",
        package: "",
        deliveryRegion: "",
        city: "",
        user: false, // reset back
      });

      navigate("/");
    } catch (err: any) {
      toast({
        title: "خطأ",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewData.rating || !reviewData.text ) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع حقول التقييم",
        variant: "destructive"
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3031/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "حدث خطأ غير متوقع");
      }
      // Here you would integrate with Supabase to store the review
      toast({
        title: "شكراً لك!",
        description: "تم إرسال تقييمك بنجاح",
      });

      setReviewData({ rating: 0, text: '', name: '' });
      setIsReviewOpen(false);
    }
    catch (err: any) {
      toast({
        title: "خطأ في حفظ التقييم",
        description: err.message || "تعذر الاتصال بالخادم",
        variant: "destructive",
      });
    }
  };
  const selectedFee = user ? deliveryFeeSubscription : deliveryFee
  const totalPrice = formData.package ? packages[formData.package as keyof typeof packages].price + selectedFee : 0;

  const whatsappScreenshots = [
    { id: 1, alt: "رسالة واتساب من زبونة راضية", src: "/placeholder.svg" },
    { id: 2, alt: "تقييم إيجابي عبر الواتساب", src: "/placeholder.svg" },
    { id: 3, alt: "شهادة زبونة عن التأثير الإيجابي", src: "/placeholder.svg" }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData((prev) => ({
        ...prev,
        name: user.username || "",
        phone: user.phone || "",
        secondPhone: user.secondPhone || "",
        email: user.email || "",
      }));
    }
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:3031/api/review/get-approved-reviews");
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
              <CardTitle className="text-2xl text-luxury text-center">اطلب الآن</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Package Selection */}
                <div className="space-y-3">
                  <Label htmlFor="package">اختار الباقة *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, package: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختار الباقة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">حبة واحدة - 50 شيكل</SelectItem>
                      <SelectItem value="triple">أربع حبات - 150 شيكل</SelectItem>
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
                  <Label htmlFor="secondPhone">رقم هاتف إضافي (إختياري)</Label>
                  <Input
                    id="secondPhone"
                    type="tel"
                    value={formData.secondPhone}
                    onChange={(e) => setFormData({ ...formData, secondPhone: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني (إختياري)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>


                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="region">المدينة *</Label>
                  <Input
                      id="region"
                      type="region"
                      value={formData.deliveryRegion}
                      onChange={(e) => setFormData({ ...formData, deliveryRegion: e.target.value })}
                  />
                </div>

                {/* City */}

                { user
                    ?
                    <div className="space-y-3">
                      <Label htmlFor="city">المنطقة *</Label>
                      <Select onValueChange={handleCityChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختاري المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="الضفة الغربية">الضفة الغربية - 0 شيكل توصيل</SelectItem>
                          <SelectItem value="القدس">القدس - 10 شيكل توصيل</SelectItem>
                          <SelectItem value="الداخل">الداخل - 30 شيكل توصيل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    :
                    <div className="space-y-3">
                      <Label htmlFor="city">المنطقة *</Label>
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
                }


                {/* Total Price */}
                {totalPrice > 0 && formData.city && (
                    <div className="bg-gradient-soft p-4 rounded-lg shadow-elegant">
                      <div className="flex flex-col items-end text-lg space-y-2">
                        {/* Old Price (strikethrough) */}
                        {user && (
                            <span className="text-gray-500 line-through text-base">
                              {totalPrice + 20} شيكل
                            </span>
                         )}

                        {/* New Price */}
                        <div className="flex justify-between w-full items-center">
                          <span className="font-medium text-muted-foreground">المجموع الكلي:</span>
                          <span className="font-bold text-romantic text-xl">{totalPrice} شيكل</span>
                        </div>
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
                <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews" className="space-y-4">
                <div className="flex justify-center">
                  <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MessageSquarePlus className="w-4 h-4 ml-2" />
                        أضيف تقييمك
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md" dir="rtl">
                      <DialogHeader>
                        <DialogTitle className="text-center">أضيف تقييمك</DialogTitle>
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
                            placeholder="أدخل اسمك"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="reviewCity">المدينة</Label>
                          <Input
                              id="reviewCity"
                              value={reviewData.city}
                              onChange={(e) => setReviewData({ ...reviewData, city: e.target.value })}
                              placeholder="ادخل المدينة"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="reviewText">التقييم *</Label>
                          <Textarea
                            id="reviewText"
                            value={reviewData.text}
                            onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })}
                            placeholder="شارك تجربتك معنا بخصوصية عالية..."
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
                  {reviews?.map((testimonial, index) => (
                    <Card key={index} className="hover:shadow-romantic transition-elegant">
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
              </TabsContent>
              <TabsContent value="faq" className="min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-4xl hover:shadow-romantic transition-elegant">
                  <CardContent className="p-4">
                    <img
                        src={screen}
                        alt="رسالة واتساب من زبون يستفسر عن المنتج"
                        className="w-full h-[80vh] object-contain rounded-lg bg-gradient-soft"
                    />
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      رسالة واتساب من زبون يستفسر عن المنتج
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
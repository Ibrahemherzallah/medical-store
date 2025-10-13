import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Share2, ShoppingCart, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroVideo from "@/assets/gif.mp4";
import productVideo from "@/assets/product.mp4";
import productImage from "@/assets/productImg.png";

const ProductPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const productProperties = [
        { label: "المادة الفعّالة", value: "سيلدينافيل مرخص طبياً وآمن" },
        { label: "العدد", value: "4 حبات في العبوة" },
        { label: "مدة التأثير", value: "+48 ساعة متواصلة" },
        { label: "الاستعمال", value: "قبل العلاقة بنصف ساعة" },
        { label: "الترخيص", value: "منتج مرخص ومعتمد صحياً" },
        { label: "السرية", value: "توصيل سري وآمن حتى باب المنزل" },
        { label: "الفئة المستهدفة", value: "الأزواج الباحثون عن طاقة وشغف أكبر" },
        { label: "بلد المنشأ", value: "فلسطين" },
    ];

    const reviews = [
        { name: "فاطمة أحمد", rating: 5, comment: "منتج رائع وجودة عالية جداً" },
        { name: "سارة محمد", rating: 5, comment: "تصميم رومانسي وفخم" },
        { name: "نور خالد", rating: 4, comment: "جميل جداً ويستحق السعر" },
    ];

    const handleAddToCart = () => {
        toast({
            title: "تمت الإضافة للسلة",
            description: "تم إضافة المنتج إلى سلة التسوق بنجاح",
        });
    };

    const handleShare = () => {
        toast({
            title: "مشاركة المنتج",
            description: "تم نسخ رابط المنتج",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10" dir="rtl">
            {/* Header */}
            <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* اللوجو (GIF) */}
                        <video
                            src={heroVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-14 h-14 object-contain rounded-full"
                        />

                        {/* النص */}
                        <p className="text-lg font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent font-[Cairo]">
                            طاقة تدوم... شغف يستمر
                        </p>
                    </div>
                    <Button onClick={() => navigate("/")} variant="ghost">
                        الرئيسية
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                      <Card className="overflow-hidden">
                          <CardContent className="p-0">
                              <img
                                  src={productImage} // replace with your image variable or URL
                                  alt="Product"
                                  className="w-full h-[500px] object-cover rounded-lg pointer-events-none select-none"
                              />
                          </CardContent>
                      </Card>
                  </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">جديد</Badge>
                                <Badge variant="outline">الأكثر مبيعاً</Badge>
                            </div>
                            <h1 className="text-4xl font-bold mb-2"> حبوب ignite لمعالجة ضعف الانتصاب </h1>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                                    ))}
                                </div>
                                <span className="text-muted-foreground">(124 تقييم)</span>
                            </div>
                            <p className="text-3xl font-bold text-primary mb-4">149.99 شيكل</p>
                            <p className="text-muted-foreground leading-relaxed">
                                Ignite منتج آمن ومرخّص يمنحك طاقة استثنائية وتأثير يدوم لأكثر من 48 ساعة، مع تركيبة طبيعية تعزز الثقة والشغف في علاقتك الزوجية. مثالي للحفاظ على spark دائم ولمنح لحظاتكم لمسة من القوة والرومانسية.                            </p>
                        </div>

                        {/* Properties */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4">مواصفات المنتج</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {productProperties.map((prop, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <p className="text-sm text-muted-foreground">{prop.label}</p>
                                            <p className="font-medium">{prop.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button onClick={handleAddToCart} size="lg" className="flex-1">
                                <ShoppingCart className="ml-2 w-5 h-5" />
                                أضف للسلة
                            </Button>
                            <Button
                                variant={isFavorite ? "default" : "outline"}
                                size="lg"
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                            </Button>
                            <Button variant="outline" size="lg" onClick={handleShare}>
                                <Share2 className="w-5 h-5" />
                            </Button>
                        </div>

                        <Button
                            onClick={() => navigate("/purchase")}
                            size="lg"
                            variant="romantic"
                            className="w-full"
                        >
                            اشتري الآن
                            <ArrowRight className="mr-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ProductPage;
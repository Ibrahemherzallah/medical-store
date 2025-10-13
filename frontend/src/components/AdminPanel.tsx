import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {Users, ShoppingCart, MessageSquare, Star, Clock, DollarSign} from "lucide-react";
import {useNavigate} from "react-router-dom";



const AdminPanel = () => {

  const toggleReviewVisibility = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`https://ignite69.com/api/review/approve-review/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "خطأ في تحديث التقييم");

      // Update local state with new review status
      setReviews(reviews?.map(review =>
          review._id === id ? data.review : review
      ));
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getStatusBadge = (status: string) => {
    const variant = status === "مكتمل" ? "default" : "secondary";
    return <Badge variant={variant}>{status}</Badge>;
  };
  const navigate = useNavigate();
  const [orders,setOrders] = useState();
  const [users,setUsers] = useState();
  const [reviews,setReviews] = useState();


  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
      try {
        const res = await fetch("https://ignite69.com/api/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching orders");
        console.log("Orders:", data);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch("https://ignite69.com/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching users");
        console.log("Users:", data);
        setUsers(data); // you need a state for users
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch("https://ignite69.com/api/review", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching reviews");
        console.log("Reviews:", data);
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchOrders();
    fetchUsers();
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-foreground mb-2">لوحة التحكم الإدارية</h1>
            <p className="text-muted-foreground">إدارة الطلبات والمستخدمين والتقييمات</p>
          </div>

          <div className="flex gap-4">
            {localStorage.getItem("user") && (
                <div className={'flex gap-3'}>
                  <Button
                    variant="luxury"
                    onClick={() => {
                      navigate("/");
                    }}
                >
                  العودة للرئيسية
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

            )}
          </div>
        </div>



        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* إجمالي الطلبات */}
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders?.length}</div>
            </CardContent>
          </Card>

          {/* المستخدمين */}
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمين المسجلين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users?.length}</div>
            </CardContent>
          </Card>

          {/* التقييمات */}
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التقييمات</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviews?.length}</div>
            </CardContent>
          </Card>

          {/* الطلبات غير المسلمة */}
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات غير المسلمة</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders?.filter((o) => !o.delivered).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Total Profit Card */}
        <div className="mb-8">
          <Card className="hover-scale bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                إجمالي الأرباح (من الطلبات المسلمة فقط)
              </CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">
                {
                  orders
                      ?.filter((o) => o.delivered) // فقط الطلبات المسلمة
                      .reduce((acc, o) => {
                        if (!o.userId) {
                          return acc + o.packagePrice; // زبون غير مسجل
                        } else {
                          return acc + (o.packagePrice - 20); // زبون مسجل
                        }
                      }, 0)
                }{" "}
                شيكل
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>قائمة الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم العميل</TableHead>
                      <TableHead>المدينة</TableHead>
                      <TableHead>رقم العميل</TableHead>
                      <TableHead>رقم العميل الثاني</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>المنتج</TableHead>
                      <TableHead>سعر المنتج</TableHead>
                      <TableHead>المبلغ الكلي</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>تم التوصيل</TableHead>
                      <TableHead>حذف</TableHead> {/* ✅ العمود الجديد */}
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                            key={order._id}
                            className={order.delivered ? "bg-green-100" : ""}
                        >
                          <TableCell>{order?.name}</TableCell>
                          <TableCell>{order?.city}</TableCell>
                          <TableCell>{order?.phone}</TableCell>
                          <TableCell>{order?.secondPhone || "--------------------"}</TableCell>
                          <TableCell>{order?.email || "--------------------"}</TableCell>
                          <TableCell>{order?.package}</TableCell>
                          <TableCell>{order?.packagePrice}</TableCell>
                          <TableCell>{order?.totalPrice}</TableCell>
                          <TableCell>{order?.createdAt.split("T")[0]}</TableCell>

                          {/* ✅ تم التوصيل */}
                          <TableCell>
                            <input
                                type="checkbox"
                                checked={order.delivered}
                                onChange={async (e) => {
                                  const newDelivered = e.target.checked;
                                  const res = await fetch(
                                      `https://ignite69.com/api/order/${order._id}/status`,
                                      {
                                        method: "PUT",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ delivered: newDelivered }),
                                      }
                                  );

                                  if (res.ok) {
                                    setOrders((prev) =>
                                        prev.map((o) =>
                                            o._id === order._id
                                                ? { ...o, delivered: newDelivered }
                                                : o
                                        )
                                    );
                                  }
                                }}
                            />
                          </TableCell>

                          {/* 🗑️ زر الحذف */}
                          <TableCell>
                            <button
                                onClick={async () => {
                                  const token = localStorage.getItem("token");
                                  const confirmDelete = window.confirm(
                                      `هل أنت متأكد أنك تريد حذف الطلب الخاص بـ ${order.name}؟`
                                  );
                                  if (!confirmDelete) return;

                                  const res = await fetch(
                                      `https://ignite69.com/api/order/${order._id}`,
                                      {
                                        method: "DELETE",
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization: `Bearer ${token}`,
                                        }
                                      }
                                  );

                                  if (res.ok) {
                                    setOrders((prev) =>
                                        prev.filter((o) => o._id !== order._id)
                                    );
                                  } else {
                                    alert("حدث خطأ أثناء حذف الطلب");
                                  }
                                }}
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              🗑️
                            </button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>


          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>المستخدمين المسجلين</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>رقم الهاتف</TableHead>
                      <TableHead>رقم الهاتف الثاني</TableHead>
                      <TableHead>العنوان</TableHead>
                      <TableHead>المدينة</TableHead>
                      <TableHead>تاريخ التسجيل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email || '--------------------'}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.secondPhone || '--------------------'}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.city}</TableCell>
                        <TableCell>{user.createdAt.split("T")[0]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>إدارة التقييمات</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>المدينة</TableHead>
                      <TableHead>التقييم</TableHead>
                      <TableHead>التعليق</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>مرئي للعملاء</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews?.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">{review.name || '--------------------'}</TableCell>
                        <TableCell className="font-medium">{review.city || '--------------------'}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{review.contentText}</TableCell>
                        <TableCell>{review.createdAt.split("T")[0]}</TableCell>
                        <TableCell>
                          <Switch
                            checked={review.approved}
                            onCheckedChange={() => toggleReviewVisibility(review._id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
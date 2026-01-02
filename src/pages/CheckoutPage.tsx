import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, CreditCard, Truck, CheckCircle, MapPin, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { User as SupabaseUser } from "@supabase/supabase-js";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15),
  pinCode: z.string().min(6, "Pin code must be 6 digits").max(6),
  address: z.string().min(10, "Please enter a complete address").max(500),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  upiId: z.string().min(5, "Please enter a valid UPI ID").max(100).optional(),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pinCode: "",
    address: "",
    city: "",
    state: "",
    upiId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shippingCost = cartTotal > 500 ? 0 : 15;
  const total = cartTotal + shippingCost;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      // Pre-fill name from profile if available
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (profile?.full_name) {
          setFormData(prev => ({ ...prev, name: profile.full_name || '' }));
        }
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const validateForm = () => {
    try {
      const dataToValidate = {
        ...formData,
        upiId: paymentMethod === 'upi' ? formData.upiId : undefined,
      };
      checkoutSchema.parse(dataToValidate);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'upi' && !formData.upiId) {
      setErrors(prev => ({ ...prev, upiId: "UPI ID is required" }));
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pinCode}`;

      const { data, error } = await supabase
        .from("orders")
        .insert({
          user_id: user?.id || null,
          customer_name: formData.name.trim(),
          customer_email: user?.email || '',
          customer_phone: formData.phone.trim(),
          shipping_address: fullAddress,
          items: orderItems,
          subtotal: cartTotal,
          shipping_cost: shippingCost,
          total: total,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      setOrderId(data.id);
      setOrderComplete(true);
      clearCart();
      
      toast({
        title: "Order Placed!",
        description: "Thank you for your order. We'll contact you shortly.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-6 bg-card p-8 rounded-2xl border border-border"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <LogIn className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-3xl">Login Required</h1>
          <p className="text-muted-foreground">
            Please login to your account to proceed with checkout. This helps us track your orders and provide better service.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/auth")}
              className="w-full bg-gradient-gold text-charcoal hover:opacity-90"
            >
              Login to Continue
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="font-display text-3xl">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order ID is:
          </p>
          <p className="font-mono text-sm bg-muted p-3 rounded-lg break-all">{orderId}</p>
          <p className="text-sm text-muted-foreground">
            We'll contact you at {formData.phone} for delivery updates.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-gold text-charcoal hover:opacity-90"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30" />
          <h1 className="font-display text-2xl">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some items to checkout</p>
          <Button onClick={() => navigate("/")} variant="outline">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="font-display text-3xl md:text-4xl mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-muted/30 rounded-2xl p-6 space-y-6">
              <h2 className="font-display text-xl flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order Summary
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-display text-gold">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-500">Free</span>
                    ) : (
                      `$${shippingCost}`
                    )}
                  </span>
                </div>
                {cartTotal < 500 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $500
                  </p>
                )}
                <div className="flex justify-between text-lg font-display pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-gold">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details */}
              <div className="space-y-4">
                <h2 className="font-display text-xl flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Details
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter your phone number"
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h2 className="font-display text-xl flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="pinCode">Pin Code *</Label>
                  <Input
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) =>
                      setFormData({ ...formData, pinCode: e.target.value.replace(/\D/g, '').slice(0, 6) })
                    }
                    placeholder="Enter 6-digit pin code"
                    maxLength={6}
                    className={errors.pinCode ? "border-destructive" : ""}
                  />
                  {errors.pinCode && (
                    <p className="text-sm text-destructive">{errors.pinCode}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="House/Flat No., Building, Street, Area"
                    rows={3}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="City"
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive">{errors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      placeholder="State"
                      className={errors.state ? "border-destructive" : ""}
                    />
                    {errors.state && (
                      <p className="text-sm text-destructive">{errors.state}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h2 className="font-display text-xl flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className={`flex items-center space-x-3 p-4 rounded-xl border ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <span className="font-medium">UPI Payment</span>
                      <p className="text-sm text-muted-foreground">Pay using UPI ID (GPay, PhonePe, Paytm, etc.)</p>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 rounded-xl border ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <span className="font-medium">Cash on Delivery</span>
                      <p className="text-sm text-muted-foreground">Pay when you receive the order</p>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'upi' && (
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID *</Label>
                    <Input
                      id="upiId"
                      value={formData.upiId}
                      onChange={(e) =>
                        setFormData({ ...formData, upiId: e.target.value })
                      }
                      placeholder="yourname@upi"
                      className={errors.upiId ? "border-destructive" : ""}
                    />
                    {errors.upiId && (
                      <p className="text-sm text-destructive">{errors.upiId}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-muted/30 rounded-xl p-4 text-sm text-muted-foreground">
                <p>
                  🔒 Your payment information is secure. We'll send payment instructions to your phone.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-gold text-charcoal hover:opacity-90 font-body uppercase tracking-wider h-12"
              >
                {isSubmitting ? "Processing..." : `Place Order - $${total.toLocaleString()}`}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

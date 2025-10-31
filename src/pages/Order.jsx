import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Order = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [orderType, setOrderType] = useState('delivery');
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    guests: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        date: '',
        time: '',
        guests: ''
      });
    }, 2000);
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        date: '',
        time: '',
        guests: ''
      });
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Order Now - B Green Caterers | Food Delivery & Table Reservation</title>
        <meta name="description" content="Order delicious non-veg food for delivery or pickup. Reserve a table at caterers for an unforgettable dining experience." />
      </Helmet>

      <div className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-forest mb-4">Order & Reserve</h1>
            <p className="text-xl text-gray-600">Place your order or book a table</p>
          </motion.div>

          <Tabs defaultValue="order" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="order" className="text-lg">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order Food
              </TabsTrigger>
              <TabsTrigger value="reservation" className="text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Table Reservation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="order">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg shadow-lg p-6"
                  >
                    <h2 className="text-2xl font-bold text-forest mb-6">Your Cart</h2>
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 text-lg">Your cart is empty</p>
                        <p className="text-gray-500 mt-2">Add items from our menu to get started</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gold transition-colors">
                            <div className="flex-1">
                              <h3 className="font-semibold text-forest text-lg">{item.name}</h3>
                              <p className="text-gold font-bold">₹{item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="font-semibold w-8 text-center">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => removeFromCart(item.id)}
                                className="h-8 w-8 ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                    <h2 className="text-2xl font-bold text-forest mb-6">Order Details</h2>
                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                      <div className="flex gap-4 mb-4">
                        <Button
                          type="button"
                          variant={orderType === 'delivery' ? 'default' : 'outline'}
                          onClick={() => setOrderType('delivery')}
                          className={orderType === 'delivery' ? 'flex-1 bg-forest' : 'flex-1'}
                        >
                          Delivery
                        </Button>
                        <Button
                          type="button"
                          variant={orderType === 'pickup' ? 'default' : 'outline'}
                          onClick={() => setOrderType('pickup')}
                          className={orderType === 'pickup' ? 'flex-1 bg-forest' : 'flex-1'}
                        >
                          Pickup
                        </Button>
                      </div>

                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="74 330 330 31"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>

                      {orderType === 'delivery' && (
                        <div>
                          <Label htmlFor="address">Delivery Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            placeholder="B Green Caterers, nr. Kamdar Police Chowki, Gomtipur, Ahmedabad, Gujarat 380021"
                          />
                        </div>
                      )}

                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-semibold">₹{getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Delivery Fee:</span>
                          <span className="font-semibold">₹{orderType === 'delivery' ? '5.00' : '0.00'}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-forest border-t pt-2">
                          <span>Total:</span>
                          <span>₹{(getCartTotal() + (orderType === 'delivery' ? 5 : 0)).toFixed(2)}</span>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gold text-forest hover:bg-gold/90 text-lg py-6"
                        disabled={cart.length === 0}
                      >
                        Place Order
                      </Button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="reservation">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-forest mb-6">Reserve a Table</h2>
                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="res-name">Full Name</Label>
                      <Input
                        id="res-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="res-phone">Phone Number</Label>
                      <Input
                        id="res-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="74 330 330 31"
                      />
                    </div>

                    <div>
                      <Label htmlFor="res-email">Email</Label>
                      <Input
                        id="res-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        min="1"
                        max="20"
                        value={formData.guests}
                        onChange={handleInputChange}
                        required
                        placeholder="2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="date">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Date
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <Label htmlFor="time">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Time
                      </Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gold text-forest hover:bg-gold/90 text-lg py-6"
                  >
                    Reserve Table
                  </Button>
                </form>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-forest">Success! 🎉</DialogTitle>
            <DialogDescription className="text-lg">
              Your request has been received successfully. We'll contact you shortly to confirm the details.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Order;
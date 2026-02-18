import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCars } from "@/hooks/use-cars";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "wouter";

export default function Contact() {
  const { toast } = useToast();
  const { data: cars } = useCars();
  const [location] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carId: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if car ID is in URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get('car');
    if (carId) {
      setFormData(prev => ({ ...prev, carId }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCarSelect = (value: string) => {
    setFormData({
      ...formData,
      carId: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedCar = cars?.find(c => c.id === parseInt(formData.carId));
    const carInfo = selectedCar ? ` for ${selectedCar.make} ${selectedCar.model}` : '';

    toast({
      title: "Booking Request Sent!",
      description: `We'll contact you within 24 hours${carInfo}.`,
      variant: "default",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      carId: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Car Street, Andheri West", "Mumbai, Maharashtra 400053", "India"],
      color: "text-blue-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211", "Mon-Sat: 9AM - 8PM"],
      color: "text-green-500"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["info@sharedwheels.in", "support@sharedwheels.in", "Response within 24hrs"],
      color: "text-primary"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 8PM", "Saturday: 10AM - 6PM", "Sunday: Closed"],
      color: "text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            Book Your <span className="text-primary">Dream Car</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Select your preferred car and share your details. Our team will contact you within 24 hours to finalize your booking.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-card border-white/10 shadow-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-display font-bold mb-6 text-white">Book Your Dream Car</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Car Selection Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="carId">Select Car *</Label>
                    <Select value={formData.carId} onValueChange={handleCarSelect} required>
                      <SelectTrigger className="bg-background/50 border-white/10">
                        <SelectValue placeholder="Choose a car from our fleet" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10">
                        {cars?.map((car) => (
                          <SelectItem key={car.id} value={String(car.id)} className="text-white hover:bg-white/5">
                            {car.make} {car.model} ({car.year}) - ₹{(car.sharePrice / 100000).toFixed(1)}L
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Booking inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-background/50 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your preferred dates, any questions, or special requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="bg-background/50 border-white/10 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Send className="w-5 h-5 mr-2 animate-pulse" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Booking Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-card border-white/10 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${info.color}`}>
                    {info.icon}
                  </div>
                  <h3 className="font-bold text-white mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-display font-bold mb-6 text-white text-center">
                Quick Answers
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    q: "How does fractional ownership work?",
                    a: "You purchase a share in a vehicle and get access to it for a proportional number of days per year."
                  },
                  {
                    q: "What's included in the membership?",
                    a: "Insurance, maintenance, storage, and 24/7 concierge service are all included."
                  },
                  {
                    q: "Can I book multiple cars?",
                    a: "Yes! Members can book any available vehicle from our fleet based on their membership tier."
                  },
                  {
                    q: "How far in advance can I book?",
                    a: "You can book up to 6 months in advance, with priority given to share owners."
                  }
                ].map((faq, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">{faq.q}</h4>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

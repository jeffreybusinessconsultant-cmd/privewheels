import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Prive Wheels services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Membership Requirements</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Must be at least 21 years of age</li>
                <li>Hold a valid driving license for minimum 2 years</li>
                <li>Provide accurate personal and payment information</li>
                <li>Complete the membership verification process</li>
                <li>Maintain active membership status through timely payments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Vehicle Usage</h2>
              <p className="mb-4">Members agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use vehicles only for lawful purposes</li>
                <li>Return vehicles in the same condition as received</li>
                <li>Refuel vehicles to the same level before return</li>
                <li>Not smoke or allow smoking in vehicles</li>
                <li>Not sublease or transfer vehicle access to others</li>
                <li>Report any damage or issues immediately</li>
                <li>Follow all traffic laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Booking and Cancellation</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Bookings are subject to vehicle availability</li>
                <li>Cancellations must be made at least 48 hours in advance</li>
                <li>Late cancellations may incur charges</li>
                <li>No-shows will be charged the full booking amount</li>
                <li>Maximum 4 active bookings allowed at once</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Initial membership fee is non-refundable</li>
                <li>Annual subscription charges are due on membership anniversary</li>
                <li>Maintenance charges are calculated based on vehicle value</li>
                <li>Late payments may result in service suspension</li>
                <li>All fees are subject to applicable taxes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Insurance and Liability</h2>
              <p className="mb-4">
                All vehicles are covered by comprehensive insurance. However, members are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deductibles in case of accidents</li>
                <li>Damage caused by negligence or misuse</li>
                <li>Traffic violations and fines</li>
                <li>Loss of personal belongings in vehicles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Termination</h2>
              <p>
                We reserve the right to terminate membership for violation of these terms, fraudulent activity, or misuse of vehicles. Members may cancel membership with 30 days notice, subject to completion of existing bookings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact Information</h2>
              <p>
                For questions about these Terms of Service:
                <br />
                Email: response@dieselry.com
                <br />
                Phone: +91 9606996321
                <br />
                Address: Mantri Residency, Bannerghatta Road, Bangalore 560076
              </p>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

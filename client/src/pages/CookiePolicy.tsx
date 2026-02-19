import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function CookiePolicy() {
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
            Cookie <span className="text-primary">Policy</span>
          </h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Types of Cookies We Use</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Performance Cookies</h3>
                  <p>
                    These cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve our website's performance.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Functionality Cookies</h3>
                  <p>
                    These cookies allow our website to remember choices you make (such as your login details) and provide enhanced, personalized features.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                  <p>
                    We use analytics cookies to understand how visitors interact with our website, helping us improve user experience and optimize our services.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Cookies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To keep you signed in during your session</li>
                <li>To remember your preferences and settings</li>
                <li>To understand how you use our website</li>
                <li>To improve website performance and user experience</li>
                <li>To provide personalized content and recommendations</li>
                <li>To analyze traffic and usage patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Cookies</h2>
              <p className="mb-4">
                We may use third-party services that also set cookies on your device. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Payment processors for secure transactions</li>
                <li>Social media platforms for sharing features</li>
                <li>Customer support tools for assistance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Managing Cookies</h2>
              <p className="mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
                <li>Delete cookies: You can delete cookies already stored on your device</li>
                <li>Opt-out tools: Use third-party opt-out tools for analytics cookies</li>
              </ul>
              <p className="mt-4">
                Please note that disabling cookies may affect the functionality of our website and limit your access to certain features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookie Duration</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
              <p>
                If you have questions about our use of cookies:
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

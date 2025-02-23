import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="p-8 mx-auto max-w-5xl flex-grow">
        <h1 className="text-4xl font-bold text-center mb-6">Terms of Service</h1>
        <p className="text-gray-700 text-center mb-8">
          Last Updated: February 23, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing or using our services, you agree to be bound by these
            Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
          <p className="text-gray-600">
            You are responsible for maintaining the security of your account and
            for all activities conducted under your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Limitations of Liability</h2>
          <p className="text-gray-600">
            We are not liable for any indirect, incidental, or consequential
            damages arising from your use of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about these Terms of Service, please
            contact us at <strong>support@smartlearn.com</strong>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;

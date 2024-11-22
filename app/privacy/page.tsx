import { Footer } from "@/features/landing/Footer";
import { LandingNavbar } from "@/features/landing/LandingNavbar";

export default async function RoutePage() {
  return (
    <>
      <LandingNavbar />
      <section>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative pb-10 pt-32 md:pb-16 md:pt-40">
            <div className="mx-auto max-w-3xl pb-8 text-left text-gray-800 md:pb-8">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                OptiPixAI Privacy Policy
              </h1>
              <p className="mb-6 leading-relaxed text-gray-600">
                <strong>Last updated: November 18th, 2024</strong>
              </p>
              <p className="text-xl text-gray-600">
                Welcome to the OptiPixAI Privacy Policy. Your trust is essential
                to us, and we are committed to safeguarding your privacy.
              </p>
            </div>

            {/* Information We Collect Section */}
            <div className="mx-auto max-w-3xl text-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Information We Collect
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                OptiPixAI collects minimal personal information required to
                deliver our services effectively.
              </p>
              <ul className="mb-6 ml-8 list-disc leading-relaxed text-gray-600">
                <li>
                  <strong>Personal Information:</strong> When you sign up or log
                  in via NextAuth (GitHub or Google), we collect your name and
                  email address.
                </li>
                <li>
                  <strong>Generated Images:</strong> Images processed using
                  OptiPixAI are stored temporarily on Vercel Blob for your
                  convenience. These images are accessible only to you for
                  downloading or revisiting within your account.
                </li>
                <li>
                  <strong>Payment Information:</strong> Subscription payments
                  are handled securely through Stripe. OptiPixAI does not store
                  any credit card details.
                </li>
              </ul>
            </div>

            {/* How We Use Your Information Section */}
            <div className="mx-auto max-w-3xl text-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                How We Use Your Information
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                Your data is used exclusively for the purposes of delivering and
                improving our services:
              </p>
              <ul className="mb-6 ml-8 list-disc leading-relaxed text-gray-600">
                <li>
                  <strong>Personal Information:</strong> To authenticate your
                  account, communicate important updates, and manage
                  subscriptions.
                </li>
                <li>
                  <strong>Generated Images:</strong> To allow you to download or
                  revisit your processed images. These are not shared, sold, or
                  used for third-party purposes.
                </li>
                <li>
                  <strong>Payment Information:</strong> To process subscriptions
                  securely via Stripe.
                </li>
              </ul>
            </div>

            {/* Data Storage and Security Section */}
            <div className="mx-auto max-w-3xl text-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Data Storage and Security
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                OptiPixAI takes data security seriously. Measures include:
              </p>
              <ul className="mb-6 ml-8 list-disc leading-relaxed text-gray-600">
                <li>
                  <strong>Personal Information:</strong> Secured using
                  best-in-class practices to prevent unauthorized access or
                  misuse.
                </li>
                <li>
                  <strong>Generated Images:</strong> Temporarily stored on
                  Vercel Blob and deleted after [insert retention period, e.g.,
                  30 days] or when manually removed by you.
                </li>
                <li>
                  <strong>Payment Information:</strong> Managed securely through
                  Stripe. OptiPixAI does not store sensitive payment details.
                </li>
              </ul>
            </div>

            {/* Data Sharing Section */}
            <div className="mx-auto max-w-3xl text-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Sharing of Information
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                We do not share your data with third parties except as necessary
                for:
              </p>
              <ul className="mb-6 ml-8 list-disc leading-relaxed text-gray-600">
                <li>
                  Authentication services (GitHub and Google) via NextAuth.
                </li>
                <li>Payment processing through Stripe.</li>
              </ul>
            </div>

            {/* Data Retention Section */}
            <div className="mx-auto max-w-3xl text-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Data Retention
              </h2>
              <ul className="mb-6 ml-8 list-disc leading-relaxed text-gray-600">
                <li>
                  Personal information is retained as long as your account
                  remains active.
                </li>
                <li>
                  Generated images are stored temporarily and deleted after the
                  retention period or when removed by you.
                </li>
                <li>
                  Payment records are managed by Stripe according to their
                  retention policies.
                </li>
              </ul>
            </div>

            {/* Updates to the Privacy Policy Section */}
            <div className="mx-auto max-w-3xl text-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Updates to This Privacy Policy
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                This Privacy Policy may be updated periodically. Significant
                changes will be communicated prominently. The latest update date
                is noted at the top of this document.
              </p>
            </div>

            {/* Contact Us Section */}
            <div className="mx-auto max-w-3xl text-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Contact Us
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <ul className="mb-6 ml-8 list-disc leading-relaxed text-gray-600">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:freddy.jopha.dev@gmail.com"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    freddy.jopha.dev@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

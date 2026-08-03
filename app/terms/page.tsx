import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms of Service — Standex Digital",
  description: "Terms of Service for Standex Digital's websites, products, and services.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageShell eyebrow="Legal" title="Terms of Service">
      <p>Last updated: July 9, 2026</p>

      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the websites,
        products, and services (collectively, the &quot;Services&quot;) provided by Standex Digital
        (&quot;Standex Digital,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using the Services, you
        agree to be bound by these Terms. If you do not agree, do not use the Services.
      </p>

      <h2>1. Use of the Services</h2>
      <p>
        You may use the Services only in compliance with these Terms and all applicable laws. You
        agree not to misuse the Services, including by interfering with their normal operation,
        attempting unauthorized access to any system, or using the Services for unlawful purposes.
      </p>

      <h2>2. Accounts</h2>
      <p>
        Some features require an account. You are responsible for maintaining the confidentiality
        of your credentials and for all activity that occurs under your account. Notify us
        promptly of any unauthorized use.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        The Services, including all content, software, and trademarks, are owned by Standex
        Digital or its licensors and are protected by intellectual property laws. Except as
        expressly permitted, you may not copy, modify, distribute, or create derivative works
        from the Services without our prior written consent.
      </p>

      <h2>4. Client Work and Deliverables</h2>
      <p>
        Where Standex Digital provides consulting, engineering, or managed services under a
        separate statement of work or agreement, the terms of that agreement govern ownership,
        payment, and delivery of any resulting work product, and take precedence over these Terms
        in the event of a conflict.
      </p>

      <h2>5. Disclaimers</h2>
      <p>
        The Services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
        whether express or implied, including warranties of merchantability, fitness for a
        particular purpose, or non-infringement. We do not guarantee that the Services will be
        uninterrupted, secure, or error-free.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Standex Digital shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or any loss of
        profits, revenue, data, or goodwill, arising out of or related to your use of the
        Services.
      </p>

      <h2>7. Changes to the Services or Terms</h2>
      <p>
        We may update these Terms or modify the Services at any time. Material changes will be
        reflected by an updated &quot;Last updated&quot; date. Continued use of the Services after changes
        take effect constitutes acceptance of the revised Terms.
      </p>

      <h2>8. Termination</h2>
      <p>
        We may suspend or terminate your access to the Services at any time, with or without
        notice, for conduct that we believe violates these Terms or is otherwise harmful to us,
        other users, or third parties.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by applicable local law without regard to conflict-of-law
        principles, unless a separate signed agreement between you and Standex Digital specifies
        otherwise.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href="mailto:support@standexdigital.com" className="underline">
          support@standexdigital.com
        </a>
        .
      </p>
    </LegalPageShell>
  );
}

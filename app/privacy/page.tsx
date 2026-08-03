import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy — Standex Digital",
  description: "How Standex Digital collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell eyebrow="Legal" title="Privacy Policy">
      <p>Last updated: July 9, 2026</p>

      <p>
        This Privacy Policy explains how Standex Digital (&quot;Standex Digital,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) collects, uses, discloses, and safeguards information when you use our websites,
        products, and services (collectively, the &quot;Services&quot;).
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following categories of information:</p>
      <ul>
        <li>
          <strong>Information you provide:</strong> name, email address, company, and any other
          details you submit through contact forms, account registration, or enquiries.
        </li>
        <li>
          <strong>Usage data:</strong> pages visited, features used, and interactions with the
          Services, collected automatically via cookies and similar technologies.
        </li>
        <li>
          <strong>Device and log data:</strong> IP address, browser type, and operating system.
        </li>
        <li>
          <strong>Content you submit:</strong> files, prompts, or other materials you upload or
          generate while using our tools and workspaces.
        </li>
      </ul>

      <h2>2. How We Use Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, operate, and improve the Services;</li>
        <li>Respond to enquiries and support requests;</li>
        <li>Personalize your experience and remember preferences;</li>
        <li>Monitor usage, detect abuse, and maintain security;</li>
        <li>Send administrative or service-related communications;</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>
        We do not sell your personal information. We may share information with service providers
        who help us operate the Services (such as hosting, analytics, and email delivery
        providers), when required by law, or in connection with a business transaction such as a
        merger or acquisition. These providers are bound to protect your information consistent
        with this Policy.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We use cookies and similar technologies to operate the Services, remember preferences,
        and understand usage patterns. You can control cookies through your browser settings,
        though disabling them may affect functionality.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain information for as long as necessary to provide the Services, comply with legal
        obligations, resolve disputes, and enforce our agreements.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We implement reasonable technical and organizational measures designed to protect
        information from unauthorized access, loss, or misuse. No method of transmission or
        storage is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, delete, or restrict
        the use of your personal information. To exercise these rights, contact us using the
        details below.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        The Services are not directed to children under 16, and we do not knowingly collect
        personal information from children.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be reflected
        by an updated &quot;Last updated&quot; date. Continued use of the Services after changes take
        effect constitutes acceptance of the revised Policy.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about this Privacy Policy can be sent to{" "}
        <a href="mailto:support@standexdigital.com" className="underline">
          support@standexdigital.com
        </a>
        .
      </p>
    </LegalPageShell>
  );
}

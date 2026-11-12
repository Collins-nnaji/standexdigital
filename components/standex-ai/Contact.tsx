"use client";

import ContactHeader from "./Contact/ContactHeader";
import ContactEnquiryForm from "./Contact/ContactEnquiryForm";
import ContactLocation from "./Contact/ContactLocation";

const Contact = () => {
  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col bg-white">
      {/* Intake: header left, form right */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white text-zinc-950 pt-32 sm:pt-40 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 xl:gap-20 items-start">
            <ContactHeader />
            <ContactEnquiryForm />
          </div>
        </div>
      </section>

      {/* Reach us directly — below */}
      <ContactLocation />
    </div>
  );
};

export default Contact;

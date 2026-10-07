import { site } from "@/data/site";
import ContactForm from "./ContactForm";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        text={`Tell us about your project, or email ${site.email}.`}
      />
      <ContactForm />
    </section>
  );
}

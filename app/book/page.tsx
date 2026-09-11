import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../shared";

export const metadata: Metadata = {
  title: "Book a Session with Shana Madsen | Aura About You",
  description: "Choose aura photography, Reiki, hypnosis, energy clearing, or a private event with Shana Madsen in Portland, Oregon.",
};

const email = (subject: string) => `mailto:talkwithshana@gmail.com?subject=${encodeURIComponent(subject)}`;
const text = (message: string) => `sms:+15033101135?&body=${encodeURIComponent(message)}`;

const choices = [
  { tone: "blue", title: "Aura photograph", detail: "15 minutes · $50", copy: "Your aura portrait with a concise introduction to what appears.", subject: "Book an aura photograph" },
  { tone: "blue", title: "Full aura reading", detail: "30 minutes · $75", copy: "Your portrait, additional charts, and a detailed interpretation with Shana.", subject: "Book a full aura reading" },
  { tone: "green", title: "Reiki", detail: "30 min $60 · 60 min $90 · 90 min $120", copy: "A quiet, client-centered session offered in Portland or remotely.", subject: "Book a Reiki session" },
  { tone: "indigo", title: "Hypnosis", detail: "", copy: "Begin with a conversation about your goal, questions, and whether the work is a good fit.", subject: "Hypnosis consultation" },
  { tone: "red", title: "Energy clearing", detail: "", copy: "Tell Shana what is happening, where you are located, and what kind of support you are seeking.", subject: "Energy clearing inquiry" },
  { tone: "orange", title: "Private event", detail: "", copy: "Include your date, city, guest count, event length, and the experience you have in mind.", subject: "Private event inquiry" },
] as const;

export default function BookPage() {
  return <main className="tone-violet"><Header />
    <section className="bookingHero"><p className="eyebrow">Portland · Remote options available</p><h1>Choose what brings you closer.</h1><p className="lead">You do not need to know exactly what to ask for. Choose the experience that interests you, then contact Shana directly to find a time.</p></section>
    <section className="bookingChoices" aria-label="Session choices">
      {choices.map((choice) => <article className={`bookingChoice booking-${choice.tone}`} key={choice.title}>
        {choice.detail && <p className="eyebrow">{choice.detail}</p>}<h2>{choice.title}</h2><p>{choice.copy}</p>
        <div><a className="btn" href={email(choice.subject)}>Email to book</a><a className="line" href={text(`Hi Shana, I’m interested in: ${choice.title}.`)}>Text Shana →</a></div>
      </article>)}
    </section>
    <section className="bookingVisit"><div><p className="eyebrow">In-person sessions</p><h2>The Haven at JaJa PDX</h2><p>819 SE Taylor Street<br />Portland, Oregon 97214</p><a className="line" href="https://www.google.com/maps/search/?api=1&query=819+SE+Taylor+Street+Portland+OR+97214" target="_blank" rel="noreferrer">Open in maps ↗</a></div><div><p className="eyebrow">Not sure what fits?</p><h2>Begin with a conversation.</h2><p>Shana can answer questions, explain the differences, and help you choose without pressure.</p><a className="btn" href={email("Question about Aura About You services")}>Ask Shana</a></div></section>
    <section className="bookingNote"><p><strong>Plans change.</strong> If you need to reschedule, please give Shana 24 hours&apos; notice when possible.<br /><br />Sessions support personal exploration and relaxation. They do not diagnose, treat, or replace medical or mental-health care.</p><Link href="/aura-photography">Learn how aura photography works →</Link></section>
    <Footer />
  </main>;
}

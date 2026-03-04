import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzzEYcGRYma67tC8TMONISY-PHwP3JQPfiK_4YMzlnrSwAsBnQc_Ak29L0alMqpsXFN/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      setStatus("success");
      setForm({ name: "", phone: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Contact Us
          </h2>
          <p className="mt-3 text-gray-600">
            Leave your details and we'll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                id="contact-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-primary-700 text-white font-semibold py-3.5 rounded-xl hover:bg-primary-800 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>

            {status === "success" && (
              <p className="text-green-600 text-sm text-center font-medium">
                Thank you! We'll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm text-center font-medium">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

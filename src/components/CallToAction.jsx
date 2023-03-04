import Form from "./Form";

function CallToAction({ ctaRef }) {
  return (
    <section
      id="CTA"
      className="relative flex flex-col justify-center bg-secondary/25 px-4 sm:p-10 md:p-16 lg:p-24"
    >
      <h2
        ref={ctaRef}
        className="m-5 font-glock text-5xl font-bold tracking-widest md:m-16"
      >
        Connect with us
      </h2>
      <Form />
    </section>
  );
}

export default CallToAction;

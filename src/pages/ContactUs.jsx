function ContactUs() {
  return (
    <>
      <section>
        <div
          className="relative grid min-h-[50vh] place-items-center text-4xl font-bold text-white md:text-6xl"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1511747813271-99d6710c197d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="z-10">Contact Us</div>
          <div className="absolute inset-0 z-0 bg-black/50"></div>
        </div>
      </section>

      <section>
        <div className="mt-10 mb-20 space-y-4 divide-y-2 p-16 md:ml-16">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">
              Join us this Sunday!
            </h2>
          </div>
          <div>
            <p className="text-xl font-bold md:text-2xl">Kolfe Guenet Church</p>
            <p className="text-xl font-semibold md:text-2xl">4 Menta Tero</p>
          </div>
          <div className="md:text-xl">
            <p>Tel: +(251)-911-12-53-41</p>
            <p>Tel: +(251)-911-12-53-41</p>
            <p>Tel: +(251)-911-12-53-41</p>
          </div>
          <p className="font-semibold">Addis Ababa, Ethiopia</p>
        </div>
      </section>
    </>
  );
}

export default ContactUs;

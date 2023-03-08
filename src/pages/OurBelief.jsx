function OurBelief() {
  function scrollToContent() {
    const contentSection = document.getElementById("content");
    contentSection.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <>
      <section>
        <div>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1616947219290-8034a67f8644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Our Beliefs</h1>
                <p className="mb-5">
                  We belief in God the father. God the son. God the holyspirit.
                </p>
                <button className="btn-primary btn" onClick={scrollToContent}>
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article id="content">
        <div className="container m-4 mx-auto grid gap-4 md:grid-cols-2">
          <div className="space-y-4 p-4">
            <h1 className="text-3xl font-bold">About God</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
              reiciendis, nihil sint vitae ex odit debitis provident deserunt
              quisquam sequi consequatur quidem. Esse accusantium rem quaerat
              non illum repudiandae a repellendus harum, velit distinctio
              voluptates atque soluta culpa officia dolorum, eum nam odio
              aperiam nemo dolore voluptas blanditiis! Consequuntur, sapiente.
            </p>
          </div>

          <div className="space-y-4 p-4">
            <h1 className="text-3xl font-bold">About God</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
              reiciendis, nihil sint vitae ex odit debitis provident deserunt
              quisquam sequi consequatur quidem. Esse accusantium rem quaerat
              non illum repudiandae a repellendus harum, velit distinctio
              voluptates atque soluta culpa officia dolorum, eum nam odio
              aperiam nemo dolore voluptas blanditiis! Consequuntur, sapiente.
            </p>
          </div>

          <div className="space-y-4 p-4">
            <h1 className="text-3xl font-bold">About God</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
              reiciendis, nihil sint vitae ex odit debitis provident deserunt
              quisquam sequi consequatur quidem. Esse accusantium rem quaerat
              non illum repudiandae a repellendus harum, velit distinctio
              voluptates atque soluta culpa officia dolorum, eum nam odio
              aperiam nemo dolore voluptas blanditiis! Consequuntur, sapiente.
            </p>
          </div>

          <div className="space-y-4 p-4">
            <h1 className="text-3xl font-bold">About God</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
              reiciendis, nihil sint vitae ex odit debitis provident deserunt
              quisquam sequi consequatur quidem. Esse accusantium rem quaerat
              non illum repudiandae a repellendus harum, velit distinctio
              voluptates atque soluta culpa officia dolorum, eum nam odio
              aperiam nemo dolore voluptas blanditiis! Consequuntur, sapiente.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export default OurBelief;

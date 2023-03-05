import { RxQuote } from "react-icons/rx";

function Testimonial() {
  return (
    <section id="verse">
      <div className="md:p-15 flex h-full flex-col items-center justify-center p-10 text-white lg:p-52">
        <span>
          <RxQuote className="text-6xl md:text-8xl" />
        </span>
        <div className="space-y-6 rounded-md bg-secondary/50 p-10">
          <p className="text-md md:text-2xl">
            The believers shared a common purpose, and every day they spent much
            of their time together in the Temple area. They also ate together in
            their homes. They were happy to share their food and ate with joyful
            hearts.
          </p>
          <p className="text-md font-semibold">Acts 2:46</p>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;

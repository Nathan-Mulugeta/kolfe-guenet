import { GiPeaceDove } from "react-icons/gi";

function Card({ cardTitle, image, alt, cardContent }) {
  return (
    <div className="mt-6">
      <div className="card w-full bg-secondary shadow-xl md:w-full">
        {/* <span className="rounded-full bg-white px-2 py-2 drop-shadow-lg">
          <GiPeaceDove className="text-5xl text-secondary" />
        </span> */}
        <figure>
          <img src={image} alt={alt} />
        </figure>
        <div className="card-body text-normal">
          <h2 className="card-title">{cardTitle}</h2>
          <p>{cardContent}</p>
        </div>
      </div>

      {/* <div className="card w-96 bg-secondary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div> */}

      {/* <h2 className="font mt-10 font-serif text-3xl font-bold text-white md:text-xl">
        Our worship services
      </h2>
      <div>
        <p className="mt-8 text-2xl font-bold text-white md:text-lg">
          Sunday Service
        </p>
        <p className="mt-4 font-serif text-white">8:00 AM - 9:00 AM</p>
      </div>
      <div>
        <p className="mt-8 text-2xl font-bold text-white md:text-lg">
          Sunday Service
        </p>
        <p className="mt-4 font-serif text-white">8:00 AM - 9:00 AM</p>
      </div>
      <div>
        <p className="mt-8 text-2xl font-bold text-white md:text-lg">
          Sunday Service
        </p>
        <p className="mt-4 mb-6 font-serif text-white">8:00 AM - 9:00 AM</p>
      </div> */}
    </div>
  );
}

export default Card;

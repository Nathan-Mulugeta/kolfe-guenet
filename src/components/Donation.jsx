import CBE from "../assets/jpg/CBE.jpg";
import BirhanBank from "../assets/jpg/BirhanBank.jpg";
import AwashBank from "../assets/jpg/AwashBank.jpg";

function Donation({ DonateRef }) {
  return (
    <section ref={DonateRef} className="container mx-auto">
      <div className="divider"></div>
      <h3 className="mb-10 mt-20 p-4 text-3xl">Donate for the project ...</h3>

      <div className="m-4 grid gap-2 md:grid-cols-3">
        <div className="grid shadow-xl sm:rounded-xl">
          <div>
            <img src={CBE} alt="CBE" />
          </div>
          <div className="grid place-items-center gap-2 p-2 font-bold text-secondary">
            <p className="text-2xl tracking-tighter">Kolfe Guenet Church</p>
            <p>4 Menta Branch</p>
            <p>10001*******</p>
          </div>
        </div>

        <div className="grid shadow-xl sm:rounded-xl">
          <div>
            <img src={BirhanBank} alt="Birhan Bank" />
          </div>
          <div className="grid place-items-center gap-2 p-2 font-bold text-secondary">
            <p className="text-2xl tracking-tighter">Kolfe Guenet Church</p>
            <p>4 Menta Branch</p>
            <p>10001*******</p>
          </div>
        </div>

        <div className="grid shadow-xl sm:rounded-xl">
          <div>
            <img src={AwashBank} alt="Awash Bank" />
          </div>
          <div className="grid place-items-center gap-2 p-2 font-bold text-secondary">
            <p className="text-2xl tracking-tighter">Kolfe Guenet Church</p>
            <p>4 Menta Branch</p>
            <p>10001*******</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Donation;

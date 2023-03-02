import Card from "./Card";

function CardSection() {
  return (
    <section id="card">
      <div className="container mx-auto grid grid-cols-1 justify-items-center gap-5 px-2 md:grid-cols-2 md:flex-row md:justify-items-center md:gap-10 lg:grid-cols-3">
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
}

export default CardSection;

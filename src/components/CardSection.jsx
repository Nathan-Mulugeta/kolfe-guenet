import Card from "./Card";

function CardSection() {
  return (
    <section id="card">
      <div className="container mx-auto grid grid-cols-1 justify-items-center gap-5 px-2 md:grid-cols-2 md:justify-items-center md:gap-10 lg:grid-cols-3">
        <Card
          cardTitle="Youth Program"
          cardContent="Every Monday at 11:30"
          image="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80"
          alt="youth worship"
        />
        <Card
          cardTitle="Wednesday healing program"
          cardContent="Every Wednesday at 11:30"
          image="https://images.unsplash.com/photo-1582107208835-973713624596?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=326&q=80"
          alt="healing program"
        />
        <Card
          cardTitle="Friday teaching program"
          cardContent="Every Friday at 11:30"
          image="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="teaching program"
        />
      </div>
    </section>
  );
}

export default CardSection;

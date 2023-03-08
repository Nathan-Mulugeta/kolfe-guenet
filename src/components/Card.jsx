function Card({ cardTitle, image, alt, cardContent }) {
  return (
    <div className="mt-6">
      <div className="card w-full bg-secondary shadow-xl md:w-full">
        <figure>
          <img src={image} alt={alt} />
        </figure>
        <div className="card-body text-normal">
          <h2 className="card-title">{cardTitle}</h2>
          <p>{cardContent}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

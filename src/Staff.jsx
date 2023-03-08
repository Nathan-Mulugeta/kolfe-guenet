import PastorMulu from "./assets/jpg/staff/pastorMulu.jpg";
import PastorAlex from "./assets/jpg/staff/pastorAlex.jpg";
import Zerihun from "./assets/jpg/staff/zerihun.jpg";
import Melis from "./assets/jpg/staff/melis.jpg";
import Tigistu from "./assets/jpg/staff/tigistu.jpg";

function Staff() {
  const people = [
    {
      name: "Mulugeta Lemma",
      role: "Pastor",
      imageUrl: PastorMulu,
    },
    {
      name: "Alexander",
      role: "Pastor",
      imageUrl: PastorAlex,
    },
    {
      name: "Zerihun Demelash",
      role: "Youth Ministry",
      imageUrl: Zerihun,
    },
    {
      name: "Tigistu",
      role: "Evangelist",
      imageUrl: Tigistu,
    },
    {
      name: "Melis",
      role: "Evangelist",
      imageUrl: Melis,
    },
  ];

  return (
    <>
      <section>
        <div
          className="relative grid min-h-[50vh] place-items-center text-4xl font-bold text-white"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1511747813271-99d6710c197d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="z-10 text-5xl">Staff</div>
          <div className="absolute inset-0 z-0 bg-black/50"></div>
        </div>
      </section>

      <section>
        <div className="container mx-auto">
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Meet our staff
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Kolfe Guenet Church is blessed with a dedicated full time
                  staff who handle the day to day operation of the church.{" "}
                  <strong>Here are our staff members.</strong>
                </p>
              </div>

              {/* eslint-disable-next-line */}
              <ul
                role="list"
                className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
              >
                {people.map((person) => (
                  <li key={person.name}>
                    <div className="flex items-center gap-x-6">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={person.imageUrl}
                        alt=""
                      />
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                          {person.name}
                        </h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-600">
                          {person.role}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Staff;

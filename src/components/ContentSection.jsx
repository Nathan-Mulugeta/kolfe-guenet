import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import Img1 from "../assets/jpg/churchDesign/05.jpg";

export default function Example() {
  return (
    <>
      <article>
        <div className="relative isolate overflow-hidden bg-white px-6 py-12 sm:py-16 lg:overflow-visible lg:px-0">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              />
            </svg>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <p className="text-base font-semibold leading-7 text-indigo-600">
                    It started like this ...
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Heaven's Gate Project
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    I answered them by saying, “The God of heaven will give us
                    success. We his servants will start rebuilding, but as for
                    you, you have no share in Jerusalem or any claim or historic
                    right to it.” - Nehemiah 2:20 [1]
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 ml-6 justify-self-start rounded-xl lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
              <img
                className="w-[28rem] max-w-none bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src={Img1}
                alt="church design"
              />
            </div>

            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p>
                    As we first started the project we didn't put our faith in
                    anything or anyone, we believed in God and we took the first
                    step in faith.
                  </p>

                  {/* eslint-disable-next-line */}

                  <p className="mt-8">
                    The plan went this and that. Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Nesciunt quod dolores
                    recusandae vitae fugiat vel amet consectetur minus enim
                    repellat quam obcaecati voluptatibus, est ipsum magni
                    consequuntur, architecto expedita maxime alias tempore
                    accusantium quos, in repudiandae! Maxime asperiores tenetur
                    commodi quae autem fugit iste. Ratione provident perferendis
                    nobis corporis adipisci.
                  </p>
                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                    About something else
                  </h2>
                  <p className="mt-6">
                    Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
                    consequat in. Convallis arcu ipsum urna nibh. Pharetra,
                    euismod vitae interdum mauris enim, consequat vulputate
                    nibh. Maecenas pellentesque id sed tellus mauris, ultrices
                    mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam
                    sed nullam sed diam turpis ipsum eu a sed convallis diam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      {/* // Second one */}
      <article>
        <div className="relative isolate overflow-hidden bg-white px-6 py-12 sm:py-16 lg:overflow-visible lg:px-0">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              />
            </svg>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <p className="text-base font-semibold leading-7 text-indigo-600">
                    ... it then continued like this
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    The first step ... demolishing
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-700">
                    The first people to come were this and that and those. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Ex,
                    maiores!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 ml-6 justify-self-end rounded-xl lg:sticky lg:top-4 lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:overflow-hidden ">
              <img
                className="w-[28rem] max-w-none translate-x-1/3 bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src={Img1}
                alt="church design"
              />
            </div>

            <div className="lg:col-span-2 lg:col-start-2 lg:row-start-3 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p>
                    The amazing thing is this Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Maiores excepturi similique
                    repudiandae ab neque, repellendus quis expedita deserunt?
                    Quia esse maiores ab distinctio provident in? Quia
                    recusandae laudantium iusto exercitationem doloribus ipsam,
                    non facere cumque tempora illum dolorem fugit repellendus,
                    explicabo vero ullam distinctio qui magnam cupiditate
                    deleniti debitis beatae.
                  </p>

                  {/* eslint-disable-next-line */}

                  <p className="mt-8">
                    Et vitae blandit facilisi magna lacus commodo. Vitae sapien
                    duis odio id et. Id blandit molestie auctor fermentum
                    dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                    varius vulputate et ultrices hac adipiscing egestas. Iaculis
                    convallis ac tempor et ut. Ac lorem vel integer orci.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

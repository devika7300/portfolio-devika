import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Certifications() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { certifications } = portfolioData;
   return (
    <div>
      <SectionTitle title="Certifications" />

      <div className="flex py-5 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {certifications.map((certification, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4-ml-[2px] bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {certification.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {certifications[selectedItemIndex].title}
            </h1>
            <p className="text-white text-justify">
              {certifications[selectedItemIndex].description}
            </p>
          </div>
          <img
            src={certifications[selectedItemIndex].image}
            alt=""
            className="h-52 w-82"
          />
        </div>
      </div>
    </div>
  );
}

export default Certifications;

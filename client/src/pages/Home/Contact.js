import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  //delete contact._id;
  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col">
          <p className="text-tertiary">{"{"}</p>
          {Object.keys(contact).map(
            (key) =>
              key !== "_id" && (
                <p className="ml-5">
                  <span className="text-tertiary">{key} : </span>
                  <span className="text-tertiary">{contact[key]}</span>
                </p>
              )
          )}
          <p className="text-white">{"}"}</p>
        </div>
        <div className="h-[320px]">
          <lottie-player
            src="https://lottie.host/b17ce316-1a79-422c-9ab4-65bd2a23d86d/XJPCvny5SW.json"
            background="transparent"
            speed="1"
            direction="1"
            mode="normal"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;

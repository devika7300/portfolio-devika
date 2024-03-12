import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="/">
            <i class="ri-mail-line text-gray-500 "></i>
          </a>
          <a href="https://www.linkedin.com/in/devika-shendkar/">
            <i class="ri-linkedin-box-fill text-gray-500 "></i>
          </a>
          <a href="https://github.com/devika7300">
            <i class="ri-github-fill text-gray-500 "></i>
          </a>
        </div>
        <div className="w-[1px] h-32 bg-tertiary opacity-20 sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;

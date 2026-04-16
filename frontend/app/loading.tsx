import React from "react";
import Image from "next/image";
export default function Loading() {
  return (
    <>
      {/*Preloader*/}
      <div id="preloader">
        <div id="loader" className="loader">
          <div className="loader-container">
            <div className="loader-icon">
              <Image src="/assets/imgs/template/logo/logo-gradient.svg" alt="Preloader" width={500} height={500} />
            </div>
          </div>
        </div>
      </div>
      {/*Preloader-end */}
    </>
  );
}

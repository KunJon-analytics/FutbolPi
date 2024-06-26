import React from "react";
import Script from "next/script";

const SoccerApi = () => {
  return (
    <>
      <div
        id="ls-widget"
        data-w="awo_w5668_667bb3caeb1fa"
        className="livescore-widget"
      ></div>
      <Script
        src="https://ls.soccersapi.com/widget/res/awo_w5668_667bb3caeb1fa/widget.js"
        type="text/javascript"
        strategy="lazyOnload"
      />
    </>
  );
};

export default SoccerApi;

import React from "react";
import "./Widget.scss";

function Widget() {
  return (
    <aside className="widget hidden md:flex w-1/3 lg:w-3/12  justify-center lg:justify-end pr-2">
      <iframe
        title="Iframe Widget"
        src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/franceinter&tabs=timeline&width=250&height=1400&small_header=false&adabt_container_width=true&hide_cover=false&show_facepile=true&appId"
        height="100%"
        width="250"
        frameBorder="0"
        scroll="no"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </aside>
  );
}

export default Widget;

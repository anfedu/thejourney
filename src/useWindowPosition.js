import { useLayoutEffect, useState } from "react";

export default function useWindowPosition(id, number) {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    function updatePosition() {
      const offset = window.document.getElementById(id).offsetHeight;
      const pageY = window.pageYOffset;
      if (pageY > offset * number) {
        setAnimation(true);
      } else if (pageY < offset) {
        setAnimation(false);
      }
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [id]);
  return animation;
}

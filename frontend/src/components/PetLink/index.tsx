"use client";

import Link, { LinkProps } from "next/link";
import NProgress from "nprogress";
import { useEffect } from "react";

export function PETLink(props: LinkProps) {
  function linkClicked() {
    if (props.href === window.location.href.replace(window.location.origin, "")) {
      return;
    }
  }

  useEffect(() => {
    return () => {
      NProgress.done();
    };
  }, []);

  return <Link {...props} onClick={() => linkClicked} />;
}

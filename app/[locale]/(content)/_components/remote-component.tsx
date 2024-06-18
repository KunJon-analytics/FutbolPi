import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import React from "react";

type Props = { url: string };

const RemoteComponent = async ({ url }: Props) => {
  const res = await fetch(url);

  if (!res.ok) {
    notFound();
  }

  const markdown = await res.text();
  return <MDXRemote source={markdown} />;
};

export default RemoteComponent;

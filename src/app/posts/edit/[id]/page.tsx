import * as React from "react";
import PostFormClient from "../PostFormClient";

interface Props {
  params: Promise<{ id: string }>; // Promise で渡ってくる場合
}

export default function EditPostPage({ params }: Props) {
  const { id } = React.use(params); // params を unwrap
  return <PostFormClient id={id} />;
}

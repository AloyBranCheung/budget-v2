import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorText from "./ErrorText";

interface DependsAxiosProps {
  isLoading: boolean;
  isError: boolean;
  errMsg: string;
  children: React.ReactNode; // component to return
}

export default function DependsAxios({
  isLoading,
  isError,
  children,
  errMsg,
}: DependsAxiosProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return <ErrorText>{errMsg}</ErrorText>;
  }
  return children;
}

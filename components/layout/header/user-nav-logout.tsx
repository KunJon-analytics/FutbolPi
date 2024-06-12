"use client";

import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/session";

const UserNavLogout = () => {
  const queryClient = useQueryClient();
  const signout = async () => {
    logout();
    queryClient.invalidateQueries({
      queryKey: ["session"],
    });
  };
  return <DropdownMenuItem onClick={signout}>Log out</DropdownMenuItem>;
};

export default UserNavLogout;

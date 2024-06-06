"use client";

import React from "react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/session";

const UserNavLogout = () => {
  return <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>;
};

export default UserNavLogout;

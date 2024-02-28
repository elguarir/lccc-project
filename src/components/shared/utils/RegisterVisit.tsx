"use client";

import { useEffect } from "react";

const RegisterVisit = () => {
  useEffect(() => {
    let registervisit = async () => {
      await fetch("/api/visits");
    };
    registervisit();
  }, []);

  return null;
};

export default RegisterVisit;

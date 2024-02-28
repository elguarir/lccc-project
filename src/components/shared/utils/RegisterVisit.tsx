"use client";

import { useEffect } from "react";

const RegisterVisit = () => {
  useEffect(() => {
    let registervisit = async () => {
      await fetch("/api/visit");
    };
    registervisit();
  }, []);

  return null;
};

export default RegisterVisit;

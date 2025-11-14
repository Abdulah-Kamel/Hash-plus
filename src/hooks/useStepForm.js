import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useStepForm = (schema, defaultValues) =>
  useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

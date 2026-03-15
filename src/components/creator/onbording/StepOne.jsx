// components/StepOne.tsx
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function StepOne({ form }) {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold">What would you like to create?</h2>
      <FormField
        control={form.control}
        name="contentType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-3 gap-4"
              >
                {["mindmap", "quiz", "summary"].map((type) => (
                  <FormLabel
                    key={type}
                    className="border-2 rounded-lg p-4 cursor-pointer hover:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                  >
                    <RadioGroupItem value={type} className="sr-only" />
                    <div className="capitalize font-semibold">{type}</div>
                  </FormLabel>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

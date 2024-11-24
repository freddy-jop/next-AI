/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { KeyRound, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { singInActionWitEmail } from "../auth/auth.action";
import { EmailSchema, EmailType } from "./email.schema";
import { Form } from "./Form";

export const MagicLink = () => {
  const form = useForm<EmailType>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const mutation = useMutation({
    mutationFn: async (values: EmailType) => {
      try {
        const response = await singInActionWitEmail(values.email);

        if (response.includes("error")) {
          throw new Error("Error sending email");
        }

        toast.custom(
          () => (
            <div
              className={`flex w-full max-w-md items-center rounded-lg bg-white shadow-md ring-4 ring-black ring-opacity-25`}
            >
              <div className="flex items-center p-4">
                <Send className="size-6 text-cyan-600" />
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900">
                    Check your inbox to complete your sign-in with the Magic
                    Link!
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    No email? Don’t forget to peek into your spam or junk
                    folder—it might be hiding there!
                  </p>
                </div>
              </div>
            </div>
          ),
          {
            duration: 10000,
          }
        );
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <div className="w-full">
      <Form
        form={form}
        onSubmit={async (values) => {
          await mutation.mutateAsync(values);
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormDescription>
                  <span className="text-sm text-gray-500">
                    Tape your mail, Validate and Check to your Email inbox
                  </span>
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="yourusermail@gmail.com"
                    onChange={field.onChange}
                    value={field.value ?? ""}
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 py-5 text-gray-700 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200"
                  />
                </FormControl>
                <FormMessage />
                {mutation.isError && (
                  <div className="flex items-center justify-center">
                    <p className="text-sm text-red-500">Error sending email</p>
                  </div>
                )}
              </FormItem>
            )}
          />
          <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-cyan-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300">
            <KeyRound className="size-5" />
            <span>Sign in with Magic Link</span>
          </button>
        </div>
      </Form>
    </div>
  );
};

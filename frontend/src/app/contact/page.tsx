"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedGradientBackground from "@/components/animated-gradient-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log(values)
      setIsSuccess(true)

      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible.",
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        form.reset()
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-light-green/20 dark:bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-green-900">
      <AnimatedGradientBackground />
      <Header />

      <section className="w-full py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">Contact Us</h1>
              <p className="text-xl text-zinc-700 dark:text-gray-300 max-w-3xl mx-auto">
                Have questions or feedback? We'd love to hear from you. Get in touch with our team.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-xl shadow-md border border-gray-200/50 dark:border-zinc-800/50 mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Get In Touch</h2>

                  {isSuccess ? (
                    <div className="text-center py-8">
                      <CheckCircle2
                        className={`h-16 w-16 mx-auto mb-4 ${isDark ? "text-light-green" : "text-deep-green"}`}
                      />
                      <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Message Sent!</h3>
                      <p className="text-zinc-700 dark:text-gray-300">
                        Thank you for reaching out. We'll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-zinc-900 dark:text-white">Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  {...field}
                                  className={`${
                                    isDark
                                      ? "bg-zinc-800/50 border-zinc-700 focus:border-light-green focus:ring-light-green/20 text-white"
                                      : "bg-gray-50 border-gray-200 focus:border-deep-green focus:ring-deep-green/20 text-zinc-900"
                                  }`}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-300" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-zinc-900 dark:text-white">Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your email"
                                  type="email"
                                  {...field}
                                  className={`${
                                    isDark
                                      ? "bg-zinc-800/50 border-zinc-700 focus:border-light-green focus:ring-light-green/20 text-white"
                                      : "bg-gray-50 border-gray-200 focus:border-deep-green focus:ring-deep-green/20 text-zinc-900"
                                  }`}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-300" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-zinc-900 dark:text-white">Subject</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Message subject"
                                  {...field}
                                  className={`${
                                    isDark
                                      ? "bg-zinc-800/50 border-zinc-700 focus:border-light-green focus:ring-light-green/20 text-white"
                                      : "bg-gray-50 border-gray-200 focus:border-deep-green focus:ring-deep-green/20 text-zinc-900"
                                  }`}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 dark:text-red-300" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-zinc-900 dark:text-white">Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Your message"
                                  rows={5}
                                  {...field}
                                  className={`${
                                    isDark
                                      ? "bg-zinc-800/50 border-zinc-700 focus:border-light-green focus:ring-light-green/20 text-white"
                                      : "bg-gray-50 border-gray-200 focus:border-deep-green focus:ring-deep-green/20 text-zinc-900"
                                  } resize-none`}
                                />
                              </FormControl>
                              <FormDescription className="text-zinc-600 dark:text-gray-400">
                                Please provide as much detail as possible.
                              </FormDescription>
                              <FormMessage className="text-red-500 dark:text-red-300" />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className={`w-full ${
                            isDark
                              ? "bg-light-green hover:bg-light-green/90 text-zinc-950"
                              : "bg-deep-green hover:bg-deep-green/90 text-white"
                          } py-6 text-lg font-medium transition-colors duration-300`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-xl shadow-md border border-gray-200/50 dark:border-zinc-800/50 mb-8">
                  <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Contact Information</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div
                        className={`${
                          isDark ? "bg-light-green/20 text-light-green" : "bg-deep-green/20 text-deep-green"
                        } p-3 rounded-full mr-4`}
                      >
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-zinc-900 dark:text-white">Email</h3>
                        <p className="text-zinc-700 dark:text-gray-300">getswastify@gmail.com</p>
                       
                      </div>
                    </div>

                    

                    <div className="flex items-start">
                      <div
                        className={`${
                          isDark ? "bg-light-green/20 text-light-green" : "bg-deep-green/20 text-deep-green"
                        } p-3 rounded-full mr-4`}
                      >
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-zinc-900 dark:text-white">Address</h3>
                        <p className="text-zinc-700 dark:text-gray-300">
                         Udupi, Karnataka, India
                          <br />
                       
                        </p>
                      </div>
                    </div>

                  
                  </div>
                </div>

                <div className="bg-deep-green/10 dark:bg-light-green/10 p-6 rounded-lg border border-deep-green/20 dark:border-light-green/20">
                  <h3 className="text-xl font-bold mb-4 text-deep-green dark:text-light-green">Connect With Us</h3>
                  <p className="text-zinc-700 dark:text-gray-300 mb-4">
                    Follow us on social media to stay updated with our latest initiatives and healthcare insights.
                  </p>
                  <div className="flex space-x-4">
                    
                   
                    
                  <Link
  href="https://www.linkedin.com/company/getswastify/"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    variant="outline"
    size="icon"
    className="rounded-full border-deep-green/50  cursor-pointer dark:border-light-green/50 text-deep-green dark:text-light-green hover:bg-deep-green/10 dark:hover:bg-light-green/10"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect width="4" height="12" x="2" y="9"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
    <span className="sr-only">LinkedIn</span>
  </Button>
</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata = {
  title: "Checkout - JSON Generator",
  description: "Complete your purchase",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <section className="container mx-auto py-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-center text-3xl font-bold tracking-tight sm:text-4xl">Complete your purchase</h1>
          <p className="mb-10 text-center text-gray-500 dark:text-gray-400">
            You&apos;re just a few steps away from accessing our Pro features
          </p>
          
          <div className="grid gap-6 md:grid-cols-[1fr_400px]">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter your payment details below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name on card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card">Card number</Label>
                  <Input id="card" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Complete Purchase</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Pro plan subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span>Pro Plan (Monthly)</span>
                  <span className="font-medium">$9.00</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span>Tax</span>
                  <span className="font-medium">$0.90</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">$9.90</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 
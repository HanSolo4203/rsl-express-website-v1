"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { 
  Calculator, 
  RefreshCw, 
  ChevronDown, 
  ChevronRight,
  Loader2,
  RotateCcw,
  Trash2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { PRICE_LIST, PER_KG, Category } from "@/config/prices"
import { computeEstimate, EstimateResult } from "@/lib/estimate"

// Form validation schema
const EstimateFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  businessName: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  mode: z.enum(["per-item", "per-kg", "mixed"]),
  weeklyItems: z.record(z.string(), z.number().min(0)).optional(),
  bulkByKg: z.object({
    wdifKg: z.number().min(0).optional(),
    wdfKg: z.number().min(0).optional(),
    colorSeparated: z.boolean().optional(),
  }).optional(),
})

type EstimateFormData = z.infer<typeof EstimateFormSchema>

// Group price list by category
const groupedPrices = PRICE_LIST.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = []
  }
  acc[item.category].push(item)
  return acc
}, {} as Record<Category, typeof PRICE_LIST>)

// Form state persistence key
const FORM_STORAGE_KEY = 'rsl-estimate-form'

// Helper function to initialize weeklyItems with all zeros
const initializeWeeklyItems = () => {
  const weeklyItems: Record<string, number> = {}
  PRICE_LIST.forEach(item => {
    weeklyItems[item.code] = 0
  })
  return weeklyItems
}

export function EstimateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [estimateResult, setEstimateResult] = useState<EstimateResult | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const form = useForm<EstimateFormData>({
    resolver: zodResolver(EstimateFormSchema),
    defaultValues: {
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      mode: "per-item",
      weeklyItems: initializeWeeklyItems(),
      bulkByKg: {
        wdifKg: 0,
        wdfKg: 0,
        colorSeparated: false,
      },
    },
  })

  const watchedValues = form.watch()
  const currentEstimate = computeEstimate({
    weeklyItems: watchedValues.weeklyItems || {},
    bulkByKg: watchedValues.bulkByKg,
    mode: watchedValues.mode,
  })

  // Load form state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        form.reset(parsed)
        
        // Restore expanded categories
        if (parsed.expandedCategories) {
          setExpandedCategories(new Set(parsed.expandedCategories))
        }
        
        toast.info("Form data restored from previous session")
      }
    } catch (error) {
      console.error('Failed to load form state:', error)
    }
  }, [form])

  // Save form state to localStorage whenever form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      try {
        const formData = {
          ...value,
          expandedCategories: Array.from(expandedCategories)
        }
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData))
      } catch (error) {
        console.error('Failed to save form state:', error)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, expandedCategories])

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const clearAllItems = () => {
    const clearedItems: Record<string, number> = {}
    PRICE_LIST.forEach(item => {
      clearedItems[item.code] = 0
    })
    form.setValue("weeklyItems", clearedItems)
    toast.info("All item quantities cleared")
  }

  const clearCategory = (category: Category) => {
    const currentItems = { ...form.getValues("weeklyItems") }
    const categoryItems = groupedPrices[category]
    categoryItems.forEach(item => {
      currentItems[item.code] = 0
    })
    form.setValue("weeklyItems", currentItems)
    toast.info(`${category} category cleared`)
  }

  // FIXED: Clean data before sending to API
  const onSubmit = async (data: EstimateFormData) => {
    setIsSubmitting(true)
    try {
      // Clean weeklyItems - filter out undefined values and ensure all values are numbers
      const cleanedWeeklyItems: Record<string, number> = {}
      if (data.weeklyItems) {
        for (const [key, value] of Object.entries(data.weeklyItems)) {
          if (typeof value === 'number' && !isNaN(value) && value >= 0) {
            cleanedWeeklyItems[key] = value
          }
        }
      }

      // Clean bulkByKg - ensure all values are valid numbers
      const cleanedBulkByKg = {
        wdifKg: typeof data.bulkByKg?.wdifKg === 'number' && !isNaN(data.bulkByKg.wdifKg) ? data.bulkByKg.wdifKg : 0,
        wdfKg: typeof data.bulkByKg?.wdfKg === 'number' && !isNaN(data.bulkByKg.wdfKg) ? data.bulkByKg.wdfKg : 0,
        colorSeparated: Boolean(data.bulkByKg?.colorSeparated),
      }

      // Prepare clean data for API
      const cleanData = {
        fullName: data.fullName,
        businessName: data.businessName || undefined,
        email: data.email,
        phone: data.phone || undefined,
        mode: data.mode,
        weeklyItems: cleanedWeeklyItems,
        bulkByKg: cleanedBulkByKg,
      }

      console.log('Sending clean data to API:', cleanData)

      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanData),
      })

      const result = await response.json()

      if (result.ok) {
        toast.success("Estimate submitted successfully!")
        setEstimateResult(result)
        // Clear localStorage after successful submission
        localStorage.removeItem(FORM_STORAGE_KEY)
      } else {
        toast.error(result.error || "Failed to submit estimate")
      }
    } catch (error) {
      toast.error("Network error. Please try again.")
      console.error('Estimate submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onReset = () => {
    form.reset()
    setEstimateResult(null)
    setExpandedCategories(new Set())
    localStorage.removeItem(FORM_STORAGE_KEY)
    toast.info("Form reset and cleared")
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  <CardTitle>Request Your Estimate</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="cursor-help">
                        Pricing: 2025
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sourced from RSL Express 2025 Price List</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <CardDescription>
                Fill in your details and weekly linen volumes for an accurate quote.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your business name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+27 123 456 789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* Mode Selector */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Pricing Mode</Label>
                    <div className="flex gap-2">
                      {[
                        { value: "per-item", label: "Per Item" },
                        { value: "per-kg", label: "Per Kg" },
                        { value: "mixed", label: "Mixed" },
                      ].map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={watchedValues.mode === option.value ? "default" : "outline"}
                          onClick={() => form.setValue("mode", option.value as EstimateFormData['mode'])}
                          className="flex-1"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Per Item Section */}
                  {(watchedValues.mode === "per-item" || watchedValues.mode === "mixed") && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">Weekly Items by Category</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={clearAllItems}
                          className="text-xs"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Set all to 0
                        </Button>
                      </div>
                      
                      {Object.entries(groupedPrices).map(([category, items]) => (
                        <Card key={category} className="border-2">
                          <CardHeader 
                            className="cursor-pointer sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10"
                            onClick={() => toggleCategory(category)}
                          >
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg capitalize">
                                {category.replace(/([A-Z])/g, ' $1').trim()}
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    clearCategory(category as Category)
                                  }}
                                  className="text-xs text-muted-foreground hover:text-foreground"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Clear
                                </Button>
                                {expandedCategories.has(category) ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          {expandedCategories.has(category) && (
                            <CardContent className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {items.map((item) => (
                                  <FormField
                                    key={item.code}
                                    control={form.control}
                                    name={`weeklyItems.${item.code}`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <div className="flex items-center gap-2">
                                          <FormLabel 
                                            htmlFor={item.code} 
                                            className="flex-1 text-sm font-normal"
                                          >
                                            {item.name}
                                          </FormLabel>
                                          <div className="flex items-center gap-1">
                                            <FormControl>
                                              <Input
                                                id={item.code}
                                                type="number"
                                                min="0"
                                                step="1"
                                                className="w-20"
                                                aria-describedby={`${item.code}-price`}
                                                {...field}
                                                value={field.value || 0}
                                                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                              />
                                            </FormControl>
                                            <span 
                                              id={`${item.code}-price`}
                                              className="text-xs text-muted-foreground w-8"
                                            >
                                              R{item.price.toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Per Kg Section */}
                  {(watchedValues.mode === "per-kg" || watchedValues.mode === "mixed") && (
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Bulk Pricing (per kg)</Label>
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="bulkByKg.wdifKg"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Wash, Dry, Iron, Fold (kg)</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="wdifKg"
                                      type="number"
                                      min="0"
                                      step="0.1"
                                      placeholder="0"
                                      aria-describedby="wdifKg-price"
                                      {...field}
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                  <FormDescription id="wdifKg-price">
                                    R{PER_KG.wdif.price.toFixed(2)}/kg standard, R{PER_KG.wdifColor.price.toFixed(2)}/kg color separated
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="bulkByKg.wdfKg"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Wash, Dry, Fold (kg)</FormLabel>
                                  <FormControl>
                                    <Input
                                      id="wdfKg"
                                      type="number"
                                      min="0"
                                      step="0.1"
                                      placeholder="0"
                                      aria-describedby="wdfKg-price"
                                      {...field}
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                  <FormDescription id="wdfKg-price">
                                    R{PER_KG.wdf.price.toFixed(2)}/kg standard, R{PER_KG.wdfColor.price.toFixed(2)}/kg color separated
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="bulkByKg.colorSeparated"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <input
                                    id="colorSeparated"
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="rounded border-gray-300"
                                    aria-describedby="colorSeparated-description"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm">
                                    Color separated processing (+15% premium)
                                  </FormLabel>
                                  <FormDescription id="colorSeparated-description">
                                    Select if your bulk laundry requires color separation
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calculator className="mr-2 h-4 w-4" />
                          Get Rough Quote
                        </>
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onReset}
                      disabled={isSubmitting}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Estimate Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Weekly Estimate</CardTitle>
              <CardDescription>
                Estimates are based on current 2025 price list and your weekly volumes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Line Items */}
              {currentEstimate.lines.length > 0 ? (
                <div className="space-y-2">
                  {currentEstimate.lines.map((line, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <div className="font-medium">{line.name}</div>
                        <div className="text-muted-foreground">
                          {line.qty} {line.unit} × R{line.unitPrice.toFixed(2)}
                        </div>
                      </div>
                      <div className="font-medium">
                        R{line.subtotal.toFixed(2)}
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Weekly Total:</span>
                    <span>R{currentEstimate.total.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Add items to see your estimate
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Pricing version: {currentEstimate.pricingVersion}
              </div>

              {/* Server Response (if submitted) */}
              {estimateResult && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="font-medium text-green-600">✓ Estimate Submitted</div>
                    <div className="text-sm text-muted-foreground">
                      Your estimate has been saved and we&rsquo;ll be in touch soon.
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

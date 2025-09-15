"use client"

import { useMemo, useCallback } from "react"
import { PRICE_INDEX, ItemCode } from "@/config/prices"
import { computeEstimate, EstimateResult } from "@/lib/estimate"

export interface UseEstimateCalcInput {
  weeklyItems?: Record<string, number>
  bulkByKg?: {
    wdifKg?: number
    wdfKg?: number
    colorSeparated?: boolean
  }
  mode: "per-item" | "per-kg" | "mixed"
}

export interface UseEstimateCalcReturn {
  // Current estimate calculation
  estimate: EstimateResult
  // Validation helpers
  isValidItemCode: (code: string) => code is ItemCode
  getItemInfo: (code: string) => { name: string; price: number; category: string } | null
  // Utility functions
  calculateItemTotal: (code: string, quantity: number) => number
  calculateBulkTotal: (kg: number, type: 'wdif' | 'wdf', colorSeparated?: boolean) => number
  // Form helpers
  getValidWeeklyItems: (items: Record<string, number>) => Partial<Record<ItemCode, number>>
}

/**
 * Custom hook for client-side estimate calculations
 * Provides instant previews while maintaining consistency with server calculations
 */
export function useEstimateCalc(input: UseEstimateCalcInput): UseEstimateCalcReturn {
  // Filter weekly items to only include valid ItemCodes
  const getValidWeeklyItems = useCallback((items: Record<string, number>): Partial<Record<ItemCode, number>> => {
    const validItems: Partial<Record<ItemCode, number>> = {}
    
    for (const [key, value] of Object.entries(items)) {
      if (typeof value === 'number' && value > 0 && key in PRICE_INDEX) {
        validItems[key as ItemCode] = value
      }
    }
    
    return validItems
  }, [])

  // Memoized estimate calculation using the same logic as server
  const estimate = useMemo(() => {
    try {
      // Filter weekly items to only include valid ItemCodes
      const validWeeklyItems = getValidWeeklyItems(input.weeklyItems || {})
      
      return computeEstimate({
        weeklyItems: validWeeklyItems,
        bulkByKg: input.bulkByKg,
        mode: input.mode,
      })
    } catch (error) {
      console.error('Estimate calculation error:', error)
      // Return empty estimate on error
      return {
        lines: [],
        total: 0,
        pricingVersion: "2025-pricelist",
      }
    }
  }, [input.weeklyItems, input.bulkByKg, input.mode])

  // Validation helper to check if a code is a valid ItemCode
  const isValidItemCode = useCallback((code: string): code is ItemCode => {
    return code in PRICE_INDEX
  }, [])

  // Get item information by code
  const getItemInfo = useCallback((code: string) => {
    if (!isValidItemCode(code)) {
      return null
    }
    
    const item = PRICE_INDEX[code]
    return {
      name: item.name,
      price: item.price,
      category: item.category,
    }
  }, [isValidItemCode])

  // Calculate total for a specific item
  const calculateItemTotal = useCallback((code: string, quantity: number): number => {
    if (!isValidItemCode(code) || quantity <= 0) {
      return 0
    }
    
    const item = PRICE_INDEX[code]
    return +(quantity * item.price).toFixed(2)
  }, [isValidItemCode])

  // Calculate total for bulk pricing
  const calculateBulkTotal = useCallback((
    kg: number, 
    type: 'wdif' | 'wdf', 
    colorSeparated: boolean = false
  ): number => {
    if (kg <= 0) {
      return 0
    }

    let rate: number
    if (type === 'wdif') {
      rate = colorSeparated ? 60.72 : 52.80
    } else {
      rate = colorSeparated ? 43.01 : 37.40
    }

    return +(kg * rate).toFixed(2)
  }, [])


  return {
    estimate,
    isValidItemCode,
    getItemInfo,
    calculateItemTotal,
    calculateBulkTotal,
    getValidWeeklyItems,
  }
}

/**
 * Helper hook for form-specific estimate calculations
 * Provides additional form validation and state management
 */
export function useEstimateFormCalc() {
  const calculateFormEstimate = useCallback((
    weeklyItems: Record<string, number> = {},
    bulkByKg: {
      wdifKg?: number
      wdfKg?: number
      colorSeparated?: boolean
    } = {},
    mode: "per-item" | "per-kg" | "mixed"
  ): EstimateResult => {
    // Filter valid items
    const validItems: Partial<Record<ItemCode, number>> = {}
    for (const [key, value] of Object.entries(weeklyItems)) {
      if (typeof value === 'number' && value > 0 && key in PRICE_INDEX) {
        validItems[key as ItemCode] = value
      }
    }

    // Calculate estimate
    return computeEstimate({
      weeklyItems: validItems,
      bulkByKg,
      mode,
    })
  }, [])

  const validateFormData = useCallback((data: {
    weeklyItems?: Record<string, number>
    bulkByKg?: {
      wdifKg?: number
      wdfKg?: number
      colorSeparated?: boolean
    }
    mode: "per-item" | "per-kg" | "mixed"
  }) => {
    const errors: string[] = []

    // Validate mode
    if (!["per-item", "per-kg", "mixed"].includes(data.mode)) {
      errors.push("Invalid pricing mode")
    }

    // Validate weekly items
    if (data.weeklyItems) {
      for (const [key, value] of Object.entries(data.weeklyItems)) {
        if (typeof value !== 'number' || value < 0) {
          errors.push(`Invalid quantity for ${key}`)
        }
      }
    }

    // Validate bulk pricing
    if (data.bulkByKg) {
      const { wdifKg, wdfKg } = data.bulkByKg
      if (wdifKg !== undefined && (typeof wdifKg !== 'number' || wdifKg < 0)) {
        errors.push("Invalid WDIF kg value")
      }
      if (wdfKg !== undefined && (typeof wdfKg !== 'number' || wdfKg < 0)) {
        errors.push("Invalid WDF kg value")
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }, [])

  return {
    calculateFormEstimate,
    validateFormData,
  }
}

"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { BodyStatsAndGoalDataType } from "@/types/bodyStatsAndGoal";
import { UserBase } from "@/types/user";
import { useState, useCallback, useEffect } from "react";
import { useNutritionPlan } from "./useNutritionPlan";

function convertToCm(value: number, isImperial: boolean): number {
  return isImperial ? value * 2.54 : value;
}

function convertToKg(value: number, isImperial: boolean): number {
  return isImperial ? value * 0.453592 : value;
}

export function useUser() {
  const { user, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createNutritionPlan } = useNutritionPlan();

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const bodyStatsAndGoal = useCallback(
    async (data: BodyStatsAndGoalDataType) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      try {
        const nutritionPlan = await createNutritionPlan({
          userId: user.id,
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fat,
          calories: data.calories,
          startDate: new Date(),
          // endDate is the current date + values.durations weeks
          endDate: new Date(
            new Date().getTime() + data.timelineWeeks * 7 * 24 * 60 * 60 * 1000
          ),
        });

        console.log("Nutrition plan:", nutritionPlan);

        // const updatedUser = { ...user };
        // updatedUser.height = convertToCm(data.height, data.isHeightImperial);
        // updatedUser.weight = convertToKg(data.weight, data.isWeightImperial);
        // updatedUser.activityLevel = data.activityLevel;
        // updatedUser.gender = data.gender;
        // updatedUser.currentNutritionPlanId = nutritionPlan.id;
        // updatedUser.updatedAt = new Date();

        const updatedUser = {
          ...user,
          height: convertToCm(data.height, data.isHeightImperial),
          weight: convertToKg(data.weight, data.isWeightImperial),
          activityLevel: data.activityLevel,
          gender: data.gender,
          currentNutritionPlanId: nutritionPlan.id,
          updatedAt: new Date(),
        };

        setUser(updatedUser);
        console.log("Updated user:", updatedUser);
      } catch (err) {
        console.error("Error setting body stats and goal:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [user, setUser, createNutritionPlan]
  );

  const changeUserWeight = useCallback(
    async (newWeight: number) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      try {
        setUser({
          ...user,
          weight: convertToKg(newWeight, false),
          updatedAt: new Date(),
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [user, setUser]
  );

  const changeUserHeight = useCallback(
    async (newHeight: number) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      try {
        setUser({
          ...user,
          height: convertToCm(newHeight, false),
          updatedAt: new Date(),
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [user, setUser]
  );

  return {
    user,
    isLoading,
    error,
    bodyStatsAndGoal,
    changeUserWeight,
    changeUserHeight,
  } as UseUserContextType;
}

export type UseUserContextType = {
  user: UserBase | null;
  isLoading: boolean;
  error: string | null;
  bodyStatsAndGoal: (data: BodyStatsAndGoalDataType) => Promise<void>;
  changeUserWeight: (newWeight: number) => Promise<void>;
  changeUserHeight: (newHeight: number) => Promise<void>;
};

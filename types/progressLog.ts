export type ProgressLogBase = {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  notes?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProgressLogInput = Omit<
  ProgressLogBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateProgressLogInput = Partial<
  Omit<ProgressLogBase, "createdAt" | "updatedAt">
> & { id: string };

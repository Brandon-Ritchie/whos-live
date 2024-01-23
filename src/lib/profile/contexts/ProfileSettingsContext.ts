import { createContext } from "react";
import z from "zod";

export const ProfileSettingsSchema = z.object({
  useYoutube: z.boolean().optional(),
  useTwitch: z.boolean().optional(),
  youtubeSubscriptionCount: z.number().int().min(0).optional(),
});
export type ProfileSettings = z.infer<typeof ProfileSettingsSchema>;

export const ProfileSettingsContext = createContext<
  [ProfileSettings | null, (settings: ProfileSettings | null) => void]
>([null, () => ({})]);

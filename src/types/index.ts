import { z } from "zod";

export const CharacteristicSchema = z.object({
  value: z.number(),
  half: z.number(),
  fifth: z.number(),
});

export type Characteristic = z.infer<typeof CharacteristicSchema>;

export const BaseSkillSchema = z.object({
  id: z.string(),
});

export const StaticSkillSchema = BaseSkillSchema.extend({
  type: z.literal("static"),
  key: z.string(),
  base: z.union([z.number(), z.string()]),
});

export type StaticSkill = z.infer<typeof StaticSkillSchema>;

export const StandardSkillSchema = BaseSkillSchema.extend({
  type: z.literal("standard"),
  key: z.string(),
  base: z.union([z.number(), z.string()]),
  current: z.number(),
  checked: z.boolean(),
});

export type StandardSkill = z.infer<typeof StandardSkillSchema>;

export const CustomSkillSchema = BaseSkillSchema.extend({
  type: z.literal("custom"),
  name: z.string(),
  current: z.number(),
  checked: z.boolean(),
});

export type CustomSkill = z.infer<typeof CustomSkillSchema>;

export const SkillSchema = z.discriminatedUnion("type", [
  StaticSkillSchema,
  StandardSkillSchema,
  CustomSkillSchema,
]);

export type Skill = z.infer<typeof SkillSchema>;

export const WeaponSchema = z.object({
  name: z.string(),
  regular: z.string(),
  hard: z.string(),
  extreme: z.string(),
  damage: z.string(),
  range: z.string(),
  attacks: z.string(),
  ammo: z.string(),
  malfunction: z.string(),
});

export type Weapon = z.infer<typeof WeaponSchema>;

export const IdentitySchema = z.object({
  name: z.string(),
  player: z.string(),
  occupation: z.string(),
  age: z.string(),
  sex: z.string(),
  residence: z.string(),
  birthplace: z.string(),
});

export type Identity = z.infer<typeof IdentitySchema>;

export const TrackersSchema = z.object({
  hp: z.number(),
  mp: z.number(),
  sanity: z.number(),
  luck: z.number(),
  hpMax: z.number(),
  mpMax: z.number(),
  sanityInitial: z.number(),
  sanityMax: z.number(),
  majorWound: z.boolean(),
  tempInsane: z.boolean(),
  indefInsane: z.boolean(),
});

export type Trackers = z.infer<typeof TrackersSchema>;

export const BackstorySchema = z.object({
  personalDescription: z.string(),
  ideologyBeliefs: z.string(),
  significantPeople: z.string(),
  meaningfulLocations: z.string(),
  treasuredPossessions: z.string(),
  traits: z.string(),
  injuriesScars: z.string(),
  phobiasManias: z.string(),
  arcaneTomesSpells: z.string(),
  strangeEntities: z.string(),
});

export type Backstory = z.infer<typeof BackstorySchema>;

export const FellowInvestigatorSchema = z.object({
  name: z.string(),
  player: z.string(),
});

export type FellowInvestigator = z.infer<typeof FellowInvestigatorSchema>;

export const WealthSchema = z.object({
  spendingLevel: z.string(),
  cash: z.string(),
  assets: z.string(),
});

export type Wealth = z.infer<typeof WealthSchema>;

export const CategorySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  color: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

export const InvestigatorDataSchema = z.object({
  id: z.number().optional(),
  version: z.string(),
  order: z.number().optional(),
  categoryId: z.number().optional(),
  category: z.string().optional(), // Keep for migration/backward compatibility
  identity: IdentitySchema,
  characteristics: z.record(z.string(), z.number()),
  trackers: TrackersSchema,
  skills: SkillSchema.array().length(69),
  backstory: BackstorySchema,
  gear: z.string(),
  wealth: WealthSchema,
  weapons: WeaponSchema.array(),
  fellowInvestigators: FellowInvestigatorSchema.array().length(8),
  notes: z.string(),
  photo: z.string().optional(),
});

export type InvestigatorData = z.infer<typeof InvestigatorDataSchema>;

export type Language = "fr" | "en" | "es" | "de" | "pt";

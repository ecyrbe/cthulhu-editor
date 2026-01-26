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

export const InvestigatorDataSchema = z.object({
  version: z.string(),
  identity: z.object({
    name: z.string(),
    player: z.string(),
    occupation: z.string(),
    age: z.string(),
    sex: z.string(),
    residence: z.string(),
    birthplace: z.string(),
  }),
  characteristics: z.record(z.string(), z.number()),
  trackers: z.object({
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
  }),
  skills: z.array(SkillSchema),
  backstory: z.object({
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
  }),
  gear: z.string(),
  wealth: z.object({
    spendingLevel: z.string(),
    cash: z.string(),
    assets: z.string(),
  }),
  weapons: z.array(WeaponSchema),
  fellowInvestigators: z.array(
    z.object({
      name: z.string(),
      player: z.string(),
    }),
  ),
  notes: z.string(),
  photo: z.string().optional(),
});

export type InvestigatorData = z.infer<typeof InvestigatorDataSchema>;

export type Language = "fr" | "en" | "es";

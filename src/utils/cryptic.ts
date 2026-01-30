export const toCryptic = (text: string) => {
  const runes =
    "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ";
  return text
    .split("")
    .filter((c, i) => c === " " || i % 2 === 0)
    .map((char) => {
      if (char === " " || char === "\n" || char === "." || char === ",")
        return char;
      const charCode = char.charCodeAt(0);
      return runes[charCode % runes.length];
    })
    .join("");
};

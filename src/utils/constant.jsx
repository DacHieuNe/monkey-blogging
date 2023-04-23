export const theme = {
  primary: "#1dc071",
  grayLight: "#e7ecf3",
  grayDark: "#b2b3c9",
  subColor: "#A4D96C",
  blueLight: "#007bff",
  blueDark: "#0d6efd",
  purpleLight: "#4a3552",
  gray23: "#232323",
  gray80: "#808191",
  gray4b: "#4B5264",
  black: "#171725",
};
export const slugify = (text) => {
  text = text.toString().toLowerCase().trim();

  const sets = [
    { to: "a", from: "[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶἀ]" },
    { to: "c", from: "[ÇĆĈČ]" },
    { to: "d", from: "[ÐĎĐÞ]" },
    { to: "e", from: "[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]" },
    { to: "g", from: "[ĜĞĢǴ]" },
    { to: "h", from: "[ĤḦ]" },
    { to: "i", from: "[ÌÍÎÏĨĪĮİỈỊ]" },
    { to: "j", from: "[Ĵ]" },
    { to: "ij", from: "[Ĳ]" },
    { to: "k", from: "[Ķ]" },
    { to: "l", from: "[ĹĻĽŁ]" },
    { to: "m", from: "[Ḿ]" },
    { to: "n", from: "[ÑŃŅŇ]" },
    { to: "o", from: "[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]" },
    { to: "oe", from: "[Œ]" },
    { to: "p", from: "[ṕ]" },
    { to: "r", from: "[ŔŖŘ]" },
    { to: "s", from: "[ßŚŜŞŠȘ]" },
    { to: "t", from: "[ŢŤ]" },
    { to: "u", from: "[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]" },
    { to: "w", from: "[ẂŴẀẄ]" },
    { to: "x", from: "[ẍ]" },
    { to: "y", from: "[ÝŶŸỲỴỶỸ]" },
    { to: "z", from: "[ŹŻŽ]" },
    { to: "-", from: "[·/_,:;']" },
  ];

  sets.forEach((set) => {
    text = text.replace(new RegExp(set.from, "gi"), set.to);
  });
  return (
    text
      .replace(/\s+/g, "-") // Replace spaces with -
      // .replace(/[^-a-zа-я\u0370-\u03ff\u1f00-\u1fff]+/g, "")
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "")
  ); // Trim - from end of text
};

export const postStatus = {
  APPROVED: 1,
  PENDING: 2,
  REJECT: 3,
};
export const categoryStatus = {
  APPROVE: 1,
  UNAPPROVE: 2,
};

export const userStatus = {
  ACTIVE: 1,
  PENDING: 2,
  BAN: 3,
};
export const userRole = {
  ADMIN: 1,
  MOD: 2,
  USER: 3,
};

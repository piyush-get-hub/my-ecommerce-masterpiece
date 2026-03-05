// class APIFeatures {
//   constructor(query, queryStr) {
//     this.query = query;
//     this.queryStr = queryStr;
//   }

//   // 1. Smart Search: Name aur Category dono mein dhundo
//   search() {
//     const keyword = (this.queryStr.keyword && this.queryStr.keyword !== "undefined" && this.queryStr.keyword !== "")
//       ? {
//           $or: [
//             { name: { $regex: this.queryStr.keyword, $options: "i" } },
//             { category: { $regex: this.queryStr.keyword, $options: "i" } },
//           ],
//         }
//       : {};

//     this.query = this.query.find({ ...keyword });
//     return this;
//   }

//   // 2. Filter: Lazy Filter Logic
// filter() {
//   const queryCopy = { ...this.queryStr };

//   // 1. Faltu fields hatana
//   const removeFields = ["keyword", "page", "limit", "sort"];
//   removeFields.forEach((key) => delete queryCopy[key]);

//   // 2. 🚀 THE SMART PARSER: Flat keys ko Nested Operators mein badlo
//   let finalQuery = {};

//   Object.keys(queryCopy).forEach((key) => {
//     // Handling Price: price[gte] ya price[lte]
//     if (key.includes("price")) {
//       const operator = key.match(/\[(.*?)\]/)?.[1] || "gte"; // gte or lte nikalo
//       if (!finalQuery.price) finalQuery.price = {};
//       finalQuery.price[`$${operator}`] = Number(queryCopy[key]);
//     } 
//     // Handling Ratings: ratings[gte]
//     else if (key.includes("ratings")) {
//       const operator = key.match(/\[(.*?)\]/)?.[1] || "gte";
//       const val = Number(queryCopy[key]);
//       if (val > 0) {
//         if (!finalQuery.ratings) finalQuery.ratings = {};
//         finalQuery.ratings[`$${operator}`] = val;
//       }
//     }
//     // Handling Category: Case-insensitive Regex
//     else if (key === "category" && queryCopy[key] !== "") {
//       finalQuery.category = { $regex: `^${queryCopy[key]}$`, $options: "i" };
//     }
//     // Baaki sab (e.g. brand, color etc. if any)
//     else {
//       finalQuery[key] = queryCopy[key];
//     }
//   });

//   // 🚀 Safety: Agar price default (0-100k) hai, toh filter mat lagao
//   if (finalQuery.price && finalQuery.price.$gte === 0 && finalQuery.price.$lte === 100000) {
//     delete finalQuery.price;
//   }

//   console.log("🚀 CORRECTED MONGO QUERY:", finalQuery);

//   this.query = this.query.find(finalQuery);
//   return this;
// }

//   sort() {
//     if (this.queryStr.sort) {
//       const sortBy = this.queryStr.sort.split(",").join(" ");
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort("-createdAt");
//     }
//     return this;
//   }

//   pagination(resPerPage) {
//     const currentPage = Number(this.queryStr.page) || 1;
//     const skip = resPerPage * (currentPage - 1);
//     this.query = this.query.limit(resPerPage).skip(skip);
//     return this;
//   }
// }

// module.exports = APIFeatures;




class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // 1. Smart Search: Name aur Category dono mein dhundo
  search() {
    const keyword = (this.queryStr.keyword && this.queryStr.keyword !== "undefined" && this.queryStr.keyword !== "")
      ? {
          $or: [
            { name: { $regex: this.queryStr.keyword, $options: "i" } },
            { category: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // 2. Filter: Lazy Filter Logic
filter() {
  const queryCopy = { ...this.queryStr };

  // 1. Faltu fields hatana
  const removeFields = ["keyword", "page", "limit", "sort"];
  removeFields.forEach((key) => delete queryCopy[key]);

  // 2. 🚀 THE SMART PARSER: Flat keys ko Nested Operators mein badlo
  let finalQuery = {};

  Object.keys(queryCopy).forEach((key) => {
    // Handling Price: price[gte] ya price[lte]
    if (key.includes("price")) {
      const operator = key.match(/\[(.*?)\]/)?.[1] || "gte"; // gte or lte nikalo
      if (!finalQuery.price) finalQuery.price = {};
      finalQuery.price[`$${operator}`] = Number(queryCopy[key]);
    } 
    // Handling Ratings: ratings[gte]
    else if (key.includes("ratings")) {
      const operator = key.match(/\[(.*?)\]/)?.[1] || "gte";
      const val = Number(queryCopy[key]);
      if (val > 0) {
        if (!finalQuery.ratings) finalQuery.ratings = {};
        finalQuery.ratings[`$${operator}`] = val;
      }
    }
    // Handling Category: Case-insensitive Regex
    else if (key === "category" && queryCopy[key] !== "") {
      finalQuery.category = { $regex: `^${queryCopy[key]}$`, $options: "i" };
    }
    // Baaki sab (e.g. brand, color etc. if any)
    else {
      finalQuery[key] = queryCopy[key];
    }
  });

  // 🚀 Safety: Agar price default (0-100k) hai, toh filter mat lagao
  if (finalQuery.price && finalQuery.price.$gte === 0 && finalQuery.price.$lte === 100000) {
    delete finalQuery.price;
  }

  console.log("🚀 CORRECTED MONGO QUERY:", finalQuery);

  this.query = this.query.find(finalQuery);
  return this;
}

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
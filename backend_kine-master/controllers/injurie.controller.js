const { default: mongoose } = require("mongoose");
const Injury = require("../models/injuries.model");
const Player = require("../models/players.model");
const { KineUser } = require("../models/users.model");

const INJURY_CATEGORIES = ["Muscle", "Articular", "Others"];
const PLACE_CATEGORIES = ["Exercise class", "Friendly match", "Official match"];
const DEGREE_CATEGORIES = ["Minor", "Moderate", "Severe"];
function firstLetterUpperCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return " "; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toUpperCase() : match.toUpperCase();
  });
}

async function addComment(req, res, next) {
  try {
    // get the comment from the request body
    const { comment } = req.body; // get the specific injury that we want to add

    console.log(comment);

    const injuryId = req.params["injuryId"];

    // the comment to ..
    let injury = await Injury.findById(injuryId);

    // add the comment to the array of comments of the Injury
    injury.comment.push(comment);

    await injury.save();

    res.status(200).send("comment added successfully");
  } catch (err) {
    next(err);
  }
}

async function addPlayerInjury(req, res, next) {
  try {
    const {
      comment,
      datedebut,
      datedefin,
      description,
      degree,
      name,
      urlimage,
      Place,
      season,
    } = req.body;
    const player = req.player;

    if (
      typeof datedefin !== "undefined" &&
      datedefin !== null &&
      datedefin !== ""
    ) {
      // Split the date strings into day, month, and year components
      let datedebutComponents = datedebut.split("/");
      let datedefinComponents = datedefin.split("/");

      // Create new Date objects using the year, month, and day components
      let datedebut2 = new Date(
        datedebutComponents[2],
        datedebutComponents[1] - 1,
        datedebutComponents[0]
      );
      let datedefin2 = new Date(
        datedefinComponents[2],
        datedefinComponents[1] - 1,
        datedefinComponents[0]
      );

      // Calculate the difference between the two dates in days and return as a number
      diffDays = Math.round((datedefin2 - datedebut2) / (1000 * 60 * 60 * 24));
    } else {
      diffDays = 0;
    }

    const verfInjury = new Injury({
      comment: comment,
      datedebut: datedebut,
      datedefin: datedefin,
      description: description,
      degree: degree,
      name: name,
      player: player._id,
      urlimage: urlimage,
      Place: Place,
      season: season,
      diffDays: diffDays,
    });

    player.injuries.push(verfInjury);

    const savedInjury = await verfInjury.save();

    player.save();

    res.status(200).json(savedInjury);
  } catch (err) {
    next(err);
  }
}

async function updateInjury(req, res) {
  const { id } = req.params;
  const {
    name,
    degree,
    description,
    datedebut,
    datedefin,
    comment,
    urlimage,
    Place,
    season,
  } = req.body;

  if (
    typeof datedefin !== "undefined" &&
    datedefin !== null &&
    datedefin !== ""
  ) {
    // Split the date strings into day, month, and year components
    let datedebutComponents = datedebut.split("/");
    let datedefinComponents = datedefin.split("/");

    // Create new Date objects using the year, month, and day components
    let datedebut2 = new Date(
      datedebutComponents[2],
      datedebutComponents[1] - 1,
      datedebutComponents[0]
    );
    let datedefin2 = new Date(
      datedefinComponents[2],
      datedefinComponents[1] - 1,
      datedefinComponents[0]
    );

    // Calculate the difference between the two dates in days and return as a number
    diffDays = Math.round((datedefin2 - datedebut2) / (1000 * 60 * 60 * 24));
  } else {
    diffDays = 0;
  }

  try {
    const injury = await Injury.findById(id);
    if (!injury) {
      return res.status(404).json({ error: "Injury not found" });
    }

    injury.name = name;
    injury.degree = degree;
    injury.description = description;
    injury.datedebut = datedebut;
    injury.datedefin = datedefin;
    injury.comment = comment;
    injury.urlimage = urlimage;
    injury.Place = Place;
    injury.season = season;
    injury.diffDays = diffDays;

    const savedInjury = await injury.save();

    res.status(200).json(savedInjury);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAllInjuries(req, res, next) {
  try {
    const data = await Injury.find({});
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getPlayerInjuries(req, res, next) {
  try {
    const playerId = req.params["playerId"];

    const data = await Player.findById(playerId).populate(injuries);

    res.status(200).json(data.injuries);
  } catch (err) {
    next(err);
  }
}

async function getInjuryById(req, res, next) {
  try {
    const { injuryid } = req.body;
    const data = await Injury.findById(injuryid);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function deleteInjury(req, res, next) {
  try {
    const { id } = req.params;
    const data = await Injury.findOneAndRemove({ _id: id });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function analyseByPlayerId(req, res, next) {
  try {
    const { playerId } = req.params;
    let { fromDate, untilDate } = req.body;

    if (playerId == null || fromDate == null) {
      throw Error("must provide needed arguments");
    }

    const userResults = await KineUser.findById(req.user.sub)
      .populate({
        path: "players",
        select: "players category ",
        populate: {
          select: "name  diffDays degree datedebut datedefin",
          path: "injuries",
          populate: {
            path: "player",
          },
        },
      })
      .select(
        "-supervisorCategory -technicalStaffCategory -playerCategory -username -password -role"
      );

    if (userResults["players"].length < 1) {
      throw Error("this user doesn't have any subscribed players");
    }

    // filter player
    const player = userResults["players"].find(
      (player) => player["_id"] == playerId
    );

    let result = {};
    result["totalInjuries"] = 0;
    result["totaldiffDays"] = 0;

    let [day, month, year] = fromDate.split("/");
    fromDate = new Date(year, month, day);

    if (!(fromDate instanceof Date) || isNaN(fromDate)) {
      throw Error("Correct date format must be provided DD/MM/YYYY");
    }
    if (untilDate) {
      [day, month, year] = untilDate.split("/");
      untilDate = new Date(year, month, day);
    }

    player["injuries"] = player["injuries"].filter((injury) => {
      [day, month, year] = injury["datedebut"].split("/");
      let datedebut = new Date(year, month, day);

      if (!(datedebut instanceof Date) || isNaN(datedebut)) {
        return false;
      }

      if (datedebut < fromDate) {
        return false;
      }

      if (untilDate != null) {
        if (injury["datedefin"] != null) {
          [day, month, year] = injury["datedefin"].split("/");
          let dateFin = new Date(year, month, day);
          if (
            !(dateFin instanceof Date) ||
            !(untilDate instanceof Date) ||
            dateFin > untilDate
          ) {
            return false;
          }
        } else {
          return true;
        }
      }
      return true;
    });

    // player["injuries"].forEach((injury) => {
    //   result["totalInjuries"] += 1;
    //   if(result[(injury["diffDays"])] == null) {
    //     result[(injury["diffDays"])] = {};
    //     result[(injury["diffDays"])]["totaldiffDays"] = 0;
    //     }
    //     result[(injury["diffDays"])]["totaldiffDays"] += injury["diffDays"];
    //   if (result[firstLetterUpperCase(injury["name"])] == null) {
    //     result[firstLetterUpperCase(injury["name"])] = {};
    //     result[firstLetterUpperCase(injury["name"])]["total"] = 0;
    //   }
    //   result[firstLetterUpperCase(injury["name"])]["total"] += 1;
    //   if (
    //     result[firstLetterUpperCase(injury["name"])][
    //       firstLetterUpperCase(injury["degree"])
    //     ] == null
    //   ) {
    //     result[firstLetterUpperCase(injury["name"])][
    //       firstLetterUpperCase(injury["degree"])
    //     ] = {};
    //     result[firstLetterUpperCase(injury["name"])][
    //       firstLetterUpperCase(injury["degree"])
    //     ]["total"] = 0;
    //   }
    //   result[firstLetterUpperCase(injury["name"])][
    //     firstLetterUpperCase(injury["degree"])
    //   ]["total"] += 1;
    // });
    let totalDiffDays = 0;
    player["injuries"].forEach((injury) => {
      result["totalInjuries"] += 1;
      if (injury["diffDays"]) {
        totalDiffDays += injury["diffDays"];
      }
      if (result[firstLetterUpperCase(injury["name"])] == null) {
        result[firstLetterUpperCase(injury["name"])] = {};
        result[firstLetterUpperCase(injury["name"])]["total"] = 0;
      }
      result[firstLetterUpperCase(injury["name"])]["total"] += 1;
      if (
        result[firstLetterUpperCase(injury["name"])][
          firstLetterUpperCase(injury["degree"])
        ] == null
      ) {
        result[firstLetterUpperCase(injury["name"])][
          firstLetterUpperCase(injury["degree"])
        ] = {};
        result[firstLetterUpperCase(injury["name"])][
          firstLetterUpperCase(injury["degree"])
        ]["total"] = 0;
      }
      result[firstLetterUpperCase(injury["name"])][
        firstLetterUpperCase(injury["degree"])
      ]["total"] += 1;
    });
    result["totaldiffDays"] = totalDiffDays;
    res.json(result);
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
}

async function analyseByInjury(req, res, next) {
  try {
    let { fromDate, untilDate, category } = req.body;
    if (!fromDate || !category) {
      throw Error("You must provided the needed arguments");
    }
    const userResults = await KineUser.findById(req.user.sub)
      .populate({
        path: "players",
        select: "players category ",
        populate: {
          select: "_id name Place degree datedebut datedefin",
          path: "injuries",
          populate: {
            path: "player",
          },
        },
      })
      .select(
        "-supervisorCategory -technicalStaffCategory -playerCategory -username -password -role"
      );

    let result = {};
    result["totalInjuries"] = 0;
    let [day, month, year] = fromDate.split("/");
    fromDate = new Date(year, month - 1, day);

    if (untilDate) {
      [day, month, year] = untilDate.split("/");
      untilDate = new Date(year, month - 1, day);
    }

    if (!(fromDate instanceof Date) || isNaN(fromDate)) {
      throw Error("Correct date format must be provided DD/MM/YYYY");
    }

    userResults["players"] = userResults["players"].filter((player) => {
      if (!category.toLowerCase().includes(player.category.toLowerCase())) {
        return false;
      }
      player["injuries"] = player["injuries"].filter((injury) => {
        [day, month, year] = injury["datedebut"].split("/");
        let dateDebut = new Date(year, month - 1, day);

        if (!(dateDebut instanceof Date) || isNaN(dateDebut)) {
          return false;
        }

        let dateFin = null;
        if (injury["datedefin"]) {
          [day, month, year] = injury["datedefin"].split("/");
          dateFin = new Date(year, month - 1, day);
          if (!(dateFin instanceof Date) || isNaN(dateFin)) {
            return false;
          }
        }

        if (
          (dateDebut <= fromDate && dateFin === null) ||
          (dateDebut <= fromDate && dateFin >= fromDate) ||
          (dateDebut >= fromDate && dateDebut <= untilDate)
        ) {
          result["totalInjuries"] += 1;
          return true;
        }

        return false;
      });
      return true;
    });
    INJURY_CATEGORIES.forEach((element) => {
      result[element] = {};
      result[element]["total"] = 0;
      // fill out whenever possible
    });
    // fill out the injuries based on name and place
    INJURY_CATEGORIES.forEach((element) => {
      PLACE_CATEGORIES.forEach((place) => {
        result[element][place] = {};
        result[element][place]["total"] = 0;
      });
    });
    // fill out the injuries based on name and place and degree
    INJURY_CATEGORIES.forEach((element) => {
      PLACE_CATEGORIES.forEach((place) => {
        DEGREE_CATEGORIES.forEach((degree) => {
          result[element][place][degree] = {};
          result[element][place][degree]["total"] = 0;
          result[element][place][degree]["position"] = {};
        });
      });
    });

    userResults["players"].forEach((player) => {
      player["injuries"].forEach((injury) => {
        const element = INJURY_CATEGORIES.find((elem) =>
          injury.name.toLowerCase().includes(elem.toLowerCase())
        );
        if (element) {
          result[element]["total"] += 1;
          const thisPlace = PLACE_CATEGORIES.find((elem) =>
            injury.Place.toLowerCase().includes(elem.toLowerCase())
          );
          if (thisPlace) {
            result[element][thisPlace]["total"] += 1;
            const thisDegree = DEGREE_CATEGORIES.find((elem) =>
              injury.degree.toLowerCase().includes(elem.toLowerCase())
            );
            if (thisDegree) {
              result[element][thisPlace][thisDegree]["total"] += 1;

            if (
  Object.keys(
    result[element][thisPlace][thisDegree]["position"]
  ).includes(injury.player.position.toLowerCase())
) {
  if (
    !result[element][thisPlace][thisDegree]["position"][
      injury.player.position.toLowerCase()
    ].find(
      (elem) =>
        elem.fullName ==
        `${injury.player.firstname} ${injury.player.lastname}`
    )
  ) {
    result[element][thisPlace][thisDegree]["position"][
      injury.player.position.toLowerCase()
    ].push({
      playerId: injury.player._id,
      fullName: `${injury.player.firstname} ${injury.player.lastname}`,
    });
  }
} else {
  result[element][thisPlace][thisDegree]["position"][
    injury.player.position.toLowerCase()
  ] = [];
  result[element][thisPlace][thisDegree]["position"][
    injury.player.position.toLowerCase()
  ].push({
    playerId: injury.player._id,
    fullName: `${injury.player.firstname} ${injury.player.lastname}`,
  });
}
            }
          }
        }
      });
    });

    res.json(result);
  } catch (err) {
    console.log(err.stack);
    next(err);
  }
}

module.exports = {
  deleteInjury,
  getInjuryById,
  getAllInjuries,
  addPlayerInjury,
  updateInjury,
  addComment,
  getPlayerInjuries,
  analyseByInjury,
  analyseByPlayerId,
};

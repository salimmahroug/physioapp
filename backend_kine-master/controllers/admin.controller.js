const { User, KineUser } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const ExpressError = require("../utils/errorObject");
const playersModel = require("../models/players.model");

const CATEGORIES = [
  "supervisorCategory",
  "technicalStaffCategory",
  "playerCategory",
];

function getSignInView(req, res) {
  res.render("pages/admin-login");
}

async function signUpAdmin(req, res) {
  try {
    const { username, password } = req.body;
    const newUser = User({
      username,
      password,
      role: "admin",
    });
    await newUser.save();

    res.redirect("/admin/signin");
  } catch (e) {
    console.log(e);
    return res.status(400).send("Invalid Request");
  }
}

async function getSignUpView(req, res) {
  res.render("pages/admin-signup");
}

async function signInAdmin(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!(user && user.role === "admin")) {
      throw new Error("Admin user not found !");
    }

    if (password !== user.password) {
      throw new ExpressError("Wrong credentials");
    }

    const payload = { sub: user._id, role: user.role };
    const token = jwt.sign(payload, config.JWT_SECRET);

    user.token = token;

    await user.save();

    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("../scratch");
    }

    localStorage.setItem("token", token);
    console.log(localStorage.getItem("token"));
    res.redirect("/admin/");
  } catch (e) {
    console.log("-----------Error-----------");
    console.log(e);
    return res.status(500).render("pages/admin-login", { message: e.message });
  }
}

async function getHomeAdmin(req, res) {
  const users = await User.find({});

  res.render("pages/home-admin", { users });
}
async function editUserAdmin(req, res) {
  try {
    const id = req.params["id"];

    const { username, password, role, clubType, ...categoriesPasswords } = req.body;

    const user = await User.findById(id);

    if (!user) {
      throw new ExpressError("User not found", 400);
    }

    // Update basic information
    user.username = username;
    user.password = password;
    user.role = role;
    user.clubType = clubType;

    // Dynamically update category passwords
    const categoryKeys = Object.keys(user.toObject()).filter(key =>
      key.endsWith("Category") && Array.isArray(user[key])
    );

    categoryKeys.forEach(categoryKey => {
      const currentCategory = user[categoryKey];

      currentCategory.forEach((_, index) => {
        const passwordKey = `${categoryKey}_${index}`;

        if (categoriesPasswords.hasOwnProperty(passwordKey)) {
          currentCategory[index] = categoriesPasswords[passwordKey];
        }
      });
    });

    await user.save();

    res.status(202).redirect("/admin/");
  } catch (e) {
    console.error(e);
    return res.redirect("/admin/edit-user/" + id);
  }
}


/* async function editUserAdmin(req, res) {
  try {
    const id = req.params["id"];

    const { username, password, role,clubType, ...categoriesPasswords } = req.body;

    const user = await User.findById(id);

    if (!user) {
      throw new ExpressError("User not found", 400);
    }
    user.username = username;
    user.password = password;
    user.role = role;
    user.clubType = clubType;

    for (let i = 0; i < 3; i++) {
      new Array(0, 1, 2, 3, 4, 5, 6).map((val) => {
        user[`${CATEGORIES[i]}`][val] =
          categoriesPasswords[`${CATEGORIES[i]}_${val}`];
      });
    }

    await user.save();

    res.status(202).redirect("/admin/");
  } catch (e) {
    console.log(e);
    return res.redirect("/admin/edit-user/" + id);
  }
} */

async function getEditUserView(req, res) {
  try {
    const id = req.params["id"];

    const user = await User.findById(id);
    if (!user) {
      throw new ExpressError("User not find with id " + id, 400);
    }
    res.render("pages/admin-edit", { user: user, CATEGORIES: CATEGORIES });
  } catch (e) {
    console.log(e.stack);
    res.redirect("/admin/");
  }
}

async function deleteUserAdmin(req, res) {
  try {
    const id = req.params["id"];

    const user = await User.findByIdAndDelete(id);
    res.redirect("/admin/");
  } catch (e) {
    console.log(e);
    res.redirect("/admin/");
  }
}

async function addUserAdmin(req, res) {
  try {
    const role = req.query.role;
    const { username, password,clubType } = req.body;

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      throw new ExpressError("Already found user with same username");
    }

    let user;
    if (role == "admin") {
      user = new User({
        username,
        password,
        role,
        clubType,
      });
    } else {
      user = new KineUser({
        username,
        password,
        role,
        clubType,
      });
    }

    await user.save();

    res.status(202).redirect("/admin/");
  } catch (e) {
    console.log(e);
    return res.redirect("/admin/add-user");
  }
}

async function getAddUserView(req, res) {
  res.render("pages/admin-add");
}

async function logoutAdmin(req, res) {
  try {
    localStorage.removeItem("token");

    const user = await User.findById(token.sub);

    if (!user) {
      res.redirect("/admin/signin");
    }

    user.token = "";

    await user.save();
    res.redirect("/admin/signin");
  } catch (e) {
    console.log(e);
    res.redirect("/admin/");
  }
}

async function updateUser(req, res) {
  try {
    players = await playersModel.find({});
    user = await KineUser.findById(req.user.sub);

    user.players = players;

    user.save();

    res.json({ success: "success message" });
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }
}

module.exports = {
  getHomeAdmin,
  signInAdmin,
  getSignUpView,
  signUpAdmin,
  getSignInView,
  editUserAdmin,
  getEditUserView,
  deleteUserAdmin,
  logoutAdmin,
  getAddUserView,
  addUserAdmin,
  updateUser,
};

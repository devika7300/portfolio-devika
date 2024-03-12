const router = require("express").Router();
const {
  Intro,
  About,
  Project,
  Contact,
  Experience,
  Certification,
} = require("../models/portfolioModel");
const User = require("../models/userModel");

//get all portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const certifications = await Certification.find();
    const experiences = await Experience.find();
    const contacts = await Contact.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      projects: projects,
      contact: contacts[0],
      experiences: experiences,
      certifications: certifications,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update intro
router.post("/update-intro", async (req, res) => {
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro updated successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update about
router.post("/update-about", async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "About updated successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//add experience
router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update-experience
router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience updated successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete-experience
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience deleted successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//add project
router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update-project
router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: project,
      success: true,
      message: "Project updated successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete-project
router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: project,
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//add-certification
router.post("/add-certification", async (req, res) => {
  try {
    const certification = new Certification(req.body);
    await certification.save();
    res.status(200).send({
      data: certification,
      success: true,
      message: "Certification added successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update-certification
router.post("/update-certification", async (req, res) => {
  try {
    const certification = await Certification.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: certification,
      success: true,
      message: "Certification updated successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete-certification
router.post("/delete-certification", async (req, res) => {
  try {
    const certification = await Certification.findOneAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: certification,
      success: true,
      message: "Certification deleted successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update-contact
router.post("/update-contact", async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: contact,
      success: true,
      message: "Contact updated successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//admin-login
router.post("/admin-login", async (req, res) => {
  try {
    // const admin = await Admin.findOne({email: req.body.email});
    // if(!admin){
    //   return res.status(404).send({
    //     success:false,
    //     message:"Admin not found",
    //   })
    // }
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    user.password = "";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login successfull.",
      });
    } else {
      res.status(200).send({
        data: user,
        success: false,
        message: "Invalid username or password.",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;

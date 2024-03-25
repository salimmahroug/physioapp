const Pdf = require("../models/Pdf")
const Player = require("../models/players.model");
const Injury = require("../models/injuries.model");
const mongoose = require('mongoose');

/*const Storage = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cd) => {
      cd(null, file.originalname);
    },
  });
  
  const upload = multer({
    storage: Storage
  }).single('testimage');//u add the pdfUrl using'testimage'like  name of attribut*/

async function addPdf(req, res) {
  const { pdfurl, name } = req.body;
  const player = req.player;

  try {


    // Create a new PDF document
    const newPdf = new Pdf({
      name: name,
      pdfurl: pdfurl,
      player: player._id,
    });

    // Save the PDF document to the database
    const savedPdf = await newPdf.save();

    // Add the PDF object to the player's list of PDFs
    player.pdfs.push(savedPdf);


    await player.save();

    res.status(200).json(savedPdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add PDF', data: error });
  }
}

async function getPlayerPdfs(req, res, next) {
  try {
    const pdfs = await Pdf.find().populate('player', "firstname");
    res.json(pdfs);
  } catch (err) {
    next(err);
  }
}

async function getAllPdfs(req, res, next) {
  try {
    const pdfs = await Pdf.find().populate('player', "firstname");
    res.json(pdfs);
  } catch (err) {
    next(err);
  }
}

async function deletePdf(req, res, next) {
  try {
    const pdfId = req.params.id;

    const pdfToDelete = await Pdf.findById(pdfId);

    if (!pdfToDelete) {
      throw new Error("PDF not found");
    }

    // Delete the PDF from the database
    await pdfToDelete.deleteOne();

    // Remove the PDF from the player's table of PDFs
    const player = await Player.findByIdAndUpdate(
      pdfToDelete.player,
      { $pull: { pdfs: pdfId } },
      { new: true }
    );

    res.status(200).json(player);
  } catch (err) {
    next(err);
  }
}

//create injurypdf 
async function addPlayerInjuryPdf(req, res) {
  const { pdfurl, name, idInjury } = req.body;

  try {

    const injury = await Injury.findById(idInjury);

    if (!injury || injury === null) throw new Error('Player injury not found');

    // Create a new PDF document
    const newPdf = new Pdf({
      name: name,
      pdfurl: pdfurl,
      injury: injury._id,
    });

    // Save the PDF document to the database
    const savedPdf = await newPdf.save();

    injury.pdfs.push(savedPdf);

    // Save the injury new pdf
    await injury.save();

    res.status(200).json(savedPdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add injury PDF', data: error });
  }
}

// async function getPlayerInjuriesPdfs(req, res, next) {
//   try {
//     const player = req.player;

//     Injury.aggregate([
//       // First stage: match injuries for the specified player
//       {
//         $match: { player: mongoose.Types.ObjectId(player._id) },
//       },
//       // Second stage: lookup PDFs that reference the matched injuries
//       {
//         $lookup: {
//           from: 'pdfs',
//           localField: '_id',
//           foreignField: 'injury',
//           as: 'pdfs',
//         },
//       }
//     ])
//       .exec(function (err, injuries) {
//         if (err) throw new Error("Injuries PDFs not found");

//         res.json(injuries);
//       });

//   } catch (err) {
//     next(err);
//   }
// }

async function getPlayerInjuriesPdfs(req, res, next) {
  try {
    const player = req.player;

    Injury.aggregate([
      // First stage: match injuries for the specified player
      {
        $match: { player: mongoose.Types.ObjectId(player._id) },
      },
      // Second stage: lookup PDFs that reference the matched injuries
      {
        $lookup: {
          from: 'pdfs',
          localField: '_id',
          foreignField: 'injury',
          as: 'pdfs',
        },
      }
    ])
      .exec(function (err, injuries) {
        if (err) throw new Error("Injuries PDFs not found");

        // Extract the PDFs from the injuries and send the response
        const pdfs = injuries.flatMap(injury => injury.pdfs);
        res.json(pdfs);
      });

  } catch (err) {
    next(err);
  }
}


async function deletePlayerInjuryPdf(req, res, next) {
  try {
    const { name, idInjury } = req.body;

    const injury = await Injury.findById(idInjury);

    if (!injury || injury === null) throw new Error('Player injury not found');

    const pdfToDelete = await Pdf.findOneAndDelete({ name: name, injury: injury });

    if (!pdfToDelete) {
      throw new Error("PDF not deleted");
    }

    res.status(200).json(pdfToDelete);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addPdf
  , getPlayerPdfs
  , getAllPdfs,
  deletePdf,
  addPlayerInjuryPdf,
  getPlayerInjuriesPdfs,
  deletePlayerInjuryPdf
}

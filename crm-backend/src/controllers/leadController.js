const prisma = require("../config/db");
const { sendLeadStatusUpdateEmail } = require("../utils/emailUtils");

/**
 * Get all leads from the database.
 * Includes owner information (name and email) for each lead.
 * Results are ordered by creation date (newest first).
 */
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(leads);
  } catch (error) {
    console.error("--- GET ALL LEADS ERROR ---", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * Create a new lead in the database.
 * Uses data from the request body and sets the owner as the current user.
 * Returns the newly created lead with owner information.
 */
exports.createLead = async (req, res) => {
  try {
    const { name, email, company, status } = req.body;
    const ownerId = req.user.id; // Owner is the authenticated user

    // Create the new lead
    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        company,
        status,
        ownerId,
      },
    });

    // Fetch the new lead with owner info to return
    const newLeadWithOwner = await prisma.lead.findUnique({
      where: { id: newLead.id },
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    });
    res.status(201).json(newLeadWithOwner);
  } catch (error) {
    console.error("--- CREATE LEAD ERROR ---", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * Get a single lead by its ID.
 * Includes owner information (name and email).
 * Returns 404 if the lead is not found.
 */
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await prisma.lead.findUnique({
      where: { id: parseInt(id) },
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    console.error("--- GET LEAD BY ID ERROR ---", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * Update an existing lead by its ID.
 * Updates name, email, company, and status fields.
 * Also updates the 'updatedAt' timestamp.
 * Returns 404 if the lead is not found.
 * Returns the updated lead with owner information.
 */
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, company, status } = req.body;

    // Check if the lead exists
    const leadExists = await prisma.lead.findUnique({
      where: { id: parseInt(id) },
      include: { owner: true },
    });

    if (!leadExists) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Update the lead
    const updatedLead = await prisma.lead.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        company,
        status,
        updatedAt: new Date(), // Update the timestamp
      },
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    });

    //Automated Email Trigger logic
    if (leadExists.status !== "Won" && updatedLead.status === "Won") {
      // Send email only if the status has just changed to 'WON'
      await sendLeadStatusUpdateEmail(updatedLead.owner.email, updatedLead);
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    console.error("--- UPDATE LEAD ERROR ---", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const leadId = parseInt(id);

    // 1. Check if lead exists
    const leadExists = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!leadExists) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // 2. Use a transaction to delete all related activities AND the lead
    // This ensures that if one part fails, the whole operation is rolled back.
    const deleteResult = await prisma.$transaction([
      // First, delete all activities related to this lead
      prisma.activity.deleteMany({
        where: { leadId: leadId },
      }),
      // Then, delete the lead itself
      prisma.lead.delete({
        where: { id: leadId },
      }),
    ]);

    // deleteResult[1] will contain the deleted lead info
    console.log(`Lead ${deleteResult[1].name} and its activities deleted.`);

    res.status(200).json({ message: "Lead deleted successfully", id: leadId }); // Send back the ID
  } catch (error) {
    console.error("--- DELETE LEAD ERROR ---", error);

    // Check for specific Prisma error if a record to delete is not found
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ message: "Lead or its dependencies not found for deletion." });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

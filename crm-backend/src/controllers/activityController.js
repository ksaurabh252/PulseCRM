const prisma = require("../config/db");

// 1. Get all activities for a specific lead
exports.getActivitiesForLead = async (req, res) => {
  try {
    // Extract leadId from the URL parameters
    const { leadId } = req.params;

    // Fetch all activities related to the given leadId, newest first
    const activities = await prisma.activity.findMany({
      where: { leadId: parseInt(leadId) },
      orderBy: { createdAt: "desc" }, // Show latest activity first
      include: {
        user: {
          // Include user details (who performed the activity)
          select: { name: true, email: true },
        },
      },
    });

    // Send the activities as a JSON response
    res.status(200).json(activities);
  } catch (error) {
    // Log and handle any errors
    console.error("--- GET ACTIVITIES ERROR ---", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Create a new activity for a lead
exports.createActivity = async (req, res) => {
  try {
    // Extract activity details from the request body
    const { content, type, leadId } = req.body;
    // Get the logged-in user's ID (set by authentication middleware)
    const userId = req.user.id;

    // Validate the activity type
    if (!["NOTE", "CALL", "MEETING", "EMAIL", "STATUS_CHANGE"].includes(type)) {
      return res.status(400).json({ message: "Invalid activity type" });
    }

    // Create a new activity in the database
    const newActivity = await prisma.activity.create({
      data: {
        type,
        content,
        leadId: parseInt(leadId),
        userId,
      },
      include: {
        user: {
          // Return the new activity along with user details
          select: { name: true, email: true },
        },
      },
    });

    // Send the newly created activity as a JSON response
    res.status(201).json(newActivity);
  } catch (error) {
    // Log and handle any errors
    console.error("--- CREATE ACTIVITY ERROR ---", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const analyticsService = require("../services/analyticsService");

exports.getDashboard = async (req, res) => {

    try {

        const userId = req.user.id;

        const dashboard =
            await analyticsService.getDashboard(userId);

        res.status(200).json(dashboard);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch dashboard."
        });

    }

};

exports.getMostActiveFriends = async (req, res) => {

    try {

        const userId = req.user.id;

        const friends =
            await analyticsService.getMostActiveFriends(userId);

        res.status(200).json({
            success: true,
            count: friends.length,
            data: friends
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch active friends."
        });

    }

};

exports.getProductivityScore = async (req, res) => {

    try {

        const userId = req.user.id;

        const score =
            await analyticsService.getProductivityScore(userId);

        res.status(200).json({

            success: true,

            data: score

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to calculate productivity score."

        });

    }

};

exports.getEventFrequency = async (req, res) => {

    try {

        const userId = req.user.id;

        const analytics =
            await analyticsService.getEventFrequency(userId);

        res.status(200).json({
            success: true,
            data: analytics
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch event analytics."
        });

    }

};

exports.getWeeklyActivity = async (req, res) => {

    try {

        const userId = req.user.id;

        const weeklyData =
            await analyticsService.getWeeklyActivity(userId);

        res.status(200).json({
            success: true,
            data: weeklyData
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch weekly analytics."
        });

    }

};

exports.getMonthlyActivity = async (req, res) => {

    try {

        const userId = req.user.id;

        const monthlyData =
            await analyticsService.getMonthlyActivity(userId);

        res.status(200).json({
            success: true,
            data: monthlyData
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch monthly analytics."
        });

    }

};

exports.getFriendGrowth = async (req, res) => {

    try {

        const userId = req.user.id;

        const growth =
            await analyticsService.getFriendGrowth(userId);

        res.status(200).json({

            success: true,

            data: growth

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch friend growth."

        });

    }

};
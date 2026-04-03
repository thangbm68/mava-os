const prisma = require('../../config/prisma');
const { ok, serverError } = require('../../utils/response');

const getStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalUsers, activeUsers, totalDepartments,
      taskStats, attendanceToday,
      revenueMonth, expenseMonth,
      notificationsUnread,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.department.count(),
      prisma.task.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.attendance.count({ where: { date: { gte: new Date(now.toDateString()) }, status: 'PRESENT' } }),
      prisma.transaction.aggregate({ where: { type: 'INCOME', date: { gte: startOfMonth } }, _sum: { amount: true } }),
      prisma.transaction.aggregate({ where: { type: 'EXPENSE', date: { gte: startOfMonth } }, _sum: { amount: true } }),
      prisma.notification.count({ where: { userId: req.user.id, isRead: false } }),
    ]);

    const tasks = taskStats.reduce((acc, s) => ({ ...acc, [s.status]: s._count.id }), {});

    return ok(res, {
      users: { total: totalUsers, active: activeUsers },
      departments: totalDepartments,
      tasks: {
        todo: tasks.TODO || 0,
        inProgress: tasks.IN_PROGRESS || 0,
        urgent: tasks.URGENT || 0,
        done: tasks.DONE || 0,
        total: Object.values(tasks).reduce((a, b) => a + b, 0),
      },
      attendance: { presentToday: attendanceToday },
      finance: {
        revenueMonth: Number(revenueMonth._sum.amount || 0),
        expenseMonth: Number(expenseMonth._sum.amount || 0),
        profit: Number(revenueMonth._sum.amount || 0) - Number(expenseMonth._sum.amount || 0),
      },
      notifications: { unread: notificationsUnread },
    });
  } catch (err) {
    serverError(res, err);
  }
};

module.exports = { getStats };

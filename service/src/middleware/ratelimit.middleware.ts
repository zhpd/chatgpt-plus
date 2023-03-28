// import { rateLimit } from 'express-rate-limit';

// const MAX_REQUEST_PER_HOUR = process.env.MAX_REQUEST_PER_HOUR;

// const maxCount =
//   !MAX_REQUEST_PER_HOUR && !isNaN(Number(MAX_REQUEST_PER_HOUR))
//     ? parseInt(MAX_REQUEST_PER_HOUR)
//     : 0; // 0 means unlimited

// export const ratelimit = rateLimit({
//   windowMs: 60 * 60 * 1000, // Maximum number of accesses within an hour
//   max: maxCount,
//   statusCode: 200, // 200 means success，but the message is 'Too many request from this IP in 1 hour'
//   message: async (req, res) => {
//     res.send({
//       status: 'Fail',
//       message: 'Too many request from this IP in 1 hour',
//       data: null,
//     });
//   },
// });

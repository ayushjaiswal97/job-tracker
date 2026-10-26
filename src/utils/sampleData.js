import { daysAgoISO } from './helpers';

const rows = [
  ['Razorpay', 'Frontend Developer', 'Bengaluru', 'Full-time', 'Interview', '8 LPA', 6],
  ['Zoho', 'Software Developer', 'Chennai', 'Full-time', 'Applied', '6 LPA', 4],
  ['Postman', 'Full Stack Intern', 'Remote', 'Internship', 'Offer', '30k / month', 15],
  ['Freshworks', 'React Developer', 'Chennai', 'Full-time', 'Rejected', '7 LPA', 28],
  ['Swiggy', 'SDE 1', 'Bengaluru', 'Full-time', 'Wishlist', '', 1],
  ['Cred', 'Frontend Engineer', 'Bengaluru', 'Full-time', 'Applied', '10 LPA', 40],
  ['Infosys', 'Systems Engineer', 'Pune', 'Full-time', 'Interview', '4 LPA', 55],
  ['Groww', 'Web Developer', 'Remote', 'Contract', 'Rejected', '', 72],
  ['TCS', 'Digital Developer', 'Bhopal', 'Full-time', 'Applied', '7 LPA', 95],
  ['Zerodha', 'Junior Developer', 'Bengaluru', 'Full-time', 'Wishlist', '', 2],
];

export const makeSampleJobs = () =>
  rows.map(([company, role, location, type, status, salary, ago]) => ({
    company, role, location, type, status, salary,
    appliedDate: daysAgoISO(ago),
    link: '',
    notes: '',
  }));

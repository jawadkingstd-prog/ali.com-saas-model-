// Complete Ledger Orders with Payment Tracking
// This replaces the old simple ledger structure

import seedCustomers from "./customers";

const c0 = seedCustomers[0];
const c1 = seedCustomers[1] ?? seedCustomers[0];
const c2 = seedCustomers[2] ?? seedCustomers[0];
const c3 = seedCustomers[3] ?? seedCustomers[0];

const seedLedgerOrders = [
  {
    id: "INV-2024-001",
    customerId: c0?.id ?? "CUST-1001",
    customerName: c0?.name ?? "Customer",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    totalAmount: 15000,
    amountPaid: 15000,
    remainingBalance: 0,
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer",
    description: "Order for supplies and materials",
    paymentHistory: [
      {
        id: "PAY-001",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
        amount: 15000,
        paymentMethod: "Bank Transfer",
        notes: "Full payment received",
        recordedBy: "Ahmed Raza",
      },
    ],
  },
  {
    id: "INV-2024-002",
    customerId: c1?.id ?? "CUST-1002",
    customerName: c1?.name ?? "Customer",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    totalAmount: 25000,
    amountPaid: 15000,
    remainingBalance: 10000,
    paymentStatus: "Partially Paid",
    paymentMethod: "Cash",
    description: "Bulk order of electronics",
    paymentHistory: [
      {
        id: "PAY-002-A",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
        amount: 10000,
        paymentMethod: "Cash",
        notes: "Initial deposit",
        recordedBy: "Sara Khan",
      },
      {
        id: "PAY-002-B",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        amount: 5000,
        paymentMethod: "Bank Transfer",
        notes: "Partial payment",
        recordedBy: "Ahmed Raza",
      },
    ],
  },
  {
    id: "INV-2024-003",
    customerId: c2?.id ?? "CUST-1003",
    customerName: c2?.name ?? "Customer",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    totalAmount: 8500,
    amountPaid: 0,
    remainingBalance: 8500,
    paymentStatus: "Unpaid",
    paymentMethod: "Pending",
    description: "Office furniture and fixtures",
    paymentHistory: [],
  },
  {
    id: "INV-2024-004",
    customerId: c3?.id ?? "CUST-1004",
    customerName: c3?.name ?? "Customer",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    totalAmount: 45000,
    amountPaid: 45000,
    remainingBalance: 0,
    paymentStatus: "Paid",
    paymentMethod: "Cheque",
    description: "Equipment purchase",
    paymentHistory: [
      {
        id: "PAY-004",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
        amount: 45000,
        paymentMethod: "Cheque",
        notes: "Cheque #12345 received",
        recordedBy: "Fatima Asad",
      },
    ],
  },
  {
    id: "INV-2024-005",
    customerId: c0?.id ?? "CUST-1001",
    customerName: c0?.name ?? "Customer",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    totalAmount: 12000,
    amountPaid: 6000,
    remainingBalance: 6000,
    paymentStatus: "Partially Paid",
    paymentMethod: "Online",
    description: "Monthly subscription and services",
    paymentHistory: [
      {
        id: "PAY-005",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        amount: 6000,
        paymentMethod: "Online",
        notes: "Online payment via portal",
        recordedBy: "Ahmed Raza",
      },
    ],
  },
];

export default seedLedgerOrders;
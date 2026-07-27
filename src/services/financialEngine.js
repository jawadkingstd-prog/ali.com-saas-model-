class FinancialEngine {
  constructor() {
    // In-memory mock database tables for demonstration
    this.accounts = new Map([
      ['ACC-001', { id: 'ACC-001', name: 'Faiza Malik', balance: 50000, creditLimit: 10000, status: 'ACTIVE' }],
      ['ACC-002', { id: 'ACC-002', name: 'Zainab Ahmed', balance: 3200, creditLimit: 5000, status: 'ACTIVE' }],
      ['ACC-003', { id: 'ACC-003', name: 'Corporate Reserve', balance: 1500000, creditLimit: 0, status: 'ACTIVE' }]
    ]);
    
    this.ledgerLogs = [];
    this._locks = new Set(); // Row-level locking simulation for concurrency control
  }

  /**
   * Executes an atomic double-entry transaction ledger transfer.
   * @param {string} sourceId - Sender account ID
   * @param {string} destId - Receiver account ID
   * @param {number} amount - Transaction amount (must be positive)
   * @param {string} referenceId - Unique transaction tracking ID
   */
  executeTransaction(sourceId, destId, amount, referenceId) {
    // 1. Validation & Guardrails
    if (amount <= 0) {
      throw new Error("Transaction amount must be greater than zero.");
    }

    // Concurrency Check (Row-Level Locking Simulation)
    const lockKey = `${sourceId}-${destId}`;
    if (this._locks.has(lockKey)) {
      throw new Error("Concurrency Conflict: Parallel write detected on account nodes. Please retry.");
    }

    this._locks.add(lockKey);

    try {
      const sourceAccount = this.accounts.get(sourceId);
      const destAccount = this.accounts.get(destId);

      if (!sourceAccount || !destAccount) {
        throw new Error("Invalid account node reference.");
      }

      // 2. Negative Balance & Credit Limit Protection Rule
      const projectedBalance = sourceAccount.balance - amount;
      const allowableFloor = -sourceAccount.creditLimit;

      if (projectedBalance < allowableFloor) {
        throw new Error(`Transaction Blocked: Insufficient funds or credit threshold exceeded for account ${sourceId}.`);
      }

      // 3. Atomic Execution (Double-Entry State Mutation)
      sourceAccount.balance -= amount;
      destAccount.balance += amount;

      // 4. Immutability Logging (Append-Only Ledger Record)
      const timestamp = new Date().toISOString();
      const entry = {
        referenceId,
        timestamp,
        legs: [
          { accountId: sourceId, type: 'DEBIT', amount },
          { accountId: destId, type: 'CREDIT', amount }
        ],
        status: 'COMPLETED'
      };

      this.ledgerLogs.push(entry);
      return { success: true, entry };

    } catch (error) {
      // Rollback handling (Log failed attempt)
      const failedEntry = {
        referenceId,
        timestamp: new Date().toISOString(),
        error: error.message,
        status: 'FAILED_ROLLED_BACK'
      };
      this.ledgerLogs.push(failedEntry);
      throw error;

    } finally {
      // Release concurrency lock
      this._locks.delete(lockKey);
    }
  }

  getAccountBalance(accountId) {
    const acc = this.accounts.get(accountId);
    if (!acc) throw new Error("Account not found.");
    return acc.balance;
  }

  getAuditLogs() {
    return this.ledgerLogs;
  }
}

export const financialEngine = new FinancialEngine();
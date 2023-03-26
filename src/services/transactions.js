import { Transaction, TransactionType } from '../models/index.js';
import { TransactionDAO } from '../dao/index.js';

class TransactionService {
  #modelInstance;

  constructor(transactionInstance = Transaction) {
    this.#modelInstance = transactionInstance;
  }

  /**
   * Checks whether a publisher exists, if it does, returns its ID.
   * If not, it creates it and returns its ID
   * @param {Object} args - Arguments to perform the queries.
   * @param {string} args.userId
   * @param {string} args.materialId
   * @param {string} args.transactionName
   */
  async logTransaction({ userId, materialId, materialData, transactionName }) {
    try {
      const transactionTypeId = await TransactionDAO.getTransactionTypeId(TransactionType, transactionName);
      const modifiedItems = (materialData) ? Object.keys(materialData).join(', ') : 'N/A';
      await TransactionDAO.create(this.#modelInstance, { userId, materialId, modifiedItems, transactionTypeId });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default TransactionService;

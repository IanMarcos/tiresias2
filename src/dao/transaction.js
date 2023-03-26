import { extractSqlError } from '../helpers/sql-helpers.js';

class TransactionDAO {
  /**
   * Logs a material creation or modification in the Transaction table.
   * @param {Model} Transaction - Instance of an objection.js model.
   * @param {Object} args - Arguments to crete the transaction.
   * @param {string|number} args.userId
   * @param {string|number} args.materialId
   * @param {string|number} args.transactionTypeId
   */
  static async create(Transaction, { userId, materialId, modifiedItems, transactionTypeId }) {
    try {
      return await Transaction.query().insert({
        usuarioId: userId,
        materialId,
        camposModificados: modifiedItems,
        tipoTransaccionId: transactionTypeId,
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: transaction.js:20 ~ TransactionDAO ~ create ~ error:',
        error
      );
      const erroMsg = extractSqlError(error) || 'EDA14';
      throw new Error(erroMsg);
    }
  }

  /**
   * Gets the transaction type id based on the provided name.
   * @param {Model} TransactionType - Instance of an objection.js model.
   * @param {string} transactionName
   */
  static async getTransactionTypeId(TransactionType, transactionName) {
    try {
      const [transactionType] = await TransactionType.query()
        .select('id')
        .where('nombre', transactionName);
      return transactionType.id;
    } catch (error) {
      const erroMsg = extractSqlError(error) || 'EDA14';
      throw new Error(erroMsg);
    }
  }
}

export default TransactionDAO;

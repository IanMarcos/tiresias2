import { Person, PersonMaterial, PersonRole } from '../models/index.js';
import { PersonDAO, PersonMaterialDAO, RolesDAO } from '../dao/index.js';
import { splitPersonNames } from '../helpers/formatters.js';

class PersonMaterialService {
  #modelInstance;

  #personModelInstance;

  constructor(
    personMaterialInstance = PersonMaterial,
    personInstance = Person
  ) {
    this.#modelInstance = personMaterialInstance;
    this.#personModelInstance = personInstance;
  }

  /**
   * Checks whether a Person exists, if it does, returns its ID.
   * If not, it creates it and returns its ID
   * @param {Object} args - Arguments to perform the queries.
   * @param {Array} args.peopleArray - Array of string containing peoples name.
   * @param {Array} args.materialId
   * @param {Array} args.role - Role name.
   */
  async savePeopleByRole({ peopleArray, materialId, role }) {
    // Find existing people Ids
    const foundPeople = await Promise.all(
      peopleArray.map(async (person) => {
        const { lastName, names } = splitPersonNames(person);

        try {
          const foundPerson = await PersonDAO.getByName(
            this.#personModelInstance,
            { names, lastName }
          );

          if (foundPerson) {
            return foundPerson.id;
          }
          return person;
        } catch (error) {
          return null;
        }
      })
    );

    if (foundPeople.includes(null)) throw new Error('EDA09');

    // If not create them and get their ids
    const peopleIds = await Promise.all(
      foundPeople.map(async (person) => {
        if (typeof person === 'number') {
          return person;
        }

        const { lastName, names } = splitPersonNames(person);

        try {
          const newPer = await PersonDAO.create(this.#personModelInstance, {
            names,
            lastName,
          });
          return newPer.id;
        } catch (error) {
          return null;
        }
      })
    );

    if (peopleIds.includes(null)) throw new Error('EDA09');

    const roleId = await RolesDAO.getRoleId(PersonRole, role);

    const results = await Promise.all(
      peopleIds.map(async (personId) => {
        try {
          return await PersonMaterialDAO.create(this.#modelInstance, {
            personId,
            materialId,
            roleId,
          });
        } catch (error) {
          return null;
        }
      })
    );
    if (results.includes(null)) throw new Error('EDA03');
  }
}

export default PersonMaterialService;

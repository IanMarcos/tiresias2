const { Persona, PersonaMaterial, RolPersona } = require('../models');
const { PersonaDAO, PersonaMaterialDAO, RolPersonaDAO } = require('../dao');
const { splitPersonNames } = require('../helpers/misc');

class PersonMaterialService {
  #modelInstance;

  #personModelInstance;

  constructor(PersonaMaterialInstance = PersonaMaterial, PersonaInstance = Persona) {
    this.#modelInstance = PersonaMaterialInstance;
    this.#personModelInstance = PersonaInstance;
  }

  // TODO update this
  /**
  * Checks whether a Person exists, if it does, returns its ID.
  * If not, it creates it and returns its ID
  * @param {Object} args - Arguments to perform the queries.
  * @param {string} args.name - Name of the producer to be searched/created.
  */
  async joinPeopleToMaterialByRole({ peopleArray, materialId, role }) {
    // Find people Ids
    const foundPeople = await Promise.all(peopleArray.map(async (person) => {
      const { lastName, names } = splitPersonNames(person);

      try {
        const foundPerson = await PersonaDAO.getByName(
          this.#personModelInstance,
          { names, lastName },
        );

        if (foundPerson) {
          return foundPerson.id;
        }
        return person;
      } catch (error) {
        return null;
      }
    }));

    if (foundPeople.includes(null)) throw new Error('EDA09');

    // If not create them
    const peopleIds = await Promise.all(foundPeople.map(async (person) => {
      if (typeof person === 'number') {
        return person;
      }

      const { lastName, names } = splitPersonNames(person);

      try {
        const newPer = await PersonaDAO.create(this.#personModelInstance, { names, lastName });
        return newPer.id;
      } catch (error) {
        return null;
      }
    }));

    if (peopleIds.includes(null)) throw new Error('EDA09');

    const roleId = await RolPersonaDAO.getRoleId(RolPersona, role);

    const results = await Promise.all(peopleIds.map(async (personId) => {
      try {
        return await PersonaMaterialDAO.create(
          this.#modelInstance,
          { personId, materialId, roleId },
        );
      } catch (error) {
        return null;
      }
    }));
    if (results.includes(null)) throw new Error('EDA03');
  }
}

module.exports = PersonMaterialService;

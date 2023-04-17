class BaseService {
  constructor(Repository) {
    this.repository = Repository;
  }

  async getAll() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      return await this.repository.getById(id);
    } catch (error) {
      throw error;
    }
  }
  async create(data) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseService;

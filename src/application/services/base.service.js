class BaseService {
  constructor({ logger }, repository) {
    if (logger) {
      this.logger = logger;
    }
    this.repository = repository;
  }

  async getAll() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await this.repository.getById(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async create(data) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(options, data) {
    try {
      return await this.repository.update(options, data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

module.exports = BaseService;

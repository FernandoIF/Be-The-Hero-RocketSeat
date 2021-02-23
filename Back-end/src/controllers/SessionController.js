const connection = require('../database/connection');

module.exports = {

  async create(request, response) {
    const id  = request.body.id

    const ong = await connection("ongs").select("name").where("id", id)
    
    if (!ong){
        return response.status(400).json({ error: "This ONG does not exist" });
    }

    return response.json(ong);
  }
}
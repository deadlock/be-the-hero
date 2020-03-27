const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  // Método para listar as ongs cadastradas na aplicação.
  async index(req, res) {
    const ongs = await connection("ongs").select("*");

    return res.json(ongs);
  },
  // Método para cadastrar uma ong na aplicação
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  }
};

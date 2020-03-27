const connection = require("../database/connection");

module.exports = {
  // Mostrar a quantidade de registros de incidentes por pagina.
  async index(req, res) {
    const { page = 1 } = req.query;

    // Conta a quantidade de registros de incidentes que existem no banco de dados
    const [count] = await connection("incidents").count();

    // Mostrar os registros de incidentes delimitando 5 registros por página.
    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    // Enviar a quantidade de registros para o header header
    res.header("X-Total-Count", count["count(*)"]);

    return res.json(incidents);
  },

  // Registrar incidentes
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  },

  // Deletar registro de incidente do banco de dados
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

      console.log(ong_id);
      console.log(id);
      console.log(incident);
      
    // Caso o registro não for igual ao id da ong não será permitido exclui - lo.
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({
        error: "Operation not permitted."
      });
    }

    // Caso o id seja o correto ele irá apagar o registro do incidente.
    await connection("incidents")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};

import getPool from '../../database/getPool.js';

// Función que realiza una consulta a la base de datos para seleccionar a un usuario con un id dado.
const getUserOwnerService = async (userId) => {
    const pool = await getPool();

    // Comprobamos el role del usuario.
    const [role] = await pool.query(`SELECT roles FROM usuarios WHERE id = ?`, [
        userId,
    ]);
    // role[0].roles = role;
    // console.log(role);

    if (role[0].roles === 'grupo') {
        // Comprobamos los grupos del usuarios
        const [grupos] = await pool.query(
            `SELECT id, nombre, provincia, honorarios, biografia, usuario_id, createdAt FROM grupos WHERE usuario_id = ?`,
            [userId]
        );
        return grupos;
    } else {
        // Comprobamos las salas del usuarios
        const [salas] = await pool.query(
            `SELECT id, usuario_id, nombre, provincia, direccion, capacidad, descripcion, precios, condiciones, equipamiento, horaReservasStart, horaReservasEnd, createdAt FROM salas WHERE usuario_id = ?`,
            [userId]
        );
        return salas;
    }
};

export default getUserOwnerService;

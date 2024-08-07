import pool from '../config/db.js';
import bcrypt from 'bcryptjs'

const register = async (user) =>{
    let {email, password, rol, lenguage} = user
    const passwordEncriptada = bcrypt.hashSync(password)
    password = passwordEncriptada
    try {
        const sql = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) returning *'
        const values = [email, passwordEncriptada, rol, lenguage]

        await pool.query(sql, values)
    } catch (error) {
        console.log(error.message)
    }
};

const login = async ({email, password}) =>{
    try {
        const sql = 'SELECT * FROM usuarios WHERE email = $1'
        const values = [email]
        const { rows: [user], rowCount } = await pool.query(sql, values)

        if (!user || rowCount !== 1) {
            throw { code: 401, message: 'Email o contraseña incorrecta' };
        }
        const {password: passwordEncriptada } = user
        const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
        if (!passwordEsCorrecta || !rowCount) 
            throw {code: 401, message: 'Email o contraseña incorrecta'}

        return user;
    } catch (error) {
        console.error('Error en modelo de login:', error);
        throw error;
    }
}

const getUser = async (email) => {
    try {
        const sql = 'SELECT * FROM usuarios WHERE email = $1';
        const values = [email];
        const result = await pool.query(sql, values);
    if (result.rowCount > 0) {
        return result.rows;
    } else {
        return null;
    }
    } catch (error) {
        console.error("Error:", error.message);
        throw new Error("Error al consultar el usuario");
}
};

export const model = {
    register,
    login,
    getUser
}
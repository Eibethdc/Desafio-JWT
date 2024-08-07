import { model } from "../models/queries.js"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const home = (req, res) =>{
    res.send('Home Page')
}

const register = async (req, res) =>{
    try {
        const user = req.body
        await model.register(user)
        res.send('Usuario creado con exito')
    } catch (error) {
        res.status(error.code || 500).send(error.message)
    }
    
}

const login = async (req, res) =>{
    try {
        const { email, password } = req.body
        const user = await model.login({email, password})
        
        if(!user){
            return res.status(401).send('Usuario no existe')
        }else{
            const token = jwt.sign({email}, 'az_AZ')
            res.status(200).json({token})
        }
    } catch (error) {
        console.log('Error en login:', error.message)
        res.status(error.code || 500).send(error)
    }
    
}

const profile = async (req, res) => {
    let token = req.headers.authorization;
    
    if (!token) {
        return res.status(403).send("Token requerido para autenticación");
    }
    token = token.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, 'az_AZ');
        const email = decoded.email
        const user = await model.getUser(email);
    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(404).send("Usuario no encontrado");
    }
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(401).send("Token invalido");
    }
};

const notFound = (req, res) =>{
    res.status(404).send('Pagina no encontrada')
}

export const controller = {
    home,
    register,
    login,
    profile,
    notFound
}
'use strict'

import { generateJwt } from '../utils/jwt.js'
import { checkPassword, encrypt } from '../utils/validator.js'
import User from './user.model.js'

export const test = (req, res) => {
    return res.send({ message: 'USER | Function test' })
}

export const regist = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({ message: 'Registered Successfult !!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering Employee' })
    }
}

export const login = async (req, res) => {
    try {
        let {username, password}=req.body
        let user = await User.findOne({username})
        if(user && await checkPassword(password, user.password)){
            let loggedUser ={
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({message: `Welcome ${user.username}`, loggedUser, token})
        }
        return res.status(404).send({message: 'Invalid Credentials'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const deleteUser = async (req, res) => {
    try {
        let { id } = req.params
        let deletedUser = await User.deleteOne({ _id: id })
        if (deletedUser.deletedCount == 0) return res.status(404).send({ message: 'Employee not found, not deleted' })
        return res.send({ message: 'Employee deleted successfuly !!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting Employee' })
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedUser) return res.status(404).send({ message: 'Employee not found, not updated' })
        return res.send({ message: 'Employee updated successfuly !!', updatedUser })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating' })
    }
}

export const listUser = async (req, res) => {
    try {
        let user = await User.find({})
        return res.send(user)
    } catch (err) {
        console.error(err)
    }
}

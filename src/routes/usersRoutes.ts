import { Router } from "express";
import { createUsers, deleteUserById, getUserById, getUsers, updateUserById } from "../controllers/usersController";

const router = Router()

router.get('/', getUsers)

router.post('/', createUsers)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)

router.get('/:id', getUserById)

export {router}


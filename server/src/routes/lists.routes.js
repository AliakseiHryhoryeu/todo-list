const Router = require('express')
const { check, validationResult } = require('express-validator')
const mongoose = require('mongoose')
const User = require('../models/User')
const List = require('../models/List')
const Task = require('../models/Task')

const router = new Router()

//Get lists By UserId
router.get('/listsbyusertoken', async function (req, res) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Uncorrect request', errors })
		}

		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(401).json({ message: 'Auth error' })
		}
		const decoded = jwt.verify(token, config.secretKey)
		req.user = decoded
		const userId = req.user.id

		const user = await User.findOne({ userId })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const userLists = user.listId
		const lists = await List.find({ userLists })

		return res.json({
			lists,
		})
	} catch (e) {
		console.log(e)
		res.send({ message: 'Server error (get lists)' })
	}
})

//Get List By ListId
router.get(
	'/list',
	[check('listId', 'Uncorrect userId').isLength({ min: 1 })],
	async function (req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}

			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Auth error' })
			}
			const decoded = jwt.verify(token, config.secretKey)
			req.user = decoded
			const userId = req.user.id

			const user = await User.findOne({ userId })
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const { listId } = req.query
			const list = await List.findOne({ _id: mongoose.Types.ObjectId(listId) })
			if (!list) {
				return res.status(404).json({ message: 'List not found' })
			}

			return res.json({
				_id: list.id,
				title: list.title,
				color: list.color,
				userId: list.userId,
				tasks: list.tasks,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (get list)' })
		}
	}
)

// Create List
router.post(
	'/createlist',
	[
		check('title', 'Uncorrect title').isLength({ min: 1 }),
		check('color', 'Uncorrect color').isLength({ min: 1 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Auth error' })
			}
			const decoded = jwt.verify(token, config.secretKey)
			req.user = decoded
			const userId = req.user.id

			const user = await User.findOne({ userId })
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const { title, color } = req.body

			const list = new List({ title: title, userId: user.id, color: color })
			user.listId.push(list.id)
			await list.save()
			await user.save()
			return res.json({
				_id: list.id,
				title: list.title,
				color: list.color,
				userId: list.userId,
				tasks: list.tasks,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (add list)' })
		}
	}
)

//Update List
router.put(
	'/updateList',
	[
		check('listId', 'Uncorrect taskId').isLength({ min: 1 }),
		check('title', 'Uncorrect text').isLength({ min: 1 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}

			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Auth error' })
			}
			const decoded = jwt.verify(token, config.secretKey)
			req.user = decoded
			const userId = req.user.id

			const user = await User.findOne({ userId })
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const { listId, title } = req.body

			const list = await List.findOne({ _id: mongoose.Types.ObjectId(listId) })
			if (!list) {
				return res.status(400).json({ message: 'List not found', errors })
			}
			list.title = title
			await list.save()

			return res.json({
				_id: list.id,
				title: list.title,
				color: list.color,
				userId: list.userId,
				tasks: list.tasks,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (edit list)' })
		}
	}
)

//Delete List router
router.put(
	'/deleteList',
	[check('listId', 'Uncorrect listId').isLength({ min: 1 })],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}

			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Auth error' })
			}
			const decoded = jwt.verify(token, config.secretKey)
			req.user = decoded
			const userId = req.user.id

			const user = await User.findOne({ userId })
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const { listId } = req.body

			const list = await List.findOne({ _id: mongoose.Types.ObjectId(listId) })
			if (!list) {
				return res.status(400).json({ message: 'List not found', errors })
			}

			const tasks = list.tasksId
			if (tasks) {
				try {
					for (let i = 0; i < tasks.length; i++) {
						let task = tasks[i]
						const temp = await Task.findOneAndDelete({
							_id: mongoose.Types.ObjectId(task),
						})
					}
				} catch {}
			}

			if (userId != list.userId) {
				return res.status(404).json({ message: 'Server error, invalid token' })
			}
			const userList = await User.findOneAndUpdate(
				{ _id: userId },
				{ $pull: { listId: listId } }
			)
			const temp = await List.findByIdAndDelete({
				_id: mongoose.Types.ObjectId(listId),
			})
			await userList.save()

			const userLists = userList.listId
			const lists = await List.find({ userLists })
			return res.json({
				lists,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (delete list)' })
		}
	}
)

module.exports = router

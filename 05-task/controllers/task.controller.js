import Task from "../models/Task.model.js";


const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userId;
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" })
    }

    if (!userId) {
        return res.status(400).json({ message: "User Id is required" })
    }

    try {

        const newTask = await Task.create({ title, description, user: userId })

        if (!newTask) {
            return res.status(400).json(
                { message: "Failed to create task" }
            )
        }

        return res.status(201).json(
            {
                message: "Task created successfully",
                task: newTask
            }
        )

    } catch (error) {
        return res.status(500).json({ message: "Error creating task", error })
    }


}



const getMyTasks = async (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
        return res.status(400).json({ message: "User Id is required" })
    }

    try {
        const tasks = await Task.find({ user: userId })
        if (!tasks) {
            return res.status(404).json({ message: "No tasks found for this user" })
        }

        if (tasks.length === 0) {
            return res.status(200).json({ message: "You have not created any tasks yet" })
        }
        return res.status(200).json(
            {
                message: "Tasks fetched successfully",
                tasks
            }
        )
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tasks", error })
    }
}

const updateTask = async (req, res) => {
if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const taskId = req.params.taskId;
    const userId = req.user.userId || req.user.id; // Dono check kar lein
    const { title, description, isCompleted } = req.body;

    try {
        const task = await Task.findOne({ _id: taskId, user: userId });
    
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        if (title) {
            task.title = title
        }
        if (description) {
            task.description = description
        }
        if (isCompleted !== undefined) {
            task.isCompleted = isCompleted
        }
        await task.save()
        return res.status(200).json(
            {
                message: "Task updated successfully",
                task
            }
        )
    } catch (error) {
        return res.status(500).json({ message: "Error updating task", error })
    }


}

const deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.user.id || req.user._id; 

    try {
        
        const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ 
                message: "Task not found or you are not authorized to delete this task" 
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: "Error deleting task", error })
    }
}

export { createTask, getMyTasks, updateTask, deleteTask}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: { todo: string; completed: boolean; taskId: string }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
    const [taskName, setTaskName] = useState('');

    const handleAdd = () => {
        if (taskName.trim() !== '') {
            const newTask = {
                todo: taskName,
                completed: false,
                taskId: Date.now().toString(),
            };
            onAddTask(newTask);
            setTaskName('');
            onClose();
        }
    };

    //@ts-ignore
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-neutral-900 p-4 rounded-lg w-11/12 sm:w-1/3"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-lg font-semibold mb-4">Add new task to do</h2>
                        <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="To do"
                            onKeyPress={handleKeyPress}
                            className="p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition duration-150 w-full"
                            style={{ caretColor: '#00bcd4' }}
                        />
                        <div className="flex justify-end mt-8">
                            <button onClick={onClose} className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded mr-2">
                                Cancel
                            </button>
                            <button onClick={handleAdd} className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded">
                                Add task
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddTaskModal;

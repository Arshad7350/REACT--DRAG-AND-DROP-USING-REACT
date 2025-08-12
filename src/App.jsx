import { useState } from 'react'
import './App.css'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import Column from './Components/Column/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {Input} from './Components/Input/Input.jsx';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Leran how to center a div" },
  ]);

  const addTask = title => {
    setTasks(tasks => [...tasks, { id: tasks.length + 1, title }])
  }

  const getTaskPos = id => tasks.findIndex(tasks => tasks.id === id)

  const handleDragEnd = event => {
    const { active, over } = event

    if (active.id === over.id) return;

    setTasks(tasks => {
      const originalPos = getTaskPos(active.id)
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
   <div className='App'>
      <h1>My Tasks ✅</h1>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
   </div>
  )
}

export default App

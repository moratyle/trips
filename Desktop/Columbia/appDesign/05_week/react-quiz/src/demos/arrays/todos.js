const tasks = ['Make tea', 'Meditate', 'Go for a run', 'Read a book']

function Todos() {
  // const taskListItems = tasks.map((item, index) => <li key={index}>{item}</li>)

  return (
    <div>
      {tasks.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  )
}
export default Todos

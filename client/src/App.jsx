// App.jsx is the main React component for our frontend.
// For now, we are only creating the layout.
// Later, this page will connect to the backend API.

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Job Tracker CRM</h1>
        <p>Track customers, properties, and job progress.</p>
      </header>

      <main className="main-content">
        <section className="card">
          <h2>Jobs</h2>
          <p>The job list will appear here.</p>
        </section>

        <section className="card">
          <h2>Add New Job</h2>
          <p>The job form will appear here.</p>
        </section>
      </main>
    </div>
  );
}

export default App;